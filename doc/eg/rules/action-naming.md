# Action Naming Convention

## Basic Rule

- Use verb+target format: `get~~`, `edit~~`, `del~~`, `create~~`, etc.
- If state change is needed, append `Status` at the end

## Local Reducer

- Action names should NOT end with `Fail` or `Success` (due to auto-generation/recognition issues)
- If needed, use a `todo` prefix or similar for improvement

