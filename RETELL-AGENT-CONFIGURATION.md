# 🤖 Retell Agent Configuration for Dynamic Variables

## ❌ **Issue Identified**

The dynamic variables are being sent correctly to Retell, but the agent is saying "{{greeting}}" literally instead of using the actual greeting text. This means the **Retell agent needs to be configured** to use dynamic variables properly.

## 🔧 **Fix Required: Update Agent Configuration**

### **1. Agent Prompt Configuration**

In your Retell agent settings, the **system prompt** needs to reference dynamic variables using the `{{variable_name}}` syntax:

#### ❌ **Current (Broken)**
```
Agent prompt: "{{greeting}}"
```

#### ✅ **Correct Configuration**
```
Agent prompt: "{{greeting}} I'm here to help you with your mortgage needs. What can I assist you with today?"
```

### **2. Dynamic Variables Setup in Retell Dashboard**

1. **Go to Retell Dashboard** → Your Agent → Settings
2. **Add Dynamic Variables** section
3. **Configure these variables:**

| Variable Name | Default Value | Description |
|---------------|---------------|-------------|
| `greeting` | `"Hello! I'm your assistant."` | Custom greeting message |
| `company_name` | `"Our Company"` | Company name |
| `AI_agent` | `"Assistant"` | Agent name |
| `AI_agent_title` | `"Customer Service"` | Agent title |
| `company_hours` | `"Business hours"` | Operating hours |
| `company_number` | `"Contact us"` | Phone number |

### **3. Example Agent Prompt**

```
You are {{AI_agent}}, a {{AI_agent_title}} at {{company_name}}.

Start every conversation with: {{greeting}}

Key information to remember:
- Company: {{company_name}}
- Your name: {{AI_agent}}
- Your role: {{AI_agent_title}}
- Business hours: {{company_hours}}
- Phone number: {{company_number}}
- Address: {{company_address}}

Use this information naturally in conversations when relevant.
```

## 🎯 **Expected Behavior After Fix**

### **Before (Current)**
```
Agent: "{{greeting}}"
```

### **After (Fixed)**
```
Agent: "Hi! I'm Sarah, your Mortgage Specialist at FluvioAI Mortgage Company. Ready to get pre-approved for your dream home?"
```

## 📋 **Step-by-Step Fix**

### **Step 1: Update Agent Prompt**
1. Login to Retell Dashboard
2. Go to your agent: `agent_a4cb9032ec31e009d34b9be1a4`
3. Edit the **System Prompt**
4. Replace `{{greeting}}` with proper prompt structure

### **Step 2: Configure Dynamic Variables**
1. In agent settings, find **Dynamic Variables** section
2. Add all the variables your webhook sends:
   - `greeting`
   - `company_name`
   - `AI_agent`
   - `AI_agent_title`
   - `company_hours`
   - `company_number`
   - `company_address`

### **Step 3: Test the Configuration**
1. Save agent settings
2. Test with the widget
3. Agent should now use actual values instead of `{{greeting}}`

## 🔍 **Debugging Dynamic Variables**

### **Check if Variables are Received**
In Retell Dashboard → Call Logs → Recent Call → Details, you should see:
```json
{
  "retell_llm_dynamic_variables": {
    "greeting": "Hi! I'm Sarah...",
    "company_name": "FluvioAI Mortgage Company",
    "AI_agent": "Sarah"
  }
}
```

### **Test Variable Substitution**
Create a simple test prompt:
```
Hello! My name is {{AI_agent}} and I work at {{company_name}}.
```

Should result in:
```
Hello! My name is Sarah and I work at FluvioAI Mortgage Company.
```

## 💡 **Pro Tips**

### **Fallback Values**
Always provide default values in case variables aren't sent:
```
Hello! I'm {{AI_agent|Assistant}} from {{company_name|our company}}.
```

### **Conditional Logic**
Use conditional prompts for optional variables:
```
{{#company_hours}}Our hours are {{company_hours}}.{{/company_hours}}
{{#company_number}}You can reach us at {{company_number}}.{{/company_number}}
```

### **Variable Validation**
Test with both set and unset variables to ensure graceful handling.

## 🚀 **Next Steps**

1. **Update your Retell agent configuration** with proper dynamic variable usage
2. **Test the widget** - agent should now use personalized greetings
3. **Verify all variables** work in conversation context
4. **Deploy to clients** with confidence

The widget is working perfectly - it's just the agent configuration that needs updating! 🎯