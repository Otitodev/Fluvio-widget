// Load Retell SDK from CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/retell-client-js-sdk@latest/dist/retell-client-js-sdk.min.js';
script.onload = initializeRetellWidget;
document.head.appendChild(script);

function initializeRetellWidget() {
  const { RetellWebClient } = window.RetellSDK;
  const client = new RetellWebClient();

  let isCallActive = false;

  // Inject UI
  const fab = document.createElement("div");
  fab.id = "retell-fab";
  fab.innerHTML = "💬";

  const panel = document.createElement("div");
  panel.id = "retell-panel";
  panel.innerHTML = `
    <div id="retell-header">
      <h4>Voice Assistant</h4>
      <button id="retell-close">×</button>
    </div>
    <div id="retell-status">Ready to start call</div>
    <button id="retell-start">Start Call</button>
    <button id="retell-end" disabled>End Call</button>
    <div id="retell-transcript-container">
      <h5>Transcript:</h5>
      <div id="retell-transcript"></div>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  // Event handlers
  fab.onclick = () => {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  };

  document.getElementById("retell-close").onclick = () => {
    panel.style.display = "none";
  };

  document.getElementById("retell-start").onclick = async () => {
    try {
      document.getElementById("retell-status").innerText = "Connecting...";
      
      // Fetch access token from Make.com webhook
      const res = await fetch(RETELL_CONFIG.makeWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const responseText = await res.text();
      let accessToken;
      
      // Try to parse as JSON first
      try {
        const data = JSON.parse(responseText);
        accessToken = data.access_token || data.accessToken || data;
      } catch (e) {
        // If not JSON, treat as raw token string
        accessToken = responseText.trim();
      }
      
      if (!accessToken) {
        throw new Error('No access token received');
      }

      // Start the call with access token
      await client.startCall({
        accessToken: accessToken,
        sampleRate: 24000, // Optional: set sample rate
        enableUpdate: true // Enable real-time updates
      });

      document.getElementById("retell-start").disabled = true;
      document.getElementById("retell-end").disabled = false;
      document.getElementById("retell-status").innerText = "Call active";
      isCallActive = true;

    } catch (error) {
      console.error('Failed to start call:', error);
      document.getElementById("retell-status").innerText = "Failed to connect: " + error.message;
    }
  };

  document.getElementById("retell-end").onclick = () => {
    if (isCallActive) {
      client.stopCall();
    }
  };

  // Event listeners for call status
  client.on("call_started", () => {
    console.log("Call started");
    document.getElementById("retell-status").innerText = "Call connected";
    isCallActive = true;
  });

  client.on("call_ended", () => {
    console.log("Call ended");
    document.getElementById("retell-start").disabled = false;
    document.getElementById("retell-end").disabled = true;
    document.getElementById("retell-status").innerText = "Call ended";
    isCallActive = false;
  });

  client.on("agent_start_talking", () => {
    document.getElementById("retell-status").innerText = "Agent speaking...";
  });

  client.on("agent_stop_talking", () => {
    document.getElementById("retell-status").innerText = "Listening...";
  });

  client.on("update", (update) => {
    if (update.transcript && update.transcript.length > 0) {
      const transcriptDiv = document.getElementById("retell-transcript");
      const transcriptText = update.transcript
        .map(t => `${t.role}: ${t.content}`)
        .join('\n');
      transcriptDiv.innerText = transcriptText;
      
      // Auto-scroll to bottom
      transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
    }
  });

  client.on("error", (error) => {
    console.error("Retell error:", error);
    document.getElementById("retell-status").innerText = "Error: " + error.message;
    isCallActive = false;
    document.getElementById("retell-start").disabled = false;
    document.getElementById("retell-end").disabled = true;
  });
}
