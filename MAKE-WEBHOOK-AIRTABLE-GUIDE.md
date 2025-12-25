# Fix Dynamic Variables - Update Make.com Webhook with Airtable

## Overview
This guide shows how to update your existing Make.com webhook to properly handle dynamic variables by:
1. Looking up agent data from Airtable
2. Sending variables to Retell's Create Web Call API
3. Returning only the access token (with variables embedded)

---

## Current Problem
Your webhook is:
- ❌ Ignoring dynamic variables from widget
- ❌ Calling Retell API without variables
- ❌ Manually appending hardcoded variables to response
- ❌ Agent says "{{greeting}}" literally

## Solution
Update webhook to:
- ✅ Look up agent data from Airtable
- ✅ Send variables to Retell's Create Web Call API
- ✅ Return only access token (variables embedded)
- ✅ Agent uses actual personalized greetings

---

## Step 1: Prepare Airtable

### Create Airtable Base Structure
Create a table called **"Agents"** with these columns:

| Column Name | Type | Example Value |
|-------------|------|---------------|
| `agent_id` | Single line text | `agent_a4cb9032ec31e009d34b9be1a4` |
| `company_name` | Single line text | `FluvioAI` |
| `AI_agent` | Single line text | `Marissa` |
| `AI_agent_title` | Single line text | `Technical Sales Specialist` |
| `company_contact` | Single line text | `Av Utukuri` |
| `company_contact_title` | Single line text | `Head of Sales` |
| `company_number` | Single line text | `12894014100` |
| `company_hours` | Long text | `Weekdays 9 to 5PM, Closed on Saturdays and Sundays` |
| `company_address` | Long text | `5127 Tomken Rd, Mississauga, ON, L4W 1P1` |
| `company_sms_number` | Single line text | `14168963109` |
| `email_message_to` | Email | `sales@fluvioai.com` |
| `agent_timezone` | Single line text | `America/Toronto` |
| `available_languages` | Long text | `English, Spanish, Portuguese, French, German...` |
| `greeting` | Long text | `Hi, this is {{AI_agent}} at {{company_name}}. You can speak to me in over 35 languages. How can I help you transform your business with AI today?` |

### Add Your Agent Data
Create a record with your agent information:
- **agent_id**: `agent_a4cb9032ec31e009d34b9be1a4`
- Fill in all other columns with your FluvioAI data

---

## Step 2: Update Make.com Scenario

### Current Scenario Structure:
```
1. Webhook (receives request)
2. HTTP Module (calls Retell API)
3. Response (returns token + hardcoded variables)
```

### New Scenario Structure:
```
1. Webhook (receives request)
2. Airtable Module (lookup agent data)
3. HTTP Module (calls Retell API with variables)
4. Response (returns only token)
```

---

## Step 3: Configure Airtable Module

### Add Airtable Module:
1. **Click** between Webhook and HTTP modules
2. **Add** → **Airtable** → **Search Records**
3. **Configure**:
   - **Connection**: Connect your Airtable account
   - **Base**: Select your base
   - **Table**: `Agents`
   - **Formula**: `{agent_id} = "{{1.agent_id}}"`
   - **Max Records**: `1`

### Test Airtable Module:
1. **Run** the scenario once
2. **Verify** it finds your agent record
3. **Check** all fields are returned

---

## Step 4: Update HTTP Module (Retell API Call)

### Current HTTP Module Configuration:
```
URL: https://api.retellai.com/v2/create-web-call
Method: POST
Headers:
  Authorization: Bearer YOUR_RETELL_API_KEY
  Content-Type: application/json
Body:
{
  "agent_id": "{{1.agent_id}}"
}
```

