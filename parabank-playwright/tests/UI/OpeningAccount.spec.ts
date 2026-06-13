import { test, expect } from "@playwright/test"
import * as fs from "fs"
import * as path from "path"

import CustomerLogin from "../pages/CustomerLoginPage"
import OpenAccountPage from "../pages/OpenAccountPage"

test("Login Open Savings Account Verify Overview", async ({ page, request }) => {

    const login = new CustomerLogin(page)
    const account = new OpenAccountPage(page)

    await login.login()

    await expect(
        page.getByRole("link", { name: "Log Out" })
    ).toBeVisible()

    await account.openSavingsAccount()

    const accountId = await account.getAccountId()

    console.log("New Account ID =", accountId)

    expect(accountId).not.toBeFalsy()

    // Account details API se customerId fetch karo
    const response = await request.get(
        `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`
    )
    const body = await response.text()
    console.log("Account API Response =", body)

    // XML se customerId extract karo
    const customerIdMatch = body.match(/<customerId>(\d+)<\/customerId>/)
    const customerId = customerIdMatch ? customerIdMatch[1] : null

    console.log("Customer ID =", customerId)

    // savingAcc.json — accountId + customerId dono save karo
    fs.writeFileSync(
        path.resolve(__dirname, "../Utils/savingAcc.json"),
        JSON.stringify(
            { 
                accountId: Number(accountId),
                customerId: customerId
            },
            null,
            2
        )
    )

    // checkingAcc.json — same data (API tests isko padhte hain)
    fs.writeFileSync(
        path.resolve(__dirname, "../Utils/checkingAcc.json"),
        JSON.stringify(
            { 
                accountId: Number(accountId),
                customerId: customerId
            },
            null,
            2
        )
    )

    // accountDetail.json
    fs.writeFileSync(
        path.resolve(__dirname, "../Utils/accountDetail.json"),
        JSON.stringify(
            {
                accountId: Number(accountId),
                customerId: customerId,
                accountType: "SAVINGS"
            },
            null,
            2
        )
    )

    console.log("JSON files updated")

    await account.openAccountOverview()

    await expect(
        page.locator("#accountTable")
    ).toBeVisible()

    console.log("Account Overview Verified")
})