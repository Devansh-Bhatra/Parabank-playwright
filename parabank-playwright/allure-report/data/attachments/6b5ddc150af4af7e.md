# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API\transactionValidation.spec.ts >> Validate Transactions
- Location: tests\API\transactionValidation.spec.ts:4:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import savingAcc from '../Utils/savingAcc.json'
  3  | 
  4  | test('Validate Transactions', async ({ request }) => {
  5  | 
  6  |     const response = await request.get(
  7  |         `https://parabank.parasoft.com/parabank/services/bank/accounts/${savingAcc.accountId}/transactions`
  8  |     )
  9  | 
  10 |     console.log('Account ID =', savingAcc.accountId)
  11 |     console.log('Status =', response.status())
  12 | 
  13 |     const body = await response.text()
  14 | 
  15 |     console.log(body)
  16 | 
> 17 |     expect(response.status()).toBe(200)
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  18 | })
```