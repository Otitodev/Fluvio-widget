The script should be added in different places depending on the platform. Here's where to add it:

## 📋 **Where to Add the Script Tag**

### **WordPress**
```html
<!-- Add to your theme's footer.php file, just before </body> -->
<script src="https://otitodev.github.io/Retell-widget/retell-universal-widget.js" 
        data-webhook="YOUR_WEBHOOK_URL"
        data-agent-id="YOUR_AGENT_ID"></script>
</body>
```

**Alternative WordPress methods:**
- **Theme Customizer:** Appearance → Customize → Additional CSS → Footer Scripts
- **Plugin:** Use a "Header/Footer Scripts" plugin
- **Functions.php:** Add via wp_enqueue_script

### **Shopify**
```html
<!-- Add to theme.liquid file, just before </body> -->
<script src="https://otitodev.github.io/Retell-widget/retell-universal-widget.js" 
        data-webhook="YOUR_WEBHOOK_URL"
        data-agent-id="YOUR_AGENT_ID"></script>
</body>
```

### **Squarespace**
```html
<!-- Settings → Advanced → Code Injection → Footer -->
<script src="https://otitodev.github.io/Retell-widget/retell-universal-widget.js" 
        data-webhook="YOUR_WEBHOOK_URL"
        data-agent-id="YOUR_AGENT_ID"></script>
```

### **Wix**
1. Go to your site editor
2. Add an **HTML Embed** element
3. Paste the script code
4. Position it anywhere (widget will float automatically)

### **Static HTML Sites**
```html
<!-- Add just before </body> in your HTML files -->
<script src="https://otitodev.github.io/Retell-widget/retell-universal-widget.js" 
        data-webhook="YOUR_WEBHOOK_URL"
        data-agent-id="YOUR_AGENT_ID"></script>
</body>
</html>
```

### **React/Vue/Angular**
```html
<!-- Add to public/index.html before </body> -->
<script src="https://otitodev.github.io/Retell-widget/retell-universal-widget.js" 
        data-webhook="YOUR_WEBHOOK_URL"
        data-agent-id="YOUR_AGENT_ID"></script>
```

## **Key Rule: Always Before `</body>`**

The script should **always** be placed just before the closing `</body>` tag to ensure:
- ✅ Page loads first (better performance)
- ✅ DOM is ready when script runs
- ✅ No conflicts with other scripts
- ✅ Widget appears after page content

## 📝 **Example Client Script**
```html
<script src="https://otitodev.github.io/Retell-widget/retell-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/client-specific-webhook"
        data-agent-id="agent_client_specific_id"
        data-color="#007BFF"
        data-title="Support Assistant"></script>
```