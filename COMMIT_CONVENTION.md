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
- **DayXX**: Current project day (e.g., `Day02`).
- **feature name**: The component or feature currently being worked on (e.g., `LoginForm`).
- **message**: Concise description of the change.

### Staging Rules
- **DO NOT use `git add .`**: Always stage files individually using `git add <file_path>` to maintain a clean and intentional commit history.

### Examples
- `🔴 test Day02: LoginForm - add test for invalid email format`
- `🟢 feat Day02: LoginForm - implement email format validation`
- `♻️ refactor Day02: LoginForm - simplify validation logic`
- `⚙️ chore Day02: Project - update vitest configuration`
