import requests
import json

BASE_URL = "http://localhost:8080/v1"
HEALTH_URL = "http://localhost:8080/health"

def check_health():
    """Check the health status of the server."""
    print("--- Health Check ---")
    try:
        response = requests.get(HEALTH_URL)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}\n")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Is it running?\n")

def list_models():
    """List available models loaded in the server."""
    print("--- List Models ---")
    try:
        response = requests.get(f"{BASE_URL}/models")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}\n")
    except requests.exceptions.ConnectionError:
        print("Error: Connection failed.\n")

def chat_completion_basic():
    """A standard synchronous chat completion request."""
    print("--- Basic Chat Completion ---")
    payload = {
        "messages": [
            {"role": "system", "content": "You are a helpful and concise assistant."},
            {"role": "user", "content": "What is the capital of France?"}
        ],
        "temperature": 0.7,
        "max_tokens": 50,
        "stop": ["<end_of_turn>", "<eos>"]
    }
    response = requests.post(f"{BASE_URL}/chat/completions", json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def chat_completion_stream():
    """A streaming chat completion request."""
    print("--- Streaming Chat Completion ---")
    payload = {
        "messages": [
            {"role": "user", "content": "Write a very short poem about coding."}
        ],
        "temperature": 0.7,
        "max_tokens": 100,
        "stream": True,
        "stream_options": {"include_usage": True},
        "stop": ["<end_of_turn>", "<eos>"]
    }
    response = requests.post(f"{BASE_URL}/chat/completions", json=payload, stream=True)
    print(f"Status Code: {response.status_code}")
    print("Stream output:")
    for line in response.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            print(decoded_line)
    print("\n")

def chat_completion_advanced_params():
    """A chat completion request showcasing advanced generation parameters."""
    print("--- Chat Completion with Advanced Parameters ---")
    payload = {
        "messages": [
            {"role": "user", "content": "Tell me a random fun fact."}
        ],
        "temperature": 0.8,
        "top_p": 0.9,
        "top_k": 40,
        "min_p": 0.05,
        "repetition_penalty": 1.1,
        "presence_penalty": 0.2,
        "frequency_penalty": 0.2,
        "max_tokens": 100,
        "seed": 42,
        "logprobs": True,
        "top_logprobs": 2,
        "stop": ["<end_of_turn>", "<eos>"]
    }
    response = requests.post(f"{BASE_URL}/chat/completions", json=payload)
    print(f"Status Code: {response.status_code}")
    print("Response indicates successful application of advanced sampling parameters.\n")

def chat_completion_with_tools():
    """A chat completion request that includes tool/function definitions."""
    print("--- Chat Completion with Tools ---")
    payload = {
        "messages": [
            {"role": "user", "content": "What's the weather like in Paris?"}
        ],
        "tools": [
            {
                "type": "function",
                "function": {
                    "name": "get_weather",
                    "description": "Get the current weather for a location",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "location": {
                                "type": "string",
                                "description": "The city and state, e.g. San Francisco, CA"
                            }
                        },
                        "required": ["location"]
                    }
                }
            }
        ],
        "temperature": 0.0,
        "max_tokens": 100,
        "stop": ["<end_of_turn>", "<eos>"]
    }
    response = requests.post(f"{BASE_URL}/chat/completions", json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def text_completion():
    """A standard synchronous text completion request (not chat format)."""
    print("--- Text Completion ---")
    payload = {
        "prompt": "Once upon a time in a digital kingdom,",
        "temperature": 0.8,
        "max_tokens": 50,
        "stop": ["\n", "<end_of_turn>", "<eos>"]
    }
    response = requests.post(f"{BASE_URL}/completions", json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

if __name__ == "__main__":
    print("Ensure the MLX LLM server is running before executing this script.\n")
    check_health()
    list_models()
    chat_completion_basic()
    text_completion()
    chat_completion_advanced_params()
    chat_completion_stream()
    chat_completion_with_tools()
