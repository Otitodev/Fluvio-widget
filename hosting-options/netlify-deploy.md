# 🚀 Netlify Deployment (Recommended for Testing)

## Instant Deployment (No Account Required)

### Option 1: Netlify Drop
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag your entire project folder onto the page
3. Get instant live URL (e.g., `https://amazing-widget-123.netlify.app`)
4. Share URL with clients immediately

### Option 2: GitHub + Netlify (Recommended for Production)
1. Create GitHub repository
2. Upload all files to repository
3. Connect Netlify to GitHub
4. Auto-deploy on every update

## Step-by-Step Instructions

### 1. Prepare Files
```
project-folder/
├── retell-universal-widget.js
├── test-examples/
│   ├── basic-test.html
│   ├── branded-test.html
│   ├── ecommerce-test.html
│   └── mobile-test.html
└── index.html (optional landing page)
```

### 2. Deploy to Netlify
- **Drag & Drop:** Instant deployment
- **GitHub:** Continuous deployment
- **CLI:** `netlify deploy --prod`

### 3. Get Your URLs
- **Widget Script:** `https://your-site.netlify.app/retell-universal-widget.js`
- **Test Pages:** `https://your-site.netlify.app/test-examples/basic-test.html`

### 4. Update Client Scripts
```html
<script src="https://your-site.netlify.app/retell-universal-widget.js" 
        data-webhook="CLIENT_WEBHOOK_URL"
        data-agent-id="CLIENT_AGENT_ID"></script>
```

## Benefits of Netlify
- ✅ **Free hosting** for testing
- ✅ **Instant deployment** (30 seconds)
- ✅ **Global CDN** for fast loading
- ✅ **HTTPS by default** (secure)
- ✅ **Custom domains** available
- ✅ **Easy updates** via drag & drop

## Production Considerations
- **Custom Domain:** `widget.youragency.com`
- **Environment Variables:** For different webhook URLs
- **Analytics:** Track widget usage
- **Monitoring:** Uptime and performance

Perfect for immediate client testing and demos! 🎯