# 📚 GitHub Pages Deployment (Free Forever)

## Setup Instructions

### 1. Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `retell-voice-widget`
4. Make it public (required for free GitHub Pages)
5. Click "Create repository"

### 2. Upload Files
```bash
# Option A: Command Line
git clone https://github.com/yourusername/retell-voice-widget.git
cd retell-voice-widget
# Copy all your files here
git add .
git commit -m "Initial widget deployment"
git push origin main

# Option B: Web Interface
# Drag and drop files directly on GitHub.com
```

### 3. Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: "Deploy from a branch"
4. Branch: "main" or "master"
5. Folder: "/ (root)"
6. Click "Save"

### 4. Access Your Widget
- **Base URL:** `https://yourusername.github.io/retell-voice-widget/`
- **Widget Script:** `https://yourusername.github.io/retell-voice-widget/retell-universal-widget.js`
- **Test Pages:** `https://yourusername.github.io/retell-voice-widget/test-examples/basic-test.html`

## Client Implementation
```html
<script src="https://yourusername.github.io/retell-voice-widget/retell-universal-widget.js" 
        data-webhook="CLIENT_WEBHOOK_URL"
        data-agent-id="CLIENT_AGENT_ID"></script>
```

## Benefits
- ✅ **100% Free** forever
- ✅ **Reliable hosting** by GitHub
- ✅ **Version control** built-in
- ✅ **Easy updates** via git push
- ✅ **Global CDN** for fast loading
- ✅ **Custom domains** supported

## Pro Tips
- Use meaningful commit messages for updates
- Create branches for testing new features
- Set up GitHub Actions for automated testing
- Use releases for version management

## Custom Domain (Optional)
1. Buy domain (e.g., `widget.youragency.com`)
2. Add CNAME file to repository with your domain
3. Configure DNS to point to GitHub Pages
4. Enable HTTPS in repository settings

Perfect for agencies wanting free, reliable hosting! 🎯