# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\TransferFund.e2e.spec.ts >> Transfer Fund E2E Validation >> TC-029 Transfer Money and Validate
- Location: tests\e2e\TransferFund.e2e.spec.ts:7:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Log Out' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Log Out' })

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- heading "Customer Login" [level=2]
- paragraph: Username
- textbox
- paragraph: Password
- textbox
- button "Log In"
- paragraph:
  - link "Forgot login info?":
    - /url: lookup.htm
- paragraph:
  - link "Register":
    - /url: register.htm
- heading "Error!" [level=1]
- paragraph: The username and password could not be verified.
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Forum":
      - /url: http://forums.parasoft.com/
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import CustomerLogin from '../pages/CustomerLoginPage'
  3  | import TransferFundPage from '../pages/TransferFundpage'
  4  | 
  5  | test.describe('Transfer Fund E2E Validation', () => {
  6  | 
  7  |     test('TC-029 Transfer Money and Validate', async ({ page, request }) => {
  8  | 
  9  |         const login = new CustomerLogin(page)
  10 |         const transfer = new TransferFundPage(page)
  11 | 
  12 |         // Login
  13 |         await login.login()
  14 | 
  15 |         await expect(
  16 |             page.getByRole('link', { name: 'Log Out' })
> 17 |         ).toBeVisible()
     |           ^ Error: expect(locator).toBeVisible() failed
  18 | 
  19 |         // Transfer money
  20 |         await transfer.transferMoney('100')
  21 | 
  22 |         // Validate transfer success
  23 |         await expect(
  24 |             page.locator('body')
  25 |         ).toContainText('Transfer Complete')
  26 | 
  27 |         console.log('Transfer completed successfully')
  28 | 
  29 |         // API Validation
  30 |         const response = await request.get(
  31 |             'https://parabank.parasoft.com/parabank/services/bank/accounts'
  32 |         )
  33 | 
  34 |         console.log('API Status =', response.status())
  35 | 
  36 |         expect(response.ok()).toBeTruthy()
  37 |     })
  38 | 
  39 | })
```