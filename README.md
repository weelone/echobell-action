# Echobell Notification Action

A GitHub Action that sends workflow run URLs to webhook endpoints, primarily designed for [Echobell](https://echobell.one) but compatible with any webhook service that accepts JSON payloads.

## Features

- Sends GitHub workflow run URLs to a specified webhook endpoint
- Works with Echobell out of the box
- Compatible with any webhook service that accepts JSON POST requests
- Simple configuration with webhook URL as input

## Usage

Add the following to your GitHub Actions workflow:

```yaml
- name: Send Notification
  uses: weelone/echobell-action@v1
  with:
    webhook_url: ${{ secrets.WEBHOOK_URL }}
```

You can also set the webhook URL using the `WEBHOOK_URL` environment variable:

```yaml
- name: Send Notification
  uses: weelone/echobell-action@v1
  env:
    WEBHOOK_URL: ${{ secrets.WEBHOOK_URL }}
```

## Inputs

| Input        | Description                           | Required | Default |
|--------------|---------------------------------------|----------|---------|
| webhook_url  | Webhook URL to send the notification to| No       | -       |

If `webhook_url` is not provided as an input, the action will look for a `WEBHOOK_URL` environment variable.

## Webhook Payload

The action sends a POST request to the webhook URL with the following JSON payload:

```json
{
  "externalUrl": "https://github.com/owner/repo/actions/runs/123456"
}
```

## Example Workflow

```yaml
name: CI
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build
        run: |
          npm ci
          npm run build
          
      - name: Send Notification
        uses: weelone/echobell-action@v1
        with:
          webhook_url: ${{ secrets.WEBHOOK_URL }}
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.