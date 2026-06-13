# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API\accountList.spec.ts >> Get Accounts List
- Location: tests\API\accountList.spec.ts:3:5

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
  3  | test('Get Accounts List', async ({ request }) => {
  4  | 
  5  |     const customerId = 14210
  6  | 
  7  |     const response = await request.get(
  8  |         `https://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`
  9  |     )
  10 | 
  11 |     console.log('Status =', response.status())
  12 | 
> 13 |     expect(response.status()).toBe(200)
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  14 | 
  15 |     const body = await response.text()
  16 | 
  17 |     console.log(body)
  18 | 
  19 |     expect(body).toContain('<account>')
  20 | })
```