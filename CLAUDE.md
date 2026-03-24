## Test Generation Instructions

- **Test Structure:** Use `test.step()` to wrap logic corresponding to Gherkin lines. Do not include Gherkin keywords (Given/When/Then) in the step text.
- **Test Structure:** Use `test.step()` for each step of the manual test plan.
- **Page Object Model:** Use classes in the page-object-model folder to code the test.
- **Standard Match:** Assume "Standard Matching" is always available without needing explicit enablement.
- **Naming Test Cases:** When creating a test case, take the name of the manual test case, make all words lowercase, and put a "-" between each word.
