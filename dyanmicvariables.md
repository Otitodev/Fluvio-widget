You can add dynamic variables in **both places**, and they work together perfectly. Here's how:

## **Method 1: Script Tag Attributes (Client-Side)**

Clients can add variables directly in the script tag:

```html
<script src="https://otitodev.github.io/Fluvio-widget/fluvio-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/client-webhook"
        data-agent-id="agent_client_id"
        data-company-name="ABC Realty"
        data-agent-name="Sarah"
        data-agent-title="Real Estate Agent"
        data-company-hours="Mon-Fri 9am-6pm"
        data-greeting="Hi! I'm {{AI_agent}} from {{company_name}}. Looking for your dream home?"></script>
```

## **Method 2: Make.com Webhook Response (Server-Side)**

Your Make.com webhook can return variables:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiJ9...",
  "call_inbound": {
    "dynamic_variables": {
      "company_name": "FluvioAI Mortgage",
      "AI_agent": "Marissa",
      "AI_agent_title": "Mortgage Specialist",
      "greeting": "Hi! I'm {{AI_agent}}, ready to help with your mortgage!"
    }
  }
}
```

## **Method 3: Both Together (Recommended)**

**Best approach:** Use both for maximum flexibility!

### **How Priority Works:**
1. **Script tag variables** are sent to webhook
2. **Webhook can override** or add more variables
3. **Final result** combines both

### **Example Flow:**

**1. Client Script:**
```html
<script data-company-name="ABC Realty" 
        data-agent-name="Sarah"></script>
```

**2. Widget sends to webhook:**
```json
{
  "agent_id": "agent_123",
  "dynamic_variables": {
    "company_name": "ABC Realty",
    "AI_agent": "Sarah"
  }
}
```

**3. Make.com can enhance/override:**
```json
{
  "access_token": "...",
  "call_inbound": {
    "dynamic_variables": {
      "company_name": "ABC Realty",           // From script
      "AI_agent": "Sarah",                   // From script  
      "company_hours": "Mon-Fri 9am-6pm",   // Added by webhook
      "greeting": "Hi! I'm {{AI_agent}} from {{company_name}}!" // Added by webhook
    }
  }
}
```

## **Use Cases for Each Method:**

### **Script Tag Variables - Best For:**
- **Static client info** (company name, agent name)
- **Per-website customization** 
- **Easy client setup** (no webhook changes needed)
- **Default values**

### **Webhook Variables - Best For:**
- **Dynamic data** (current time, user location)
- **Database lookups** (customer info, account details)
- **Complex logic** (business rules, A/B testing)
- **Real-time data** (inventory, pricing)

### **Combined Approach - Best For:**
- **Scalable agencies** serving multiple clients
- **Personalized experiences** with dynamic content
- **Fallback values** (script provides defaults, webhook adds specifics)

## **Practical Examples:**

### **Real Estate Agency:**
```html
<!-- Script provides defaults -->
<script data-company-name="ABC Realty" 
        data-agent-name="Sarah"
        data-agent-title="Real Estate Agent"></script>
```

```json
// Webhook adds dynamic data
{
  "dynamic_variables": {
    "current_listings": "15 new homes this week",
    "market_update": "Prices up 3% this month",
    "greeting": "Hi! I'm {{AI_agent}}. We have {{current_listings}}!"
  }
}
```

### **E-commerce Store:**
```html
<!-- Script provides store info -->
<script data-company-name="TechStore Pro" 
        data-agent-name="Alex"></script>
```

```json
// Webhook adds user-specific data
{
  "dynamic_variables": {
    "user_name": "John",
    "cart_items": "3 items in cart",
    "greeting": "Hi {{user_name}}! I'm {{AI_agent}}. I see you have {{cart_items}}."
  }
}
```

## **Recommendation:**

**Use both methods** for maximum flexibility:
- **Script tags** for static client branding
- **Webhook** for dynamic, real-time data
- **Perfect combination** for scalable, personalized experiences

This gives you the best of both worlds - easy client setup with powerful dynamic capabilities!