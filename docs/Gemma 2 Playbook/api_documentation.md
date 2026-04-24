# Gemma 2 9B Local Server API Documentation

This document describes the REST API exposed by the local MLX-based inference server for the Gemma 2 9B model. The server is designed to be highly compatible with the OpenAI API specification, making it easy for developers to integrate with existing tools, libraries, and HTTP clients.

## Base URL

When running locally on the default configuration, the base URLs are:

- **API Base:** `http://localhost:8080/v1`
- **Health Check:** `http://localhost:8080/health`

---

## 1. Health Check
Checks if the server is running and responsive.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok"
}
```

---

## 2. List Models
Lists the currently loaded model configurations and related files.

**Endpoint:** `GET /v1/models`

**Response:**
Returns a JSON object detailing the model files, matching the OpenAI schema for listing models.

---

## 3. Chat Completions
Generates model responses based on a provided conversation history. This is the primary endpoint for interacting with the model.

**Endpoint:** `POST /v1/chat/completions`

### Request Body Schema (JSON)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `messages` | `array` | **Required** | A list of message objects comprising the conversation. Each object must have a `role` (e.g., `"system"`, `"user"`, `"assistant"`) and `content` (string). |
| `model` | `string` | `"default_model"` | The ID of the model to use. |
| `stream` | `boolean` | `false` | If true, partial message deltas will be sent as Server-Sent Events (SSE) as they become available. |
| `stream_options` | `object` | `null` | Options for streaming. E.g., `{"include_usage": true}` to receive token usage statistics in the final chunk. |
| `max_tokens` / `max_completion_tokens` | `integer` | Server Default | The maximum number of tokens to generate in the response. |
| `temperature` | `float` | Server Default | Sampling temperature. Higher values (e.g., 0.8) make the output more random, while lower values (e.g., 0.2) make it more focused and deterministic. |
| `top_p` | `float` | Server Default | Nucleus sampling probability. |
| `top_k` | `integer` | Server Default | Restricts sampling to the top `k` most likely tokens. |
| `min_p` | `float` | Server Default | Minimum probability relative to the most likely token. |
| `stop` | `string` / `array` | `[]` | Up to 4 sequences where the API will stop generating further tokens. **Note:** For Gemma models, it is highly recommended to include `["<end_of_turn>", "<eos>"]` in your stop sequences to prevent control tokens from leaking into the output. |
| `repetition_penalty` | `float` | `0.0` | Penalty applied to repeated tokens. |
| `presence_penalty` | `float` | `0.0` | Penalty applied if a token is present in the text so far. |
| `frequency_penalty` | `float` | `0.0` | Penalty applied based on the frequency of the token in the text so far. |
| `tools` | `array` | `null` | A list of tools the model may call. Currently, only functions are supported. Follows OpenAI tool schema. |
| `seed` | `integer` | `null` | If specified, the system will make a best effort to sample deterministically. |
| `logprobs` | `boolean` | `false` | Whether to return log probabilities of the output tokens. |
| `top_logprobs` | `integer` | `-1` | An integer specifying the number of most likely tokens to return at each token position. Requires `logprobs` to be `true`. |

### Example Request
```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Explain quantum computing in one sentence."}
    ],
    "temperature": 0.7,
    "max_tokens": 100
  }'
```

### Example Response
```json
{
  "id": "chatcmpl-uuid-...",
  "object": "chat.completion",
  "created": 1713854123,
  "model": "default_model",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Quantum computing is a rapidly-emerging technology that harnesses the laws of quantum mechanics to solve problems too complex for classical computers."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 24,
    "total_tokens": 49
  }
}
```

---

## 4. Text Completions
Generates a raw text completion based on a prompt string (bypasses chat templates).

**Endpoint:** `POST /v1/completions`

### Request Body Schema (JSON)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | `string` | **Required** | The prompt to generate completions for. |
| *(All sampling parameters)* | - | - | Same sampling parameters as `/v1/chat/completions` (e.g., `temperature`, `max_tokens`, `stream`, etc.) |

### Example Request
```bash
curl http://localhost:8080/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "def calculate_fibonacci(n):",
    "temperature": 0.1,
    "max_tokens": 64
  }'
```

---

## Tool Calling (Function Calling)

The server supports tool calling via the `tools` array parameter in `/v1/chat/completions`. When the model decides to call a function, the `finish_reason` in the response choice will be `"tool_calls"`, and the message will contain a `tool_calls` array instead of standard content.

### Example Tool Response
```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "tool_calls": [
          {
            "id": "call_abc123",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"location\":\"Paris\"}"
            }
          }
        ]
      },
      "finish_reason": "tool_calls"
    }
  ]
}
```

## Error Handling

If the request is malformed or an invalid parameter is provided, the server will return a `400 Bad Request` with a JSON payload explaining the error:
```json
{
  "error": "temperature must be of type float"
}
```
