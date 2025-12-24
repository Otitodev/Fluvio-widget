# 🚀 Retell Universal Widget - Client Deployment Package

## 📦 What's Included

This package contains everything your client needs to test and deploy the universal voice widget:

### Core Files
- `retell-universal-widget.js` - The main widget script
- `test-examples/` - Multiple test scenarios
- `hosting-options/` - Different deployment methods
- `client-examples/` - Real-world implementation examples

## 🧪 Immediate Testing (No Hosting Required)

### Option 1: Local File Testing
1. Download all files to a folder
2. Open any `.html` file in the `test-examples/` folder
3. Widget works immediately from local files

### Option 2: GitHub Pages (Free Hosting)
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Access via `https://username.github.io/repository-name/`

### Option 3: Netlify Drop (Instant Hosting)
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag the entire folder onto the page
3. Get instant live URL
4. Share with clients immediately

## 🌐 Production Hosting Options

### Recommended: CDN Hosting
```bash
# AWS CloudFront
aws s3 cp retell-universal-widget.js s3://your-bucket/
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"

# Cloudflare
# Upload to Cloudflare Pages or Workers

# jsDelivr (GitHub-based CDN)
# Push to GitHub, access via:
# https://cdn.jsdelivr.net/gh/username/repo@main/retell-universal-widget.js
```

### Alternative: Simple Web Hosting
- Upload `retell-universal-widget.js` to any web server
- Use the full URL in client script tags
- Examples: Bluehost, GoDaddy, DigitalOcean, etc.

## 📋 Client Testing Scenarios

### Test 1: Basic Implementation
```html
<script src="retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/8inld3fbsnclj96ucur12awsbyjmsxb5"
        data-agent-id="agent_a4cb9032ec31e009d34b9be1a4"></script>
```

### Test 2: Branded Implementation
```html
<script src="retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/8inld3fbsnclj96ucur12awsbyjmsxb5"
        data-agent-id="agent_a4cb9032ec31e009d34b9be1a4"
        data-color="#FF6B35"
        data-position="bottom-left"
        data-title="AcmeBot"
        data-subtitle="24/7 Support"></script>
```

### Test 3: Multiple Agents
```html
<!-- Different agents for different pages -->
<script src="retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/support-webhook"
        data-agent-id="agent_support_id"
        data-title="Support Agent"></script>
```

## 🎯 Client Onboarding Process

### Step 1: Generate Client Script
```javascript
// Script generator for your team
function generateClientScript(clientConfig) {
  return `<script src="https://your-cdn.com/retell-universal-widget.js" 
        data-webhook="${clientConfig.webhook}"
        data-agent-id="${clientConfig.agentId}"
        data-color="${clientConfig.color || '#347D9B'}"
        data-position="${clientConfig.position || 'bottom-right'}"
        data-title="${clientConfig.title || 'Voice Assistant'}"
        data-subtitle="${clientConfig.subtitle || 'Live Voice Agent'}"></script>`;
}
```

### Step 2: Send to Client
Email template:
```
Subject: Voice Assistant Setup - 30 Second Installation

Hi [Client Name],

Your voice assistant is ready! Just paste this code before the </body> tag on your website:

[GENERATED SCRIPT TAG]

That's it! The voice assistant will appear immediately.

Test it here: [YOUR TEST URL]

Questions? Reply to this email.

Best regards,
[Your Team]
```

### Step 3: Client Implementation
Client pastes one line of code - works on any platform:
- WordPress: Theme editor or plugin
- Shopify: theme.liquid file
- Squarespace: Code injection
- Wix: HTML embed
- Custom sites: Any HTML page

## 📊 Testing Checklist

### ✅ Widget Appearance
- [ ] Blue floating button appears bottom-right
- [ ] Button has floating animation
- [ ] Clicking opens professional panel
- [ ] Panel shows correct branding/colors

### ✅ Functionality
- [ ] "Call" button works (connects or shows demo)
- [ ] Status updates correctly
- [ ] Transcript area appears during call
- [ ] Close button works
- [ ] Mobile responsive on all devices

### ✅ Platform Compatibility
- [ ] Works on WordPress
- [ ] Works on Shopify
- [ ] Works on static HTML
- [ ] Works on React/Vue apps
- [ ] No conflicts with existing code

### ✅ Customization
- [ ] Brand colors apply correctly
- [ ] Position changes work (4 corners)
- [ ] Title/subtitle text updates
- [ ] Multiple agents work on different pages

## 🚀 Go-Live Process

### For Your Agency:
1. **Host the script** on your preferred CDN
2. **Update the test examples** with your live URL
3. **Create client-specific webhooks** in Make.com
4. **Generate script tags** for each client
5. **Send to clients** with test URL

### For Clients:
1. **Test the demo** at your provided URL
2. **Copy their specific script tag**
3. **Paste before </body>** on their website
4. **Verify it works** - should appear immediately

## 💡 Pro Tips

### Scaling
- Use environment variables for webhook URLs
- Create a client dashboard to generate script tags
- Set up monitoring for widget performance
- Use analytics to track usage across clients

### Maintenance
- Version your script (retell-universal-widget-v1.2.js)
- Keep backward compatibility
- Test updates on staging before production
- Communicate changes to clients in advance

### Support
- Create a knowledge base with common issues
- Set up client support portal
- Monitor error logs from widget deployments
- Provide phone/email support for technical issues

This package gives your client everything they need to test immediately and scale to unlimited clients across any platform! 🎯