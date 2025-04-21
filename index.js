const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    // Get webhook URL from input or environment/secrets
    const webhookUrl = core.getInput("webhook_url") || process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error(
        "Webhook URL is required. Provide it either through input or WEBHOOK_URL environment variable/secret"
      );
    }

    // Get the workflow run URL
    const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;

    // Send POST request to webhook
    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ externalUrl: runUrl }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send webhook: ${response.statusText}`);
    }

    core.info(
      `Successfully sent webhook notification with workflow URL: ${runUrl}`
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
