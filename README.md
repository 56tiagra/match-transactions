## Getting Started

Install dependency

```bash
npm install
# or
yarn
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing
To run tests, use the following command:
```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

## Approach of the solution:

For the frontend side, I have build the application with Nextjs to interact with the matching utils to do the exact matching and fuzzy match.

The input components for orders and transactions should allow users to input data easily, with options for formatting and validation.
Include placeholders or labels to indicate the purpose of each input field.
Implement features such as JSON formatting and validation to assist users in entering data accurately.

Regarding the matching algorithm, I have put the following consideration.
Design an efficient and accurate matching algorithm to match transactions to orders based on specified criteria.
Consider factors such as customer name, order ID, date, product, and transaction amount for matching.
Implement both exact matching and fuzzy matching options, allowing users to choose the appropriate matching strategy.
For the fuzzy match, use a libary called `string-similarity` to do the fuzzy match and with a score to indicate the correctness. 
Include reconciliation logic to verify that the total transaction amount for each order matches the order price.
Flag any discrepancies or mismatches between transaction amounts and order prices for further investigation.

## Out of scope but things can be improved:

- Currently the application is frontend only, the utils can be implemented as a backend service.
- Add file upload support for the input file and download the output.
- The fuzzy matching algorithm can be improved with a customized dictionary or trained model.

## Design the workflow for manual review the result:
- Currently the output for fuzzy match include the score, we can add a new property to the `MatchedTransaction` with emnum to indicate the status for the result as `Pending Review`, `Approved` or `Reject`
- In the fronend, the user can interact with the result can click the button to action, then post the result back to the backend for feedback loop.
The overall process can be as below:
```
[Initial Matching Process] --> [User Verification Interface]
[User Verification Interface] --> |Confirmed Matches| [Confirmation Process]
[User Verification Interface] --> |Rejected Matches| [Rejection Process]
[Rejection Process] --> [Feedback Mechanism]
[Confirmation Process] --> [Feedback Mechanism]
[Feedback Mechanism] --> [Learning and Adaptation]
[Learning and Adaptation] --> [Initial Matching Process]
```
