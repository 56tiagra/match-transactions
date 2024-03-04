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

User Types and Admin Users can share a Components: Header
Can separate the UI into two pieces: UserType and UserContent, then combine them together UserPage
I used color-picker found few colors might be reusable
radio-box activated background color: #e8f2fb (also used in the avatar background)
There are 3 dividers color: #f3f5f9
font is special, I might need to import a font. (I found a free font called Kalypsa, but unfortunately, only medium size is free. I will put it in the public/font)
currently working on the UI, I will use styled-components to build the UI. Due to project is TS based, types/SC need to be installed on dev-dependency too.

Divider will be my first component, it shows up at the first row.
Header will be the next one, that's the first component I would like to use inside UserType.
Radio will be the third one, it should live inside UserType folder.
Top part is done. Now working on the data fetching part. I will use AWS amplify to connect to aws and fetch through graphql.

First of all, I'll use dotenv to save aws configs.
graphql schema is in the src/graphql folder.
I think the best practise of configuring aws amplify with configs is inside index.ts.
Starting with data fetching. I always prefer to build a custom hook to deal with data fetching. The hook will extract from UI component, it will improve readability and reduce maintain cost.

It fetches data with graphql
It cleans up the data, filter data with userType and return the data to UserContent.
I need some mock data for testing, in this case I will use real data from aws.
fetch should wrapped inside a useCallback, it only depends on query. At this point, query is static, so fetch should always be the same function.
Users filter should be wrapped inside a useMemo with dependency users and userType. If these two dependencies don't change, filtered users should always reman the same.
renderHook from '@testing-library/react-hooks' is not supported in React18. I will use renderHook from '@testing-library/react@alpha(13)'. It should be fine.
Data fetching finished. Back to UI UserContent

Header should be dynamic depends on userType state (Admin users or Manager users).
Inside UserContent, I will use UserCard to render each user.
Inside UserContent, I will use useFilteredUsers to fetch and get users.
A util function convertToSentenceCase will be used to convert userType to sentence case.