# Create Web Call

> Create a new web call



## OpenAPI

````yaml openapi-final post /v2/create-web-call
openapi: 3.0.3
info:
  title: Retell SDK
  version: 3.0.0
  contact:
    name: Retell Support
    url: https://www.retellai.com/
    email: support@retellai.com
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
servers:
  - url: https://api.retellai.com
    description: The production server.
security:
  - api_key: []
paths:
  /v2/create-web-call:
    post:
      description: Create a new web call
      operationId: createWebCall
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - agent_id
              properties:
                agent_id:
                  type: string
                  example: oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD
                  description: >-
                    Unique id of agent used for the call. Your agent would
                    contain the LLM Websocket url used for this call.
                agent_version:
                  type: integer
                  example: 1
                  description: The version of the agent to use for the call.
                agent_override:
                  $ref: '#/components/schemas/AgentOverrideRequest'
                  description: >-
                    For this particular call, override agent configuration with
                    these settings. This allows you to customize agent behavior
                    for individual calls without modifying the base agent.
                metadata:
                  type: object
                  description: >-
                    An arbitrary object for storage purpose only. You can put
                    anything here like your internal customer id associated with
                    the call. Not used for processing. You can later get this
                    field from the call object.
                retell_llm_dynamic_variables:
                  type: object
                  additionalProperties: {}
                  example:
                    customer_name: John Doe
                  description: >-
                    Add optional dynamic variables in key value pairs of string
                    that injects into your Response Engine prompt and tool
                    description. Only applicable for Response Engine.
      responses:
        '201':
          description: Successfully created a web call.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/V2WebCallResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '402':
          $ref: '#/components/responses/PaymentRequired'
        '422':
          $ref: '#/components/responses/UnprocessableContent'
        '429':
          $ref: '#/components/responses/TooManyRequests'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    AgentOverrideRequest:
      type: object
      description: >-
        Override configuration for agent, retell LLM, or conversation flow
        settings for a specific call.
      properties:
        agent:
          $ref: '#/components/schemas/AgentRequest'
          description: >-
            Override agent configuration settings. Any properties specified here
            will override the base agent configuration for this call.
        retell_llm:
          $ref: '#/components/schemas/RetellLlmOverride'
          description: >-
            Override Retell LLM configuration settings. Only applicable when
            using Retell LLM as the response engine. Supported attributes -
            model, s2s_model, model_temperature, model_high_priority,
            tool_call_strict_mode, knowledge_base_ids, kb_config, start_speaker,
            begin_after_user_silence_ms, begin_message.
        conversation_flow:
          $ref: '#/components/schemas/ConversationFlowOverride'
          description: >-
            Override conversation flow configuration settings. Only applicable
            when using conversation flow as the response engine. Supported
            attributes - model_choice, model_temperature, tool_call_strict_mode,
            knowledge_base_ids, kb_config, start_speaker,
            begin_after_user_silence_ms.
    V2WebCallResponse:
      allOf:
        - type: object
          required:
            - call_type
            - access_token
          properties:
            call_type:
              type: string
              enum:
                - web_call
              example: web_call
              description: >-
                Type of the call. Used to distinguish between web call and phone
                call.
            access_token:
              type: string
              example: eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9p
              description: >-
                Access token to enter the web call room. This needs to be passed
                to your frontend to join the call.
        - $ref: '#/components/schemas/V2CallBase'
    AgentRequest:
      type: object
      properties:
        response_engine:
          $ref: '#/components/schemas/ResponseEngine'
          description: >-
            The Response Engine to attach to the agent. It is used to generate
            responses for the agent. You need to create a Response Engine first
            before attaching it to an agent.
          example:
            type: retell-llm
            llm_id: llm_234sdertfsdsfsdf
            version: 0
        agent_name:
          type: string
          example: Jarvis
          description: The name of the agent. Only used for your own reference.
          nullable: true
        version_description:
          type: string
          example: Customer support agent for handling product inquiries
          description: >-
            Optional description of the agent version. Used for your own
            reference and documentation.
          nullable: true
        voice_id:
          type: string
          example: 11labs-Adrian
          description: >-
            Unique voice id used for the agent. Find list of available voices
            and their preview in Dashboard.
        voice_model:
          type: string
          enum:
            - eleven_turbo_v2
            - eleven_flash_v2
            - eleven_turbo_v2_5
            - eleven_flash_v2_5
            - eleven_multilingual_v2
            - sonic-2
            - sonic-3
            - sonic-turbo
            - tts-1
            - gpt-4o-mini-tts
            - speech-02-turbo
            - null
          description: >-
            Select the voice model used for the selected voice. Each provider
            has a set of available voice models. Set to null to remove voice
            model selection, and default ones will apply. Check out dashboard
            for more details of each voice model.
          nullable: true
        fallback_voice_ids:
          type: array
          items:
            type: string
          example:
            - openai-Alloy
            - deepgram-Angus
          description: >-
            When TTS provider for the selected voice is experiencing outages, we
            would use fallback voices listed here for the agent. Voice id and
            the fallback voice ids must be from different TTS providers. The
            system would go through the list in order, if the first one in the
            list is also having outage, it would use the next one. Set to null
            to remove voice fallback for the agent.
          nullable: true
        voice_temperature:
          type: number
          example: 1
          description: >-
            Controls how stable the voice is. Value ranging from [0,2]. Lower
            value means more stable, and higher value means more variant speech
            generation. Currently this setting only applies to `11labs` voices.
            If unset, default value 1 will apply.
        voice_speed:
          type: number
          example: 1
          description: >-
            Controls speed of voice. Value ranging from [0.5,2]. Lower value
            means slower speech, while higher value means faster speech rate. If
            unset, default value 1 will apply.
        volume:
          type: number
          example: 1
          description: >-
            If set, will control the volume of the agent. Value ranging from
            [0,2]. Lower value means quieter agent speech, while higher value
            means louder agent speech. If unset, default value 1 will apply.
        responsiveness:
          type: number
          example: 1
          description: >-
            Controls how responsive is the agent. Value ranging from [0,1].
            Lower value means less responsive agent (wait more, respond slower),
            while higher value means faster exchanges (respond when it can). If
            unset, default value 1 will apply.
        interruption_sensitivity:
          type: number
          example: 1
          description: >-
            Controls how sensitive the agent is to user interruptions. Value
            ranging from [0,1]. Lower value means it will take longer / more
            words for user to interrupt agent, while higher value means it's
            easier for user to interrupt agent. If unset, default value 1 will
            apply. When this is set to 0, agent would never be interrupted.
        enable_backchannel:
          type: boolean
          example: true
          description: >-
            Controls whether the agent would backchannel (agent interjects the
            speaker with phrases like "yeah", "uh-huh" to signify interest and
            engagement). Backchannel when enabled tends to show up more in
            longer user utterances. If not set, agent will not backchannel.
        backchannel_frequency:
          type: number
          example: 0.9
          description: >-
            Only applicable when enable_backchannel is true. Controls how often
            the agent would backchannel when a backchannel is possible. Value
            ranging from [0,1]. Lower value means less frequent backchannel,
            while higher value means more frequent backchannel. If unset,
            default value 0.8 will apply.
        backchannel_words:
          type: array
          items:
            type: string
          example:
            - yeah
            - uh-huh
          description: >-
            Only applicable when enable_backchannel is true. A list of words
            that the agent would use as backchannel. If not set, default
            backchannel words will apply. Check out [backchannel default
            words](/agent/interaction-configuration#backchannel) for more
            details. Note that certain voices do not work too well with certain
            words, so it's recommended to experiment before adding any words.
          nullable: true
        reminder_trigger_ms:
          type: number
          example: 10000
          description: >-
            If set (in milliseconds), will trigger a reminder to the agent to
            speak if the user has been silent for the specified duration after
            some agent speech. Must be a positive number. If unset, default
            value of 10000 ms (10 s) will apply.
        reminder_max_count:
          type: integer
          example: 2
          description: >-
            If set, controls how many times agent would remind user when user is
            unresponsive. Must be a non negative integer. If unset, default
            value of 1 will apply (remind once). Set to 0 to disable agent from
            reminding.
        ambient_sound:
          type: string
          enum:
            - coffee-shop
            - convention-hall
            - summer-outdoor
            - mountain-outdoor
            - static-noise
            - call-center
            - null
          description: >-
            If set, will add ambient environment sound to the call to make
            experience more realistic. Currently supports the following options:


            - `coffee-shop`: Coffee shop ambience with people chatting in
            background. [Listen to
            Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/coffee-shop.wav)


            - `convention-hall`: Convention hall ambience, with some echo and
            people chatting in background. [Listen to
            Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)


            - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
            [Listen to
            Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)


            - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
            [Listen to
            Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)


            - `static-noise`: Constant static noise. [Listen to
            Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)


            - `call-center`: Call center work noise. [Listen to
            Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/call-center.wav)

             Set to `null` to remove ambient sound from this agent.
          nullable: true
        ambient_sound_volume:
          type: number
          example: 1
          description: >-
            If set, will control the volume of the ambient sound. Value ranging
            from [0,2]. Lower value means quieter ambient sound, while higher
            value means louder ambient sound. If unset, default value 1 will
            apply.
        language:
          type: string
          example: en-US
          enum:
            - en-US
            - en-IN
            - en-GB
            - en-AU
            - en-NZ
            - de-DE
            - es-ES
            - es-419
            - hi-IN
            - fr-FR
            - fr-CA
            - ja-JP
            - pt-PT
            - pt-BR
            - zh-CN
            - ru-RU
            - it-IT
            - ko-KR
            - nl-NL
            - nl-BE
            - pl-PL
            - tr-TR
            - vi-VN
            - ro-RO
            - bg-BG
            - ca-ES
            - th-TH
            - da-DK
            - fi-FI
            - el-GR
            - hu-HU
            - id-ID
            - no-NO
            - sk-SK
            - sv-SE
            - ms-MY
            - af-ZA
            - ar-SA
            - az-AZ
            - bs-BA
            - cy-GB
            - fa-IR
            - fil-PH
            - gl-ES
            - he-IL
            - hr-HR
            - hy-AM
            - is-IS
            - kk-KZ
            - kn-IN
            - mk-MK
            - mr-IN
            - ne-NP
            - sl-SI
            - sr-RS
            - sw-KE
            - ta-IN
            - ur-IN
            - yue-CN
            - uk-UA
            - multi
          description: >-
            Specifies what language (and dialect) the speech recognition will
            operate in. For instance, selecting `en-GB` optimizes speech
            recognition for British English. If unset, will use default value
            `en-US`. Select `multi` for multilingual support.
        webhook_url:
          type: string
          example: https://webhook-url-here
          description: >-
            The webhook for agent to listen to call events. See what events it
            would get at [webhook doc](/features/webhook). If set, will binds
            webhook events for this agent to the specified url, and will ignore
            the account level webhook for this agent. Set to `null` to remove
            webhook url from this agent.
          nullable: true
        webhook_timeout_ms:
          type: integer
          example: 10000
          description: >-
            The timeout for the webhook in milliseconds. If not set, default
            value of 10000 will apply.
        boosted_keywords:
          type: array
          items:
            type: string
          example:
            - retell
            - kroger
          description: >-
            Provide a customized list of keywords to bias the transcriber model,
            so that these words are more likely to get transcribed. Commonly
            used for names, brands, street, etc.
          nullable: true
        data_storage_setting:
          type: string
          enum:
            - everything
            - everything_except_pii
            - basic_attributes_only
          example: everything
          description: >
            Granular setting to manage how Retell stores sensitive data
            (transcripts, recordings, logs, etc.).

            This replaces the deprecated `opt_out_sensitive_data_storage` field.

            - `everything`: Store all data including transcripts, recordings,
            and logs.

            - `everything_except_pii`: Store data without PII when PII is
            detected.

            - `basic_attributes_only`: Store only basic attributes; no
            transcripts/recordings/logs.

            If not set, default value of "everything" will apply.
        opt_in_signed_url:
          type: boolean
          example: true
          description: >-
            Whether this agent opts in for signed URLs for public logs and
            recordings. When enabled, the generated URLs will include security
            signatures that restrict access and automatically expire after 24
            hours.
        signed_url_expiration_ms:
          type: integer
          example: 86400000
          description: >-
            The expiration time for the signed url in milliseconds. Only
            applicable when opt_in_signed_url is true. If not set, default value
            of 86400000 (24 hours) will apply.
          nullable: true
        pronunciation_dictionary:
          type: array
          items:
            type: object
            required:
              - word
              - alphabet
              - phoneme
            properties:
              word:
                type: string
                example: actually
                description: >-
                  The string of word / phrase to be annotated with
                  pronunciation.
              alphabet:
                type: string
                enum:
                  - ipa
                  - cmu
                example: ipa
                description: The phonetic alphabet to be used for pronunciation.
              phoneme:
                type: string
                example: ˈæktʃuəli
                description: >-
                  Pronunciation of the word in the format of a IPA / CMU
                  pronunciation.
          description: >-
            A list of words / phrases and their pronunciation to be used to
            guide the audio synthesize for consistent pronunciation. Currently
            only supported for English & 11labs voices. Set to null to remove
            pronunciation dictionary from this agent.
          nullable: true
        normalize_for_speech:
          type: boolean
          example: true
          description: >-
            If set to true, will normalize the some part of text (number,
            currency, date, etc) to spoken to its spoken form for more
            consistent speech synthesis (sometimes the voice synthesize system
            itself might read these wrong with the raw text). For example, it
            will convert "Call my number 2137112342 on Jul 5th, 2024 for the
            $24.12 payment" to "Call my number two one three seven one one two
            three four two on july fifth, twenty twenty four for the twenty four
            dollars twelve cents payment" before starting audio generation.
        end_call_after_silence_ms:
          type: integer
          example: 600000
          description: >-
            If users stay silent for a period after agent speech, end the call.
            The minimum value allowed is 10,000 ms (10 s). By default, this is
            set to 600000 (10 min).
        max_call_duration_ms:
          type: integer
          example: 3600000
          description: >-
            Maximum allowed length for the call, will force end the call if
            reached. The minimum value allowed is 60,000 ms (1 min), and maximum
            value allowed is 7,200,000 (2 hours). By default, this is set to
            3,600,000 (1 hour).
        enable_voicemail_detection:
          type: boolean
          example: true
          description: >-
            If set to true, will detect whether the call enters a voicemail.
            Note that this feature is only available for phone calls.
        voicemail_message:
          type: string
          example: Hi, please give us a callback.
          description: >-
            The message to be played when the call enters a voicemail. Note that
            this feature is only available for phone calls. If you want to
            hangup after hitting voicemail, set this to empty string.
        voicemail_detection_timeout_ms:
          type: integer
          example: 30000
          description: >-
            Configures when to stop running voicemail detection, as it becomes
            unlikely to hit voicemail after a couple minutes, and keep running
            it will only have negative impact. The minimum value allowed is
            5,000 ms (5 s), and maximum value allowed is 180,000 (3 minutes). By
            default, this is set to 30,000 (30 s).
        voicemail_option:
          type: object
          properties:
            action:
              $ref: '#/components/schemas/VoicemailAction'
          required:
            - action
          description: >-
            If this option is set, the call will try to detect voicemail in the
            first 3 minutes of the call. Actions defined (hangup, or leave a
            message) will be applied when the voicemail is detected. Set this to
            null to disable voicemail detection.
          example:
            action:
              type: static_text
              text: Please give us a callback tomorrow at 10am.
          nullable: true
        post_call_analysis_data:
          type: array
          items:
            $ref: '#/components/schemas/AnalysisData'
          description: >-
            Post call analysis data to extract from the call. This data will
            augment the pre-defined variables extracted in the call analysis.
            This will be available after the call ends.
          nullable: true
        post_call_analysis_model:
          $ref: '#/components/schemas/NullableLLMModel'
          example: gpt-4.1-mini
          description: The model to use for post call analysis. Default to gpt-4.1-mini.
        analysis_successful_prompt:
          type: string
          maxLength: 2000
          example: >-
            The agent finished the task and the call was complete without being
            cutoff.
          description: >-
            Prompt to determine whether the post call or chat analysis should
            mark the interaction as successful. Set to null to use the default
            prompt.
          nullable: true
        analysis_summary_prompt:
          type: string
          maxLength: 2000
          example: Summarize the outcome of the conversation in two sentences.
          description: >-
            Prompt to guide how the post call or chat analysis summary should be
            generated. When unset, the default system prompt is used. Set to
            null to use the default prompt.
          nullable: true
        begin_message_delay_ms:
          type: integer
          example: 1000
          description: >-
            If set, will delay the first message by the specified amount of
            milliseconds, so that it gives user more time to prepare to take the
            call. Valid range is [0, 5000]. If not set or set to 0, agent will
            speak immediately. Only applicable when agent speaks first.
        ring_duration_ms:
          type: integer
          example: 30000
          description: >-
            If set, the phone ringing will last for the specified amount of
            milliseconds. This applies for both outbound call ringtime, and call
            transfer ringtime. Default to 30000 (30 s). Valid range is [5000,
            90000].
        stt_mode:
          type: string
          enum:
            - fast
            - accurate
          example: fast
          description: >-
            If set, determines whether speech to text should focus on latency or
            accuracy. Default to fast mode.
        vocab_specialization:
          type: string
          enum:
            - general
            - medical
          example: general
          description: >-
            If set, determines the vocabulary set to use for transcription. This
            setting only applies for English agents, for non English agent, this
            setting is a no-op. Default to general.
        allow_user_dtmf:
          type: boolean
          example: true
          description: >-
            If set to true, DTMF input will be accepted and processed. If false,
            any DTMF input will be ignored. Default to true.
        user_dtmf_options:
          type: object
          properties:
            digit_limit:
              type: number
              description: >-
                The maximum number of digits allowed in the user's DTMF
                (Dual-Tone Multi-Frequency) input per turn. Once this limit is
                reached, the input is considered complete and a response will be
                generated immediately.
              nullable: true
              minimum: 1
              maximum: 50
            termination_key:
              type: string
              nullable: true
              description: >-
                A single key that signals the end of DTMF input. Acceptable
                values include any digit (0–9), the pound/hash symbol (#), or
                the asterisk (*).
              example: '#'
            timeout_ms:
              type: integer
              description: >-
                The time (in milliseconds) to wait for user DTMF input before
                timing out. The timer resets with each digit received.
              minimum: 1000
              maximum: 15000
          nullable: true
        denoising_mode:
          type: string
          enum:
            - noise-cancellation
            - noise-and-background-speech-cancellation
          example: noise-cancellation
          description: >-
            If set, determines what denoising mode to use. Default to
            noise-cancellation.
        pii_config:
          $ref: '#/components/schemas/PIIConfig'
          description: Configuration for PII scrubbing from transcripts and recordings.
    RetellLlmOverride:
      type: object
      description: >-
        Override properties for Retell LLM configuration in agent override
        requests.
      properties:
        model:
          $ref: '#/components/schemas/NullableLLMModel'
          example: gpt-4.1
          description: >-
            Select the underlying text LLM. If not set, would default to
            gpt-4.1.
        s2s_model:
          type: string
          enum:
            - gpt-4o-realtime
            - gpt-4o-mini-realtime
            - gpt-realtime
            - gpt-realtime-mini
            - null
          example: gpt-4o-realtime
          description: >-
            Select the underlying speech to speech model. Can only set this or
            model, not both.
          nullable: true
        model_temperature:
          type: number
          example: 0
          description: >-
            If set, will control the randomness of the response. Value ranging
            from [0,1]. Lower value means more deterministic, while higher value
            means more random. If unset, default value 0 will apply. Note that
            for tool calling, a lower value is recommended.
        model_high_priority:
          type: boolean
          example: true
          description: >-
            If set to true, will use high priority pool with more dedicated
            resource to ensure lower and more consistent latency, default to
            false. This feature usually comes with a higher cost.
          nullable: true
        tool_call_strict_mode:
          type: boolean
          example: true
          description: >-
            Whether to use strict mode for tool calls. Only applicable when
            using certain supported models.
          nullable: true
        knowledge_base_ids:
          type: array
          items:
            type: string
          description: A list of knowledge base ids to use for this resource.
          nullable: true
        kb_config:
          $ref: '#/components/schemas/KBConfig'
          type: object
          description: Knowledge base configuration for RAG retrieval.
          nullable: true
        start_speaker:
          type: string
          enum:
            - user
            - agent
          description: >-
            The speaker who starts the conversation. Required. Must be either
            'user' or 'agent'.
        begin_after_user_silence_ms:
          type: integer
          example: 2000
          description: >-
            If set, the AI will begin the conversation after waiting for the
            user for the duration (in milliseconds) specified by this attribute.
            This only applies if the agent is configured to wait for the user to
            speak first. If not set, the agent will wait indefinitely for the
            user to speak.
          nullable: true
        begin_message:
          type: string
          example: Hey I am a virtual assistant calling from Retell Hospital.
          description: >-
            First utterance said by the agent in the call. If not set, LLM will
            dynamically generate a message. If set to "", agent will wait for
            user to speak first.
          nullable: true
    ConversationFlowOverride:
      type: object
      description: >-
        Override properties for conversation flow configuration in agent
        override requests.
      properties:
        model_choice:
          $ref: '#/components/schemas/ModelChoice'
          description: The model choice for the conversation flow.
        model_temperature:
          type: number
          minimum: 0
          maximum: 1
          example: 0.7
          description: >-
            Controls the randomness of the model's responses. Lower values make
            responses more deterministic.
          nullable: true
        tool_call_strict_mode:
          type: boolean
          example: true
          description: >-
            Whether to use strict mode for tool calls. Only applicable when
            using certain supported models.
          nullable: true
        knowledge_base_ids:
          type: array
          items:
            type: string
          example:
            - kb_001
            - kb_002
          description: Knowledge base IDs for RAG (Retrieval-Augmented Generation).
          nullable: true
        kb_config:
          $ref: '#/components/schemas/KBConfig'
          type: object
          description: Knowledge base configuration for RAG retrieval.
        start_speaker:
          type: string
          enum:
            - user
            - agent
          example: agent
          description: Who starts the conversation - user or agent.
        begin_after_user_silence_ms:
          type: integer
          example: 2000
          description: >-
            If set, the AI will begin the conversation after waiting for the
            user for the duration (in milliseconds) specified by this attribute.
            This only applies if the agent is configured to wait for the user to
            speak first. If not set, the agent will wait indefinitely for the
            user to speak.
          nullable: true
    V2CallBase:
      type: object
      required:
        - call_id
        - agent_id
        - agent_version
        - call_status
      properties:
        call_id:
          type: string
          example: Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6
          description: >-
            Unique id of the call. Used to identify in LLM websocket and used to
            authenticate in audio websocket.
        agent_id:
          type: string
          example: oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD
          description: Corresponding agent id of this call.
        agent_name:
          type: string
          example: My Agent
          description: Name of the agent.
        agent_version:
          type: integer
          example: 1
          description: The version of the agent.
        call_status:
          type: string
          enum:
            - registered
            - not_connected
            - ongoing
            - ended
            - error
          example: registered
          description: >-
            Status of call.


            - `registered`: Call id issued, starting to make a call using this
            id.


            - `ongoing`: Call connected and ongoing.


            - `ended`: The underlying websocket has ended for the call. Either
            user or agent hanged up, or call transferred. 


            - `error`: Call encountered error.
        metadata:
          type: object
          description: >-
            An arbitrary object for storage purpose only. You can put anything
            here like your internal customer id associated with the call. Not
            used for processing. You can later get this field from the call
            object.
        retell_llm_dynamic_variables:
          type: object
          additionalProperties: {}
          example:
            customer_name: John Doe
          description: >-
            Add optional dynamic variables in key value pairs of string that
            injects into your Response Engine prompt and tool description. Only
            applicable for Response Engine.
        collected_dynamic_variables:
          type: object
          additionalProperties: {}
          example:
            last_node_name: Test node
          description: >-
            Dynamic variables collected from the call. Only available after the
            call ends.
        custom_sip_headers:
          type: object
          additionalProperties:
            type: string
          example:
            X-Custom-Header: Custom Value
          description: Custom SIP headers to be added to the call.
        data_storage_setting:
          type: string
          enum:
            - everything
            - everything_except_pii
            - basic_attributes_only
          example: everything
          description: >-
            Data storage setting for this call's agent. "everything" stores all
            data, "everything_except_pii" excludes PII when possible,
            "basic_attributes_only" stores only metadata.
          nullable: true
        opt_in_signed_url:
          type: boolean
          example: true
          description: >-
            Whether this agent opts in for signed URLs for public logs and
            recordings. When enabled, the generated URLs will include security
            signatures that restrict access and automatically expire after 24
            hours.
        start_timestamp:
          type: integer
          example: 1703302407333
          description: >-
            Begin timestamp (milliseconds since epoch) of the call. Available
            after call starts.
        end_timestamp:
          type: integer
          example: 1703302428855
          description: >-
            End timestamp (milliseconds since epoch) of the call. Available
            after call ends.
        duration_ms:
          type: integer
          example: 10000
          description: Duration of the call in milliseconds. Available after call ends.
        transcript:
          type: string
          example: |-
            Agent: hi how are you doing?
            User: Doing pretty well. How are you?
            Agent: That's great to hear! I'm doing well too, thanks! What's up?
            User: I don't have anything in particular.
            Agent: Got it, just checking in!
            User: Alright. See you.
            Agent: have a nice day
          description: Transcription of the call. Available after call ends.
        transcript_object:
          type: array
          items:
            $ref: '#/components/schemas/Utterance'
          description: >-
            Transcript of the call in the format of a list of utterance, with
            timestamp. Available after call ends.
        transcript_with_tool_calls:
          type: array
          items:
            $ref: '#/components/schemas/UtteranceOrToolCall'
          description: >-
            Transcript of the call weaved with tool call invocation and results.
            It precisely captures when (at what utterance, which word) the tool
            was invoked and what was the result. Available after call ends.
        scrubbed_transcript_with_tool_calls:
          type: array
          items:
            $ref: '#/components/schemas/UtteranceOrToolCall'
          description: >-
            Transcript of the call weaved with tool call invocation and results,
            without PII. It precisely captures when (at what utterance, which
            word) the tool was invoked and what was the result. Available after
            call ends.
        recording_url:
          type: string
          example: >-
            https://retellai.s3.us-west-2.amazonaws.com/Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6/recording.wav
          description: Recording of the call. Available after call ends.
        recording_multi_channel_url:
          type: string
          example: >-
            https://retellai.s3.us-west-2.amazonaws.com/Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6/recording_multichannel.wav
          description: >-
            Recording of the call, with each party's audio stored in a separate
            channel. Available after the call ends.
        scrubbed_recording_url:
          type: string
          example: >-
            https://retellai.s3.us-west-2.amazonaws.com/Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6/recording.wav
          description: Recording of the call without PII. Available after call ends.
        scrubbed_recording_multi_channel_url:
          type: string
          example: >-
            https://retellai.s3.us-west-2.amazonaws.com/Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6/recording_multichannel.wav
          description: >-
            Recording of the call without PII, with each party's audio stored in
            a separate channel. Available after the call ends.
        public_log_url:
          type: string
          example: >-
            https://retellai.s3.us-west-2.amazonaws.com/Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6/public_log.txt
          description: >-
            Public log of the call, containing details about all the requests
            and responses received in LLM WebSocket, latency tracking for each
            turntaking, helpful for debugging and tracing. Available after call
            ends.
        knowledge_base_retrieved_contents_url:
          type: string
          example: >-
            https://retellai.s3.us-west-2.amazonaws.com/Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6/kb_retrieved_contents.txt
          description: >-
            URL to the knowledge base retrieved contents of the call. Available
            after call ends if the call utilizes knowledge base feature. It
            consists of the respond id and the retrieved contents related to
            that response. It's already rendered in call history tab of
            dashboard, and you can also manually download and check against the
            transcript to view the knowledge base retrieval results.
        latency:
          type: object
          description: >-
            Latency tracking of the call, available after call ends. Not all
            fields here will be available, as it depends on the type of call and
            feature used.
          properties:
            e2e:
              $ref: '#/components/schemas/CallLatency'
              description: >-
                End to end latency (from user stops talking to agent start
                talking) tracking of the call. This latency does not account for
                the network trip time from Retell server to user frontend. The
                latency is tracked every time turn change between user and
                agent.
            asr:
              $ref: '#/components/schemas/CallLatency'
              description: >-
                Transcription latency (diff between the duration of the chunks
                streamed and the durations of the transcribed part) tracking of
                the call.
            llm:
              $ref: '#/components/schemas/CallLatency'
              description: >-
                LLM latency (from issue of LLM call to first speakable chunk
                received) tracking of the call. When using custom LLM. this
                latency includes LLM websocket roundtrip time between user
                server and Retell server.
            llm_websocket_network_rtt:
              $ref: '#/components/schemas/CallLatency'
              description: >-
                LLM websocket roundtrip latency (between user server and Retell
                server) tracking of the call. Only populated for calls using
                custom LLM.
            tts:
              $ref: '#/components/schemas/CallLatency'
              description: >-
                Text-to-speech latency (from the triggering of TTS to first byte
                received) tracking of the call.
            knowledge_base:
              $ref: '#/components/schemas/CallLatency'
              description: >-
                Knowledge base latency (from the triggering of knowledge base
                retrival to all relevant context received) tracking of the call.
                Only populated when using knowledge base feature for the agent
                of the call.
            s2s:
              $ref: '#/components/schemas/CallLatency'
              description: >-
                Speech-to-speech latency (from requesting responses of a S2S
                model to first byte received) tracking of the call. Only
                populated for calls that uses S2S model like Realtime API.
        disconnection_reason:
          type: string
          enum:
            - user_hangup
            - agent_hangup
            - call_transfer
            - voicemail_reached
            - inactivity
            - max_duration_reached
            - concurrency_limit_reached
            - no_valid_payment
            - scam_detected
            - dial_busy
            - dial_failed
            - dial_no_answer
            - invalid_destination
            - telephony_provider_permission_denied
            - telephony_provider_unavailable
            - sip_routing_error
            - marked_as_spam
            - user_declined
            - error_llm_websocket_open
            - error_llm_websocket_lost_connection
            - error_llm_websocket_runtime
            - error_llm_websocket_corrupt_payload
            - error_no_audio_received
            - error_asr
            - error_retell
            - error_unknown
            - error_user_not_joined
            - registered_call_timeout
          example: agent_hangup
          description: >-
            The reason for the disconnection of the call. Read detailed
            description about reasons listed here at [Disconnection Reason
            Doc](/reliability/debug-call-disconnect#understanding-disconnection-reasons).
        transfer_destination:
          type: string
          example: '+12137771234'
          description: >-
            The destination number or identifier where the call was transferred
            to. Only populated when the disconnection reason was
            `call_transfer`. Can be a phone number or a SIP URI. SIP URIs are
            prefixed with "sip:" and may include a ";transport=..." portion (if
            transport is known) where the transport type can be "tls", "tcp" or
            "udp".
          nullable: true
        call_analysis:
          $ref: '#/components/schemas/CallAnalysis'
          description: >-
            Post call analysis that includes information such as sentiment,
            status, summary, and custom defined data to extract. Available after
            call ends. Subscribe to `call_analyzed` webhook event type to
            receive it once ready.
        call_cost:
          description: >-
            Cost of the call, including all the products and their costs and
            discount.
          type: object
          required:
            - product_costs
            - total_duration_seconds
            - total_duration_unit_price
            - combined_cost
          properties:
            product_costs:
              type: array
              description: List of products with their unit prices and costs in cents
              items:
                $ref: '#/components/schemas/ProductCost'
            total_duration_seconds:
              type: number
              description: Total duration of the call in seconds
              example: 60
            total_duration_unit_price:
              type: number
              description: Total unit duration price of all products in cents per second
              example: 1
            combined_cost:
              type: number
              description: Combined cost of all individual costs in cents
              example: 70
        llm_token_usage:
          type: object
          description: >-
            LLM token usage of the call, available after call ends. Not
            populated if using custom LLM, realtime API, or no LLM call is made.
          required:
            - values
            - average
            - num_requests
          properties:
            values:
              type: array
              items:
                type: number
              description: All the token count values in the call.
            average:
              type: number
              description: Average token count of the call.
            num_requests:
              type: number
              description: Number of requests made to the LLM.
    ResponseEngine:
      oneOf:
        - $ref: '#/components/schemas/ResponseEngineRetellLm'
        - $ref: '#/components/schemas/ResponseEngineCustomLm'
        - $ref: '#/components/schemas/ResponseEngineConversationFlow'
    VoicemailAction:
      oneOf:
        - $ref: '#/components/schemas/VoicemailActionPrompt'
        - $ref: '#/components/schemas/VoicemailActionStaticText'
        - $ref: '#/components/schemas/VoicemailActionHangup'
        - $ref: '#/components/schemas/VoicemailActionBridgeTransfer'
    AnalysisData:
      oneOf:
        - $ref: '#/components/schemas/StringAnalysisData'
        - $ref: '#/components/schemas/EnumAnalysisData'
        - $ref: '#/components/schemas/BooleanAnalysisData'
        - $ref: '#/components/schemas/NumberAnalysisData'
    NullableLLMModel:
      type: string
      enum:
        - gpt-4.1
        - gpt-4.1-mini
        - gpt-4.1-nano
        - gpt-5
        - gpt-5.1
        - gpt-5.2
        - gpt-5-mini
        - gpt-5-nano
        - claude-4.5-sonnet
        - claude-4.5-haiku
        - gemini-2.5-flash
        - gemini-2.5-flash-lite
        - null
      nullable: true
      description: Available LLM models for agents.
    PIIConfig:
      type: object
      required:
        - mode
        - categories
      properties:
        mode:
          type: string
          enum:
            - post_call
          default: post_call
          description: >-
            The processing mode for PII scrubbing. Currently only post-call is
            supported.
        categories:
          type: array
          items:
            type: string
            enum:
              - person_name
              - address
              - email
              - phone_number
              - ssn
              - passport
              - driver_license
              - credit_card
              - bank_account
              - password
              - pin
              - medical_id
              - date_of_birth
              - customer_account_number
          uniqueItems: true
          default: []
          description: List of PII categories to scrub from transcripts and recordings.
    KBConfig:
      type: object
      properties:
        top_k:
          type: integer
          minimum: 1
          maximum: 10
          example: 3
          description: Max number of knowledge base chunks to retrieve
        filter_score:
          type: number
          minimum: 0
          maximum: 1
          example: 0.6
          description: Similarity threshold for filtering search results
    ModelChoice:
      oneOf:
        - $ref: '#/components/schemas/ModelChoiceCascading'
    Utterance:
      type: object
      required:
        - role
        - content
        - words
      properties:
        role:
          type: string
          enum:
            - agent
            - user
            - transfer_target
          description: Documents whether this utterance is spoken by agent or user.
          example: agent
        content:
          type: string
          description: Transcript of the utterances.
          example: hi how are you doing?
        words:
          type: array
          example:
            - word: hi
              start: 0.7
              end: 1.3
          description: >-
            Array of words in the utterance with the word timestamp. Useful for
            understanding what word was spoken at what time. Note that the word
            timestamp is not guaranteed to be accurate, it's more like an
            approximation.
          items:
            type: object
            properties:
              word:
                type: string
                description: Word transcript (with punctuation if applicable).
              start:
                type: number
                description: >-
                  Start time of the word in the call in second. This is relative
                  audio time, not wall time.
              end:
                type: number
                description: >-
                  End time of the word in the call in second. This is relative
                  audio time, not wall time.
    UtteranceOrToolCall:
      oneOf:
        - $ref: '#/components/schemas/Utterance'
        - $ref: '#/components/schemas/ToolCallInvocationUtterance'
        - $ref: '#/components/schemas/ToolCallResultUtterance'
        - $ref: '#/components/schemas/NodeTransitionUtterance'
        - $ref: '#/components/schemas/DTMFUtterance'
    CallLatency:
      type: object
      properties:
        p50:
          type: number
          description: 50 percentile of latency, measured in milliseconds.
          example: 800
        p90:
          type: number
          description: 90 percentile of latency, measured in milliseconds.
          example: 1200
        p95:
          type: number
          description: 95 percentile of latency, measured in milliseconds.
          example: 1500
        p99:
          type: number
          description: 99 percentile of latency, measured in milliseconds.
          example: 2500
        max:
          type: number
          description: Maximum latency in the call, measured in milliseconds.
          example: 2700
        min:
          type: number
          description: Minimum latency in the call, measured in milliseconds.
          example: 500
        num:
          type: number
          description: Number of data points (number of times latency is tracked).
          example: 10
        values:
          type: array
          items:
            type: number
          description: All the latency data points in the call, measured in milliseconds.
    CallAnalysis:
      type: object
      properties:
        call_summary:
          type: string
          example: >-
            The agent called the user to ask question about his purchase
            inquiry. The agent asked several questions regarding his preference
            and asked if user would like to book an appointment. The user
            happily agreed and scheduled an appointment next Monday 10am.
          description: A high level summary of the call.
        in_voicemail:
          type: boolean
          example: false
          description: Whether the call is entered voicemail.
        user_sentiment:
          type: string
          enum:
            - Negative
            - Positive
            - Neutral
            - Unknown
          example: Positive
          description: Sentiment of the user in the call.
        call_successful:
          type: boolean
          example: true
          description: >-
            Whether the agent seems to have a successful call with the user,
            where the agent finishes the task, and the call was complete without
            being cutoff.
        custom_analysis_data:
          type: object
          description: >-
            Custom analysis data that was extracted based on the schema defined
            in agent post call analysis data. Can be empty if nothing is
            specified.
    ProductCost:
      type: object
      required:
        - product
        - cost
      properties:
        product:
          type: string
          description: Product name that has a cost associated with it.
          example: elevenlabs_tts
        unit_price:
          type: number
          description: Unit price of the product in cents per second.
          example: 1
        cost:
          type: number
          description: Cost for the product in cents for the duration of the call.
          example: 60
    ResponseEngineRetellLm:
      type: object
      required:
        - type
        - llm_id
      properties:
        type:
          type: string
          enum:
            - retell-llm
          description: type of the Response Engine.
        llm_id:
          type: string
          description: id of the Retell LLM Response Engine.
        version:
          type: number
          example: 0
          description: Version of the Retell LLM Response Engine.
          nullable: true
    ResponseEngineCustomLm:
      type: object
      required:
        - type
        - llm_websocket_url
      properties:
        type:
          type: string
          enum:
            - custom-llm
          description: type of the Response Engine.
        llm_websocket_url:
          type: string
          description: LLM websocket url of the custom LLM.
    ResponseEngineConversationFlow:
      type: object
      required:
        - type
        - conversation_flow_id
      properties:
        type:
          type: string
          enum:
            - conversation-flow
          description: type of the Response Engine.
        conversation_flow_id:
          type: string
          description: ID of the Conversation Flow Response Engine.
        version:
          type: number
          example: 0
          description: Version of the Conversation Flow Response Engine.
          nullable: true
    VoicemailActionPrompt:
      type: object
      properties:
        type:
          type: string
          enum:
            - prompt
          example: prompt
        text:
          type: string
          example: Summarize the call in 2 sentences.
          description: >-
            The prompt used to generate the text to be spoken when the call is
            detected to be in voicemail.
      required:
        - type
        - text
    VoicemailActionStaticText:
      type: object
      properties:
        type:
          type: string
          enum:
            - static_text
          example: static_text
        text:
          type: string
          example: Please give us a callback tomorrow at 10am.
          description: The text to be spoken when the call is detected to be in voicemail.
      required:
        - type
        - text
    VoicemailActionHangup:
      type: object
      properties:
        type:
          type: string
          enum:
            - hangup
          example: hangup
      required:
        - type
    VoicemailActionBridgeTransfer:
      type: object
      properties:
        type:
          type: string
          enum:
            - bridge_transfer
          example: bridge_transfer
      required:
        - type
    StringAnalysisData:
      type: object
      required:
        - type
        - name
        - description
      properties:
        type:
          type: string
          enum:
            - string
          description: Type of the variable to extract.
          example: string
        name:
          type: string
          description: Name of the variable.
          example: customer_name
        description:
          type: string
          description: Description of the variable.
          example: The name of the customer.
        examples:
          type: array
          items:
            type: string
          description: Examples of the variable value to teach model the style and syntax.
          example:
            - John Doe
            - Jane Smith
    EnumAnalysisData:
      type: object
      required:
        - type
        - name
        - description
        - choices
      properties:
        type:
          type: string
          enum:
            - enum
          description: Type of the variable to extract.
          example: enum
        name:
          type: string
          description: Name of the variable.
          example: product_rating
        description:
          type: string
          description: Description of the variable.
          example: Rating of the product.
        choices:
          type: array
          items:
            type: string
          description: The possible values of the variable, must be non empty array.
          example:
            - good
            - bad
    BooleanAnalysisData:
      type: object
      required:
        - type
        - name
        - description
      properties:
        type:
          type: string
          enum:
            - boolean
          description: Type of the variable to extract.
          example: boolean
        name:
          type: string
          description: Name of the variable.
          example: is_converted
        description:
          type: string
          description: Description of the variable.
          example: Whether the customer converted.
    NumberAnalysisData:
      type: object
      required:
        - type
        - name
        - description
      properties:
        type:
          type: string
          enum:
            - number
          description: Type of the variable to extract.
          example: number
        name:
          type: string
          description: Name of the variable.
          example: order_count
        description:
          type: string
          description: Description of the variable.
          example: How many the customer intend to order.
    ModelChoiceCascading:
      type: object
      required:
        - type
        - model
      properties:
        type:
          type: string
          enum:
            - cascading
          description: Type of model choice
        model:
          $ref: '#/components/schemas/LLMModel'
          description: The LLM model to use
        high_priority:
          type: boolean
          description: >-
            Whether to use high priority pool with more dedicated resource,
            default false
    ToolCallInvocationUtterance:
      type: object
      required:
        - role
        - tool_call_id
        - name
        - arguments
      properties:
        role:
          type: string
          enum:
            - tool_call_invocation
          description: This is a tool call invocation.
        tool_call_id:
          type: string
          description: Tool call id, globally unique.
        name:
          type: string
          description: Name of the function in this tool call.
        arguments:
          type: string
          description: Arguments for this tool call, it's a stringified JSON object.
    ToolCallResultUtterance:
      type: object
      required:
        - role
        - tool_call_id
        - content
      properties:
        role:
          type: string
          enum:
            - tool_call_result
          description: This is result of a tool call.
        tool_call_id:
          type: string
          description: Tool call id, globally unique.
        content:
          type: string
          description: Result of the tool call, can be a string, a stringified json, etc.
    NodeTransitionUtterance:
      type: object
      required:
        - role
        - former_node_id
        - former_node_name
        - new_node_id
        - new_node_name
      properties:
        role:
          type: string
          enum:
            - node_transition
          description: This is result of a node transition
        former_node_id:
          type: string
          description: Former node id
        former_node_name:
          type: string
          description: Former node name
        new_node_id:
          type: string
          description: New node id
        new_node_name:
          type: string
          description: New node name
    DTMFUtterance:
      type: object
      required:
        - role
        - digit
      properties:
        role:
          type: string
          enum:
            - dtmf
          description: This is user pressed digit from their phone keypad.
        digit:
          type: string
          description: >-
            The digit pressed by the user. Will be a single digit string like
            "1", "2", "3", "*", "#" etc.
          example: '1'
    LLMModel:
      type: string
      enum:
        - gpt-4.1
        - gpt-4.1-mini
        - gpt-4.1-nano
        - gpt-5
        - gpt-5.1
        - gpt-5.2
        - gpt-5-mini
        - gpt-5-nano
        - claude-4.5-sonnet
        - claude-4.5-haiku
        - gemini-2.5-flash
        - gemini-2.5-flash-lite
      description: Available LLM models for agents.
  responses:
    BadRequest:
      description: Bad Request
      content:
        application/json:
          schema:
            type: object
            properties:
              status:
                type: string
                enum:
                  - error
              message:
                type: string
                example: Invalid request format, please check API reference.
    Unauthorized:
      description: Unauthorized
      content:
        application/json:
          schema:
            type: object
            properties:
              status:
                type: string
                enum:
                  - error
              message:
                type: string
                example: API key is missing or invalid.
    PaymentRequired:
      description: Payment Required
      content:
        application/json:
          schema:
            type: object
            properties:
              status:
                type: string
                enum:
                  - error
              message:
                type: string
                example: Trial has ended, please add payment method.
    UnprocessableContent:
      description: Unprocessable Content
      content:
        application/json:
          schema:
            type: object
            properties:
              status:
                type: string
                enum:
                  - error
              message:
                type: string
                example: Cannot find requested asset under given api key.
    TooManyRequests:
      description: Too Many Requests
      content:
        application/json:
          schema:
            type: object
            properties:
              status:
                type: string
                enum:
                  - error
              message:
                type: string
                example: Account rate limited, please throttle your requests.
    InternalServerError:
      description: Internal Server Error
      content:
        application/json:
          schema:
            type: object
            properties:
              status:
                type: string
                enum:
                  - error
              message:
                type: string
                example: An unexpected server error occurred.
  securitySchemes:
    api_key:
      type: http
      scheme: bearer
      bearerFormat: string
      description: >-
        Authentication header containing API key (find it in dashboard). The
        format is "Bearer YOUR_API_KEY"

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.retellai.com/llms.txt