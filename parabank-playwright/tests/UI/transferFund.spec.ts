import { test, expect } from"@playwright/test"
import CustomerLogin from"../pages/CustomerLoginPage"
import TransferFundPage from"../pages/TransferFundpage"

test("Transfer Funds",async({page})=>{
    const login = new CustomerLogin(page)
     const transfer = new TransferFundPage(page)
    await login.login()
await expect(
        page.getByRole("link",{name:"Log Out"})
    ).toBeVisible()
    await transfer.transferMoney("100")
    await expect(
        page.locator("body")
    ).toContainText("Transfer Complete",{
        timeout:10000 })
    console.log("Transfer Completed Successfully")
})
test.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({
        path: `screenshots/${testInfo.title}.png`,
        fullPage: true
    })
})