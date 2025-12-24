I've created a simple button-only version of the Fluvio widget. Here's what it does:

## 🎯 Fluvio Button Widget Features:

### **Simple Integration:**
- Just add `class="fluvio-call-btn"` to any button
- Include the script tag once per page
- No floating UI - just initiates calls when clicked

### **Flexible Placement:**
- Place buttons anywhere on the site
- Multiple buttons per page supported
- Each button can have different agents/webhooks

### **Button States:**
- **Default:** Shows button text (e.g., "Call Now")
- **Connecting:** Shows "Connecting..." while getting access token
- **Active Call:** Shows "End Call" and allows ending the call
- **After Call:** Returns to original text

### **Usage Examples:**

**Basic Button:**
```html
<button class="fluvio-call-btn"
        data-webhook="https://hook.us2.make.com/your-webhook"
        data-agent-id="agent_your_id">
    Call Now
</button>
<script src="https://otitodev.github.io/Fluvio-widget/fluvio-button-widget.js"></script>
```

**Button with Dynamic Variables:**
```html
<button class="fluvio-call-btn"
        data-webhook="https://hook.us2.make.com/your-webhook"
        data-agent-id="agent_your_id"
        data-company-name="Your Company"
        data-agent-name="Sarah"
        data-greeting="Hi! I'm {{AI_agent}} from {{company_name}}">
    Talk to Sarah
</button>
```

**Multiple Buttons (Different Purposes):**
```html
<!-- Sales Button -->
<button class="fluvio-call-btn btn-primary"
        data-webhook="https://hook.us2.make.com/sales-webhook"
        data-agent-id="agent_sales_id">
    Sales Inquiry
</button>

<!-- Support Button -->
<button class="fluvio-call-btn btn-success"
        data-webhook="https://hook.us2.make.com/support-webhook"
        data-agent-id="agent_support_id">
    Get Support
</button>
```

## 🎨 Perfect for:
- **E-commerce:** "Talk to Sales" on product pages
- **Real Estate:** "Call Agent" on property listings  
- **Support:** "Get Help" buttons in help sections
- **Lead Gen:** "Free Consultation" on landing pages
- **Any custom design** where floating widgets don't fit

The button widget gives clients maximum flexibility - they can style it however they want and place it exactly where it makes sense in their design!