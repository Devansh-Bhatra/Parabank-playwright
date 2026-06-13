import { test, expect } from "@playwright/test"
import * as fs from "fs"
import * as path from "path"

import CustomerLogin from "../pages/CustomerLoginPage"
import OpenAccountPage from "../pages/OpenAccountPage"

test("Login Open Savings Account Verify Overview", async ({ page }) => {

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

    fs.writeFileSync(
        path.resolve(__dirname, "../Utils/savingAcc.json"),
        JSON.stringify(
            { accountId: Number(accountId) },
            null,
            2
        )
    )

    fs.writeFileSync(
        path.resolve(__dirname, "../Utils/accountDetail.json"),
        JSON.stringify(
            {
                accountId: Number(accountId),
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