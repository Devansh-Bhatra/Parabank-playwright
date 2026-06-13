# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API\accountCreation.spec.ts >> Create New Account API
- Location: tests\API\accountCreation.spec.ts:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test('Create New Account API', async ({ request }) => {
  4  | 
  5  |     const response = await request.post(
  6  |         'https://parabank.parasoft.com/parabank/services/bank/createAccount?customerId=14210&newAccountType=1&fromAccountId=16119'
  7  |     )
  8  | 
  9  |     console.log('Status =', response.status())
  10 | 
  11 |     const body = await response.text()
  12 | 
  13 |     console.log('Response =')
  14 |     console.log(body)
  15 | 
> 16 |     expect(response.status()).toBe(200)
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  17 |     expect(body).toContain('<id>')
  18 | })
```