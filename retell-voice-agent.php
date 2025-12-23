<?php
/**
 * Plugin Name: Retell Voice Agent
 * Description: Floating voice agent with real-time transcripts using Retell AI.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

function retell_voice_agent_assets() {
  wp_enqueue_style(
    'retell-agent-css',
    plugin_dir_url(__FILE__) . 'assets/retell.css'
  );

  wp_enqueue_script(
    'retell-agent-js',
    plugin_dir_url(__FILE__) . 'assets/retell.js',
    [],
    null,
    true
  );

  wp_localize_script('retell-agent-js', 'RETELL_CONFIG', [
    'makeWebhook' => 'https://hook.us2.make.com/8inld3fbsnclj96ucur12awsbyjmsxb5',
    'agentId' => 'agent_a4cb9032ec31e009d34b9be1a4' // From cred.txt
  ]);
}

add_action('wp_enqueue_scripts', 'retell_voice_agent_assets');
