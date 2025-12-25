# Fix Dynamic Variables - Update Make.com Webhook

## Problem
Dynamic variables are not working because they need to be passed to Retell's **Create Web Call API** when generating the access token, not when connecting to the call.

## Current Flow (Broken)
1. Widget → Make.com (sends variables)
2. Make.com → Retell API (creates call WITHOUT variables)
3. Make.com → Widget (returns token + variables separately)
4. Widget → Retell SDK (tries to pass variables - TOO LATE!)

## Correct Flow (Working)
1. Widget → Make.com (sends variables)
2. Make.com → Retell API (creates call WITH variables)
3. Make.com → Widget (returns token with variables already embedded)
4. Widget → Retell SDK (just uses token - variables already set)

---

## Step 1: Update Make.com Webhook

### Current Make.com HTTP Request:
```
POST https://api.retellai.com/v2/create-web-call
Headers:
  Authorization: Bearer YOUR_RETELL_API_KEY
  Content-Type: application/json

Body:
{
  "agent_id": "agent_a4cb9032ec31e009d34b9be1a4"
}
```

### New Make.com HTTP Request:
```
POST https://api.retellai.com/v2/create-web-call
Headers:
  Authorization: Bearer YOUR_RETELL_API_KEY
  Content-Type: application/json

Body:
{
  "agent_id": "agent_a4cb9032ec31e009d34b9be1a4",
  "retell_llm_dynamic_variables": {
    "company_contact": "Av Utukuri",
    "company_contact_title": "Head of Sales",
    "company_number": "12894014100",
    "company_hours": "Weekdays 9 to 5PM, Closed on Saturdays and Sundays",
    "AI_agent": "Marissa",
    "AI_agent_title": "Technical Sales Specialist",
    "AI_agent_number": "12894014100",
    "available_languages": "English, Spanish, Portuguese, French, German, Italian, Dutch, Russian, Chinese, Japanese, Korean, Hindi, Vietnamese, Romanian, Danish, Finnish, Greek, Indonesian, Norwegian, Slovak, Swedish, Bulgarian, Hungarian, Malay, Catalan, Turkish, Polish",
    "agent_timezone": "America/Toronto",
    "email_message_to": "sales@fluvioai.com",
    "company_sms_number": "14168963109",
    "company_address": "5127 Tomken Rd, Mississauga, ON, L4W 1P1",
    "company_name": "FluvioAI",
    "dynamic_variable_1": "",
    "dynamic_variable_2": "",
    "dynamic_variable_3": "",
    "greeting": "Hi, this is {{AI_agent}} at {{company_name}}. You can speak to me in over 35 languages. How can I help you transform your business with AI today?"
  }
}
```

## Step 2: Update Make.com Response

### Current Response Format:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiJ9...",
  "call_inbound": {
    "dynamic_variables": {
      "company_name": "FluvioAI",
      "AI_agent": "Marissa",
      ...
    }
  }
}
```

### New Response Format (Simplified):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Note:** The dynamic variables are now embedded in the access token, so you don't need to return them separately.

---

## Step 3: Make.com Configuration

### In your Make.com scenario:

1. **HTTP Module** (receives widget request):
   - Receives: `agent_id` and `dynamic_variables` from widget
   
2. **HTTP Module** (calls Retell API):
   - URL: `https://api.retellai.com/v2/create-web-call`
   - Method: `POST`
   - Headers: 
     - `Authorization: Bearer YOUR_RETELL_API_KEY`
     - `Content-Type: application/json`
   - Body:
     ```json
     {
       "agent_id": "{{agent_id}}",
       "retell_llm_dynamic_variables": {{dynamic_variables}}
     }
     ```

3. **Response Module**:
   - Return only: `{"access_token": "{{access_token}}"}`

---

## Step 4: Test the Fix

1. **Update your Make.com webhook** with the new format
2. **Test a call** from the widget
3. **Check the agent response** - should now use dynamic variables:
   - Instead of: "{{greeting}}"
   - Should say: "Hi, this is Marissa at FluvioAI. You can speak to me in over 35 languages..."

## Step 5: Verify in Retell Dashboard

After the fix:
1. Go to Retell Dashboard → Calls
2. Find your test call
3. Click on **Data** tab
4. Dynamic Variables should still show up (confirming they were passed correctly)
5. But now the **agent will actually use them** in conversation

---

## Important Notes

- **Widget code doesn't need to change** - it already sends dynamic variables correctly
- **Only the Make.com webhook needs updating** to pass variables to Retell API
- **Variables must be strings** - numbers/booleans won't work
- **Test thoroughly** after making changes

## Expected Result

After this fix, when someone starts a call:
1. Agent will use the actual greeting instead of saying "{{greeting}}"
2. Agent will know it's "Marissa from FluvioAI"
3. Agent will have all company information available
4. Dynamic variables will work as intended

The technical implementation will be correct according to Retell's API documentation.