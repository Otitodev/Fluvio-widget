# 🎯 Dynamic Variables Guide - Fluvio Universal Widget

## ✅ Dynamic Variables Now Supported!

The universal widget now supports passing dynamic variables to your Fluvio agent in **two ways**:

1. **Via Make.com Webhook Response** (Your current setup)
2. **Via Script Tag Attributes** (New feature)

## 🔄 Method 1: Make.com Webhook Response (Current)

Your Make.com webhook already returns this format:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiJ9...",
  "call_inbound": {
    "dynamic_variables": {
      "company_contact": "",
      "company_contact_title": "",
      "company_number": "12894014100",
      "company_hours": "Weekdays 9 to 5, Weekends closed",
      "AI_agent": "Ethan",
      "AI_agent_title": "Sales Associate",
      "AI_agent_number": "12899070424",
      "available_languages": "",
      "agent_timezone": "America/Toronto",
      "email_message_to": "autukuri@fluvioai.com",
      "company_sms_number": "14168963109",
      "company_address": "123 Main Street, Toronto, Ontario",
      "company_name": "FluvioAI ABC Mortgage",
      "dynamic_variable_1": "",
      "dynamic_variable_2": "",
      "dynamic_variable_3": "",
      "greeting": "Hi, this is {{AI_agent}}, the {{AI_title}} at {{company_name}}. Would love to help you get that new house! How can I help?"
    }
  }
}
```

✅ **This now works automatically!** The widget detects the dynamic variables and passes them to Fluvio.

## 🏷️ Method 2: Script Tag Attributes (New)

You can now pass dynamic variables directly in the script tag:

```html
<script src="https://otitodev.github.io/Fluvio-widget/fluvio-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/your-webhook"
        data-agent-id="agent_your_id"
        data-company-name="FluvioAI ABC Mortgage"
        data-company-number="12894014100"
        data-company-hours="Weekdays 9 to 5, Weekends closed"
        data-agent-name="Ethan"
        data-agent-title="Sales Associate"
        data-company-address="123 Main Street, Toronto, Ontario"
        data-greeting="Hi, this is {{AI_agent}}, the {{AI_title}} at {{company_name}}. How can I help?"></script>
```

## 📋 Supported Dynamic Variable Attributes

| Script Attribute | Maps to Fluvio Variable | Example |
|-------------------|-------------------------|---------|
| `data-company-name` | `company_name` | `"FluvioAI ABC Mortgage"` |
| `data-company-number` | `company_number` | `"12894014100"` |
| `data-company-hours` | `company_hours` | `"Weekdays 9 to 5"` |
| `data-agent-name` | `AI_agent` | `"Ethan"` |
| `data-agent-title` | `AI_agent_title` | `"Sales Associate"` |
| `data-company-address` | `company_address` | `"123 Main St, Toronto"` |
| `data-greeting` | `greeting` | `"Hi, this is {{AI_agent}}..."` |

## 🎯 Client Implementation Examples

### Basic Implementation (No Dynamic Variables)
```html
<script src="https://otitodev.github.io/Fluvio-widget/fluvio-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/client-webhook"
        data-agent-id="agent_client_id"></script>
```

### Real Estate Agency
```html
<script src="https://otitodev.github.io/Fluvio-widget/fluvio-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/realestate-webhook"
        data-agent-id="agent_realestate_id"
        data-company-name="ABC Realty"
        data-agent-name="Sarah"
        data-agent-title="Real Estate Agent"
        data-company-hours="Monday-Friday 9am-6pm"
        data-greeting="Hi! I'm {{AI_agent}}, your {{AI_agent_title}} at {{company_name}}. Looking for your dream home?"></script>
```

### Mortgage Company
```html
<script src="https://otitodev.github.io/Fluvio-widget/fluvio-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/mortgage-webhook"
        data-agent-id="agent_mortgage_id"
        data-company-name="FluvioAI Mortgage"
        data-agent-name="Mike"
        data-agent-title="Mortgage Specialist"
        data-company-number="1-800-MORTGAGE"
        data-greeting="Hello! I'm {{AI_agent}} from {{company_name}}. Ready to get pre-approved?"></script>
```

### E-commerce Store
```html
<script src="https://otitodev.github.io/Fluvio-widget/fluvio-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/ecommerce-webhook"
        data-agent-id="agent_sales_id"
        data-company-name="TechStore Pro"
        data-agent-name="Alex"
        data-agent-title="Sales Assistant"
        data-company-hours="24/7 Online Support"
        data-greeting="Hi! I'm {{AI_agent}}, your {{AI_agent_title}}. Need help finding the perfect product?"></script>
```

## 🔄 How It Works

1. **Client adds script** with dynamic variables
2. **Widget sends variables** to your Make.com webhook
3. **Make.com processes** and returns access token + variables
4. **Widget starts call** with both access token and dynamic variables
5. **Fluvio agent** uses variables in conversation

## 🎨 Variable Priority

If both methods provide the same variable:
1. **Make.com webhook response** takes priority
2. **Script tag attributes** are used as fallback

This allows for:
- **Default values** in script tag
- **Dynamic overrides** from Make.com based on user context

## 🚀 Benefits for Agencies

### Personalization Per Client
```html
<!-- Client A: Real Estate -->
<script data-company-name="ABC Realty" data-agent-name="Sarah"></script>

<!-- Client B: Mortgage -->
<script data-company-name="XYZ Mortgage" data-agent-name="Mike"></script>
```

### Dynamic Greetings
```html
<script data-greeting="Hi! I'm {{AI_agent}} from {{company_name}}. How can I help with your {{service_type}} needs?"></script>
```

### Contextual Information
```html
<script data-company-hours="{{business_hours}}" 
        data-company-number="{{phone_number}}"
        data-company-address="{{office_address}}"></script>
```

## 🧪 Testing Dynamic Variables

1. **Add variables** to your script tag
2. **Start a call** on your test page
3. **Check browser console** - you'll see: `🎧 Dynamic variables included: {...}`
4. **Verify in conversation** - agent should use the variables

## 💡 Pro Tips

- **Use templates** in greetings: `{{AI_agent}}`, `{{company_name}}`
- **Keep variables short** - long values may be truncated
- **Test thoroughly** - verify variables work in actual conversations
- **Combine methods** - Use script tags for defaults, webhook for dynamic data

Your Fluvio agents can now be **fully personalized** for each client and context! 🎯