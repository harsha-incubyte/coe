# Commit Message Convention

When drafting commit messages, use the following structure:
`{Unicode} {Type} {DayXX}: {feature name} - {message}`

### Configuration Details

| Commit Type | Unicode | Type Identifier |
| :--- | :---: | :--- |
| **Failing Test (RED)** | 🔴 | `test` |
| **Implementation (GREEN)** | 🟢 | `feat` |
| **Refactoring** | ♻️ | `refactor` |
| **Maintenance/Build** | ⚙️ | `chore` |

### Variables
- **DayXX**: Identify current project day (e.g., `Day02`).
- **feature name**: Current component or feature.
- **message**: Concise description.

### Staging Rules
- **NEVER use `git add .`**: Always stage files individually.
