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
  13 |     await page.goto(
  14 |         "https://parabank.parasoft.com/parabank/index.htm"
  15 |     )
  16 | 
  17 |     await login.login()
  18 | 
  19 |     await expect(
  20 |         page.getByRole("link", { name: "Log Out" })
> 21 |     ).toBeVisible()
     |       ^ Error: expect(locator).toBeVisible() failed
  22 | 
  23 |     await account.openSavingsAccount()
  24 | 
  25 |     const accountId = await account.getAccountId()
  26 | 
  27 |     console.log("New Account ID =", accountId)
  28 | 
  29 |     expect(accountId).not.toBeNull()
  30 | 
  31 |     const savingAccPath = path.resolve(
  32 |         __dirname,
  33 |         "../Utils/savingAcc.json"
  34 |     )
  35 | 
  36 |     const accountDetailPath = path.resolve(
  37 |         __dirname,
  38 |         "../Utils/accountDetail.json"
  39 |     )
  40 | 
  41 |     const accountData = {
  42 |         accountId: Number(accountId)
  43 |     }
  44 | 
  45 |     fs.writeFileSync(
  46 |         savingAccPath,
  47 |         JSON.stringify(accountData, null, 2)
  48 |     )
  49 | 
  50 |     fs.writeFileSync(
  51 |         accountDetailPath,
  52 |         JSON.stringify(
  53 |             {
  54 |                 accountId: Number(accountId),
  55 |                 accountType: "SAVINGS"
  56 |             },
  57 |             null,
  58 |             2
  59 |         )
  60 |     )
  61 | 
  62 |     console.log("savingAcc.json updated")
  63 |     console.log("accountDetail.json updated")
  64 | 
  65 |     await account.openAccountOverview()
  66 | 
  67 |     await expect(
  68 |         page.locator("#accountTable")
  69 |     ).toBeVisible()
  70 | 
  71 |     console.log("Account Overview Verified")
  72 | })
```