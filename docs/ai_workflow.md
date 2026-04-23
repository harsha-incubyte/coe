# AI-Driven Workflows (Local LLM Setup)

To maximize developer productivity, maintain strict TDD cycles, and automate routine tasks, this project leverages a local AI Agent workflow utilizing **Antigravity** bridged to a local **Gemma 2** model via **LiteLLM**.

## Architecture
- **Antigravity Agent:** The primary coding assistant running within your IDE or terminal.
- **LiteLLM:** A proxy server that translates Antigravity's standard OpenAI-format API calls into formats compatible with local inference engines.
- **MLX Server:** Apple Silicon optimized local inference server running the Gemma 2 model.

## Why Local?
- **Zero Latency:** Extremely fast Red-Green-Refactor loops.
- **Privacy:** Code never leaves your machine.
- **Offline Capable:** Uninterrupted workflow.

## Setup Instructions

1. **Install Prerequisites:** Ensure you have Python 3.10+ and the `mlx-lm` library installed globally or in a virtual environment.
2. **Start the MLX Server:**
   ```bash
   # Run the Gemma 2 9B model using MLX
   python -m mlx_lm.server --model google/gemma-2-9b-it --port 8080
   ```
3. **Start the LiteLLM Proxy:**
   In a separate terminal, run LiteLLM to bridge standard OpenAI-compatible requests to the MLX endpoint.
   ```bash
   litellm --config litellm_config.yaml
   ```
4. **Configure Antigravity:** Point your Antigravity configuration to use the `http://localhost:4000` LiteLLM endpoint with the respective local model name.

## Custom Agent Skills
This project benefits from custom agent skills designed for this environment (refer to your local agent configuration directory):
- `commit_tdd_skill`: Automatically generates atomic TDD commits (🔴, 🟢, ♻️, ⚙️).
- `ui_audit_skill`: Automatically audits new React components for WCAG AA compliance using styled-components.
- `daily_standup_skill`: Summarizes the daily git diffs for team updates.
