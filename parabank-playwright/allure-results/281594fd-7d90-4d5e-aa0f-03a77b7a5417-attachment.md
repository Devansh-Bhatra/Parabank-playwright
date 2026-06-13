# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\OpeningAccount.spec.ts >> Login Open Savings Account Verify Overview
- Location: tests\UI\OpeningAccount.spec.ts:8:5

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
  1  | import { test, expect } from "@playwright/test"
  2  | import * as fs from "fs"
  3  | import * as path from "path"
  4  | 
  5  | import CustomerLogin from "../pages/CustomerLoginPage"
  6  | import OpenAccountPage from "../pages/OpenAccountPage"
  7  | 
  8  | test("Login Open Savings Account Verify Overview", async ({ page }) => {
  9  | 
  10 |     const login = new CustomerLogin(page)
  11 |     const account = new OpenAccountPage(page)
  12 | 
  13 |     await login.login()
  14 | 
  15 |     await expect(
  16 |         page.getByRole("link", { name: "Log Out" })
> 17 |     ).toBeVisible()
     |       ^ Error: expect(locator).toBeVisible() failed
  18 | 
  19 |     await account.openSavingsAccount()
  20 | 
  21 |     const accountId = await account.getAccountId()
  22 | 
  23 |     console.log("New Account ID =", accountId)
  24 | 
  25 |     expect(accountId).not.toBeFalsy()
  26 | 
  27 |     fs.writeFileSync(
  28 |         path.resolve(__dirname, "../Utils/savingAcc.json"),
  29 |         JSON.stringify(
  30 |             { accountId: Number(accountId) },
  31 |             null,
  32 |             2
  33 |         )
  34 |     )
  35 | 
  36 |     fs.writeFileSync(
  37 |         path.resolve(__dirname, "../Utils/accountDetail.json"),
  38 |         JSON.stringify(
  39 |             {
  40 |                 accountId: Number(accountId),
  41 |                 accountType: "SAVINGS"
  42 |             },
  43 |             null,
  44 |             2
  45 |         )
  46 |     )
  47 | 
  48 |     console.log("JSON files updated")
  49 | 
  50 |     await account.openAccountOverview()
  51 | 
  52 |     await expect(
  53 |         page.locator("#accountTable")
  54 |     ).toBeVisible()
  55 | 
  56 |     console.log("Account Overview Verified")
  57 | })
```