# Quick Agent Setup Guide - Enable Dynamic Variables

## What You Need to Do

Your voice widget is working perfectly! You just need to update your Fluvio agent to use the personalized information (company name, agent name, etc.) that the widget is sending.

Currently, your agent says "{{greeting}}" literally. After this 5-minute setup, it will say personalized greetings like:
> "Hi! I'm Sarah, your Mortgage Specialist at FluvioAI. Ready to get pre-approved for your dream home?"

## 5-Minute Setup Steps

### Step 1: Login to Fluvio Dashboard
1. Go to [dashboard.retellai.com](https://dashboard.retellai.com)
2. Login with your Fluvio account
3. Find your agent: `agent_a4cb9032ec31e009d34b9be1a4`

### Step 2: Update Agent Prompt
1. Click on your agent to open settings
2. Find the **"System Prompt"** or **"Agent Prompt"** section
3. **Replace the current prompt** with this:

```
You are {{AI_agent}}, a {{AI_agent_title}} at {{company_name}}.

Start every conversation with this greeting: {{greeting}}

Key information about your role:
- Your name: {{AI_agent}}
- Your title: {{AI_agent_title}}
- Company: {{company_name}}
- Business hours: {{company_hours}}
- Phone number: {{company_number}}
- Office address: {{company_address}}

Use this information naturally in conversations when customers ask about:
- Company hours
- Contact information
- Your name or role
- Company details

Be helpful, professional, and personalized using the information provided.
```

### Step 3: Configure Dynamic Variables
1. In the same agent settings, find **"Dynamic Variables"** section
2. **Add these variables** (click "Add Variable" for each):

| Variable Name | Default Value |
|---------------|---------------|
| `greeting` | `Hello! How can I help you today?` |
| `company_name` | `Our Company` |
| `AI_agent` | `Assistant` |
| `AI_agent_title` | `Customer Service Representative` |
| `company_hours` | `Business hours vary` |
| `company_number` | `Please contact us` |
| `company_address` | `Our office location` |

### Step 4: Save & Test
1. **Click "Save"** to update your agent
2. add  on your website

```
<script src="https://otitodev.github.io/Fluvio-widget/fluvio-universal-widget.js" 
        data-webhook="https://hook.us2.make.com/client-webhook"
        data-agent-id="agent_client_id"
        data-company-name="ABC Realty"
        data-agent-name="Sarah"
        data-agent-title="Real Estate Agent"
        data-company-hours="Mon-Fri 9am-6pm"
        data-greeting="Hi! I'm {{AI_agent}} from {{company_name}}. Looking for your dream home?"></script>
```

3. **Start a call** - agent should now use personalized greeting!

## Expected Results

### Before Setup:
```
Agent: "{{greeting}}"
```

### After Setup:
```
Agent: "Hi! I'm Marissa, your Sales Associate at FluvioAI. 
        Ready to help you get that new house! How can I help?"
```

## Customization Examples

### Real Estate Agent:
```
You are {{AI_agent}}, a {{AI_agent_title}} at {{company_name}}.

{{greeting}}

I specialize in helping clients find their dream homes. Our office hours are {{company_hours}}, and you can reach us at {{company_number}}.
```

### Mortgage Specialist:
```
You are {{AI_agent}}, a {{AI_agent_title}} at {{company_name}}.

{{greeting}}

I'm here to help you with mortgage pre-approval, refinancing, and home loans. We're available {{company_hours}}.
```

### Customer Support:
```
You are {{AI_agent}} from {{company_name}} customer support.

{{greeting}}

I can help with account questions, technical support, and general inquiries. Our support hours are {{company_hours}}.
```

## Troubleshooting

### Agent Still Says "{{greeting}}"?
- Make sure you **saved** the agent settings
- Check that the **System Prompt** was updated correctly
- Wait 1-2 minutes for changes to take effect

### Variables Not Working?
- Verify **Dynamic Variables** are added in agent settings
- Check variable names match exactly (case-sensitive)
- Test with a new call (not existing call)

### Need Help?
- Check Fluvio Dashboard → Call Logs → Recent Call
- Look for "Dynamic Variables" in call details
- Should show the personalized information being sent

## You're Done!

After completing these steps:
- Agent uses personalized greetings
- Agent knows company information
- Conversations feel natural and branded
- Each client gets customized experience

Your voice widget is now fully personalized and ready for production!

---

**Need assistance?** Contact support with your agent ID: `agent_a4cb9032ec31e009d34b9be1a4`