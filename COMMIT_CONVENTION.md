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

- **NEVER use `git add .`**: Always stage files individually using `git add <file_path>` to maintain a clean and intentional commit history.

## TDD & Atomic Commits
- **RED-GREEN-Refactor**: Always follow the strict TDD cycle.
  1. 🔴 **Red**: Write a failing test first.
  2. 🟢 **Green**: Write the minimum code to pass the test.
  3. ♻️ **Refactor**: Clean up the code while keeping tests passing.
- **Atomic Commits**: Commit each step of the TDD cycle individually. Commits should be small, simple, and precise.

### Examples
- `🔴 test Day02: LoginForm - add test for invalid email format`
- `🟢 feat Day02: LoginForm - implement email format validation`
- `♻️ refactor Day02: LoginForm - simplify validation logic`
- `⚙️ chore Day02: Project - update vitest configuration`
