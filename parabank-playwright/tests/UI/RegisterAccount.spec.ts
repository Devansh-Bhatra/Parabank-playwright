import { test, expect } from"@playwright/test"
import RegisterCustomer from"../pages/RegisterCustomer"

test("Register Customer",async({page})=>{
    await page.goto("https://parabank.parasoft.com/parabank/register.htm")
const register = new RegisterCustomer(page)
    await register.registerUser()
await expect(
        page.locator("text=Your account was created successfully")
    ).toBeVisible({
        timeout:10000
    })
    console.log("Customer Registered Successfully")
})

test.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({
        path: `screenshots/${testInfo.title}.png`,
        fullPage: true
    })
})