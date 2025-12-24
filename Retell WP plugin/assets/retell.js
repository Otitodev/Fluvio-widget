// Create UI immediately, then load SDK
function createRetellUI() {
  console.log('🧪 Creating Retell UI...');
  
  // Inject UI
  const fab = document.createElement("div");
  fab.id = "retell-fab";
  fab.innerHTML = "💬";

  const panel = document.createElement("div");
  panel.id = "retell-panel";
  panel.innerHTML = `
    <div id="retell-header">
      <div id="retell-header-content">
        <div id="retell-header-icon">🎧</div>
        <div id="retell-header-text">
          <h4>Voice Assistant</h4>
          <p>Live Voice Agent</p>
        </div>
      </div>
      <button id="retell-close">×</button>
    </div>
    <div id="retell-content">
      <div id="retell-instruction">
        Tap the call button to start talking.
      </div>
      <div id="retell-status-section">
        <span id="retell-status-label">Status:</span>
        <span id="retell-status" class="offline">Loading SDK...</span>
      </div>
      <button id="retell-call-button" class="start" disabled>
        <span id="retell-call-icon">📞</span>
        <span id="retell-call-text">Call</span>
      </button>
      <div id="retell-transcript-container">
        <div id="retell-transcript"></div>
      </div>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  console.log('🧪 UI Created - FAB and Panel added to DOM');

  // Basic event handlers
  fab.onclick = () => {
    console.log('🧪 FAB clicked');
    const isVisible = panel.style.display !== "none";
    panel.style.display = isVisible ? "none" : "block";
  };

  document.getElementById("retell-close").onclick = () => {
    console.log('🧪 Close button clicked');
    panel.style.display = "none";
  };

  return {
    statusEl: document.getElementById("retell-status"),
    callButton: document.getElementById("retell-call-button"),
    callText: document.getElementById("retell-call-text"),
    callIcon: document.getElementById("retell-call-icon"),
    transcriptContainer: document.getElementById("retell-transcript-container")
  };
}

// Load Retell SDK and initialize functionality
function loadRetellSDK(uiElements) {
  console.log('🧪 Loading Retell SDK...');
  
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/retell-client-js-sdk@latest/dist/retell-client-js-sdk.min.js';
  
  script.onload = () => {
    console.log('🧪 SDK loaded from unpkg');
    initializeRetellWidget(uiElements);
  };
  
  script.onerror = () => {
    console.log('🧪 unpkg failed, trying jsdelivr');
    // Fallback to jsdelivr
    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/retell-client-js-sdk@latest/dist/retell-client-js-sdk.min.js';
    
    script2.onload = () => {
      console.log('🧪 SDK loaded from jsdelivr');
      initializeRetellWidget(uiElements);
    };
    
    script2.onerror = () => {
      console.log('🧪 jsdelivr failed, trying skypack');
      // Fallback to skypack with dynamic import
      import('https://cdn.skypack.dev/retell-client-js-sdk')
        .then(({ RetellWebClient }) => {
          window.RetellWebClient = RetellWebClient;
          console.log('🧪 SDK loaded from skypack');
          initializeRetellWidget(uiElements);
        })
        .catch(err => {
          console.error('🧪 All SDK loading methods failed:', err);
          uiElements.statusEl.innerText = "SDK failed to load";
          uiElements.statusEl.className = "offline";
        });
    };
    
    document.head.appendChild(script2);
  };
  
  document.head.appendChild(script);
}

function initializeRetellWidget(uiElements) {
  try {
    console.log('🧪 Initializing Retell Widget...');
    
    // Try different ways to access the SDK
    let RetellWebClient;
    
    if (window.RetellSDK && window.RetellSDK.RetellWebClient) {
      RetellWebClient = window.RetellSDK.RetellWebClient;
      console.log('🧪 Found RetellWebClient in window.RetellSDK');
    } else if (window.RetellWebClient) {
      RetellWebClient = window.RetellWebClient;
      console.log('🧪 Found RetellWebClient in window');
    } else if (window.Retell && window.Retell.RetellWebClient) {
      RetellWebClient = window.Retell.RetellWebClient;
      console.log('🧪 Found RetellWebClient in window.Retell');
    } else {
      throw new Error('RetellWebClient not found in any expected location');
    }

    const client = new RetellWebClient();
    let isCallActive = false;

    const { statusEl, callButton, callText, callIcon, transcriptContainer } = uiElements;

    // Update UI to show ready state
    statusEl.innerText = "Offline";
    statusEl.className = "offline";
    callButton.disabled = false;

    console.log('🧪 Widget initialized successfully');

    callButton.onclick = async () => {
      if (!isCallActive) {
        // Start call
        try {
          console.log('🧪 Starting call...');
          statusEl.innerText = "Connecting...";
          statusEl.className = "connecting";
          callButton.disabled = true;
          
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
          let accessToken = responseText.trim();
          
          console.log('🧪 Access token received, starting call...');

          await client.startCall({
            accessToken: accessToken,
            sampleRate: 24000,
            enableUpdate: true
          });

        } catch (error) {
          console.error('🧪 Failed to start call:', error);
          statusEl.innerText = "Connection failed";
          statusEl.className = "offline";
          callButton.disabled = false;
        }
      } else {
        // End call
        console.log('🧪 Ending call...');
        client.stopCall();
      }
    };

    // Event listeners
    client.on("call_started", () => {
      console.log("🧪 Call started event");
      statusEl.innerText = "Connected";
      statusEl.className = "online";
      isCallActive = true;
      callButton.className = "end";
      callButton.disabled = false;
      callText.innerText = "End Call";
      callIcon.innerText = "📞";
      transcriptContainer.classList.add("show");
    });

    client.on("call_ended", () => {
      console.log("🧪 Call ended event");
      statusEl.innerText = "Offline";
      statusEl.className = "offline";
      isCallActive = false;
      callButton.className = "start";
      callButton.disabled = false;
      callText.innerText = "Call";
      callIcon.innerText = "📞";
    });

    client.on("agent_start_talking", () => {
      console.log("🧪 Agent start talking");
      statusEl.innerText = "Agent speaking...";
      statusEl.className = "online";
    });

    client.on("agent_stop_talking", () => {
      console.log("🧪 Agent stop talking");
      statusEl.innerText = "Listening...";
      statusEl.className = "online";
    });

    client.on("update", (update) => {
      if (update.transcript && update.transcript.length > 0) {
        console.log("🧪 Transcript update received");
        const transcriptDiv = document.getElementById("retell-transcript");
        const transcriptText = update.transcript
          .map(t => `${t.role === 'agent' ? 'Agent' : 'You'}: ${t.content}`)
          .join('\n\n');
        transcriptDiv.innerText = transcriptText;
        transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
      }
    });

    client.on("error", (error) => {
      console.error("🧪 Retell error:", error);
      statusEl.innerText = "Error occurred";
      statusEl.className = "offline";
      isCallActive = false;
      callButton.className = "start";
      callButton.disabled = false;
      callText.innerText = "Call";
      callIcon.innerText = "📞";
    });

  } catch (error) {
    console.error('🧪 Failed to initialize Retell widget:', error);
    uiElements.statusEl.innerText = "Initialization failed";
    uiElements.statusEl.className = "offline";
  }
}

// Start the process
console.log('🧪 Retell Voice Agent Plugin Loading...');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const uiElements = createRetellUI();
    loadRetellSDK(uiElements);
  });
} else {
  const uiElements = createRetellUI();
  loadRetellSDK(uiElements);
}