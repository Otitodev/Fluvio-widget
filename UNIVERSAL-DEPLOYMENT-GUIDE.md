# Retell Universal Widget - Simple Script Tag Deployment

## 🚀 One-Line Deployment

Add this single script tag to any website:

```html
<script src="https://your-cdn.com/retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/your-webhook"
        data-agent-id="agent_your_agent_id"></script>
```

## 📋 Configuration Options

### Required Attributes
- `data-webhook` - Your Make.com webhook URL
- `data-agent-id` - Your Retell agent ID

### Optional Attributes
- `data-color="#347D9B"` - Brand color (default: blue)
- `data-position="bottom-right"` - Widget position (bottom-right, bottom-left, top-right, top-left)
- `data-title="Voice Assistant"` - Panel title
- `data-subtitle="Live Voice Agent"` - Panel subtitle

## 🌐 Platform Compatibility

Works on **ANY** website platform:
- ✅ WordPress
- ✅ Shopify  
- ✅ Squarespace
- ✅ Wix
- ✅ Custom HTML sites
- ✅ React/Vue/Angular apps
- ✅ Static sites (GitHub Pages, Netlify, etc.)
- ✅ E-commerce platforms
- ✅ Landing page builders

## 📱 Features

- **Mobile responsive** - Works perfectly on all devices
- **No dependencies** - Pure JavaScript, no jQuery or frameworks needed
- **Lightweight** - Minimal performance impact
- **Customizable** - Brand colors and positioning
- **Accessible** - Keyboard navigation and screen reader support
- **Multiple fallbacks** - Robust CDN loading with fallbacks

## 🎯 Client Examples

### Basic Implementation
```html
<script src="https://your-cdn.com/retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/8inld3fbsnclj96ucur12awsbyjmsxb5"
        data-agent-id="agent_a4cb9032ec31e009d34b9be1a4"></script>
```

### Branded Implementation
```html
<script src="https://your-cdn.com/retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/client1-webhook"
        data-agent-id="agent_client1_id"
        data-color="#FF6B35"
        data-position="bottom-left"
        data-title="AcmeBot Assistant"
        data-subtitle="24/7 Support"></script>
```

### Multiple Agents (Different Pages)
```html
<!-- Support page -->
<script src="https://your-cdn.com/retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/support-webhook"
        data-agent-id="agent_support_id"
        data-title="Support Agent"></script>

<!-- Sales page -->
<script src="https://your-cdn.com/retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/sales-webhook"
        data-agent-id="agent_sales_id"
        data-title="Sales Assistant"></script>
```

## 🔧 Deployment Steps

### For Your Agency:
1. **Host the script** on your CDN (AWS CloudFront, Cloudflare, etc.)
2. **Create Make.com webhooks** for each client/agent
3. **Generate script tags** with client-specific parameters
4. **Send to clients** - they just paste one line of code

### For Clients:
1. **Copy the script tag** you provide
2. **Paste before `</body>`** in their website
3. **Done!** - Widget appears immediately

## 🎨 Customization

Clients can customize:
- **Brand colors** to match their website
- **Widget position** (4 corner options)
- **Title and subtitle** text
- **Different agents** for different pages

## 📊 Benefits

- **Scalable** - Deploy to unlimited clients instantly
- **Platform agnostic** - Works everywhere
- **Easy maintenance** - Update one file, all clients get updates
- **No technical knowledge** required from clients
- **Professional appearance** - Matches any website design
- **Mobile optimized** - Perfect on all devices

## 🚀 Go-to-Market

This solution lets you:
1. **Scale rapidly** - No custom development per client
2. **Support any platform** - Never turn away clients
3. **Easy onboarding** - Clients implement in 30 seconds
4. **Centralized updates** - Push improvements to all clients
5. **White-label ready** - Fully brandable per client

Perfect for agencies managing multiple clients with different agents across various platforms!