import {test,expect} from"@playwright/test"
import * as path from"path"
import CustomerLogin from"../pages/CustomerLoginPage"
import OpenAccountPage from"../pages/OpenAccountPage"
import * as fs from"fs"

test("Login Open Savings Account",async({page,request})=>{
      const login =new CustomerLogin(page)
      const account =new OpenAccountPage(page)
      await login.login()
await expect(page.getByRole("link",{name:"Log Out"})).toBeVisible()
await account.openSavingsAccount()
    const accountId =await account.getAccountId()
    console.log("New Account=",accountId)
    expect(accountId).not.toBeFalsy()

const response =await request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`)
    const body =await response.text()
    console.log("Account API Response =",body)
    const customerIdMatch =body.match(/<customerId>(\d+)<\/customerId>/)
    const customerId =customerIdMatch ?customerIdMatch[1]:null

    console.log("Customer ID =",customerId)
    fs.writeFileSync(path.resolve(__dirname,"../Utils/savingAcc.json"),JSON.stringify(
            { accountId:Number(accountId),
            customerId:customerId},null,2)
    )
    fs.writeFileSync(path.resolve(__dirname,"../Utils/checkingAcc.json"),JSON.stringify(
            { accountId:Number(accountId),
             customerId:customerId},null,2
        )
    )
    // account detail
    fs.writeFileSync(
        path.resolve(__dirname, "../Utils/accountDetail.json"),
        JSON.stringify(
            {accountId:Number(accountId),
                customerId:customerId,
                accountType:"SAVINGS"
            },
            null,2
        )
    )
    console.log("JSON files updated")
    await account.openAccountOverview()
    await expect( page.locator("#accountTable")).toBeVisible()
console.log("Account Overview")
})
test.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({
        path: `screenshots/${testInfo.title}.png`,
        fullPage: true
    })
})