### New HTTP Module Configuration:
```
URL: https://api.retellai.com/v2/create-web-call
Method: POST
Headers:
  Authorization: Bearer YOUR_RETELL_API_KEY
  Content-Type: application/json
Body:
{
  "agent_id": "{{1.agent_id}}",
  "retell_llm_dynamic_variables": {
    "company_name": "{{2.company_name}}",
    "AI_agent": "{{2.AI_agent}}",
    "AI_agent_title": "{{2.AI_agent_title}}",
    "company_contact": "{{2.company_contact}}",
    "company_contact_title": "{{2.company_contact_title}}",
    "company_number": "{{2.company_number}}",
    "company_hours": "{{2.company_hours}}",
    "company_address": "{{2.company_address}}",
    "company_sms_number": "{{2.company_sms_number}}",
    "email_message_to": "{{2.email_message_to}}",
    "agent_timezone": "{{2.agent_timezone}}",
    "available_languages": "{{2.available_languages}}",
    "greeting": "{{2.greeting}}",
    "AI_agent_number": "{{2.company_number}}",
    "dynamic_variable_1": "",
    "dynamic_variable_2": "",
    "dynamic_variable_3": ""
  }
}
```

**Note**: `{{2.field_name}}` refers to the Airtable module output (module #2)

---

## Step 5: Update Response Module

### Current Response:
```json
{
  "access_token": "{{3.access_token}}",
  "call_inbound": {
    "dynamic_variables": {
      "company_name": "FluvioAI",
      "AI_agent": "Marissa",
      ...
    }
  }
}
```

### New Response (Simplified):
```json
{
  "access_token": "{{3.access_token}}"
}
```

**Why**: Dynamic variables are now embedded in the access token by Retell API

---

## Step 6: Test the Updated Webhook

### Test Steps:
1. **Save** your Make.com scenario
2. **Run** a test from the widget
3. **Check** Make.com execution log:
   - ✅ Airtable lookup successful
   - ✅ HTTP request includes `retell_llm_dynamic_variables`
   - ✅ Response contains only access token
4. **Start a call** and verify agent uses personalized greeting

### Expected Result:
- **Before**: Agent says "{{greeting}}"
- **After**: Agent says "Hi, this is Marissa at FluvioAI. You can speak to me in over 35 languages..."

---

## Step 7: Add Multiple Clients (Future)

### For Each New Client:
1. **Add new record** in Airtable with different `agent_id`
2. **Fill in** their company information
3. **No code changes** needed - webhook automatically looks up correct data

### Example Multi-Client Setup:
| agent_id | company_name | AI_agent | greeting |
|----------|--------------|----------|----------|
| `agent_fluvio_123` | `FluvioAI` | `Marissa` | `Hi, this is {{AI_agent}} at {{company_name}}...` |
| `agent_client_456` | `ABC Realty` | `Sarah` | `Hello! I'm {{AI_agent}} from {{company_name}}. Looking for your dream home?` |
| `agent_client_789` | `XYZ Motors` | `Mike` | `Welcome to {{company_name}}! I'm {{AI_agent}}, ready to help you find the perfect car!` |

---

## Troubleshooting

### Agent Still Says "{{greeting}}"?
- **Check**: Airtable lookup is finding the record
- **Verify**: HTTP request includes `retell_llm_dynamic_variables`
- **Confirm**: Agent's system prompt uses `{{greeting}}` variable

### Airtable Module Not Finding Records?
- **Check**: Formula syntax: `{agent_id} = "{{1.agent_id}}"`
- **Verify**: agent_id in Airtable matches exactly
- **Test**: Run Airtable module independently

### HTTP Module Errors?
- **Check**: Retell API key is correct
- **Verify**: JSON syntax in request body
- **Test**: All Airtable fields are mapped correctly

---

## Benefits After Update

✅ **Scalable**: Add new clients by adding Airtable records  
✅ **Maintainable**: Update variables in Airtable, not code  
✅ **Correct**: Follows Retell API documentation  
✅ **Flexible**: Widget works for any client without changes  
✅ **Dynamic**: Variables embedded in access token properly  

## Next Steps

1. **Update** your Make.com scenario following this guide
2. **Test** with your current agent
3. **Add** new clients as Airtable records
4. **Scale** to unlimited agents without code changes

Your dynamic variables will finally work correctly! 🎉