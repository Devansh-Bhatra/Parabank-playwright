import { test, expect } from "@playwright/test"
import * as fs from "fs"
import * as path from "path"

import CustomerLogin from "../pages/CustomerLoginPage"
import OpenAccountPage from "../pages/OpenAccountPage"

test("Login Open Savings Account Verify Overview", async ({ page }) => {

    const login = new CustomerLogin(page)
    const account = new OpenAccountPage(page)

    await page.goto(
        "https://parabank.parasoft.com/parabank/index.htm"
    )

    await login.login()

    await expect(
        page.getByRole("link", { name: "Log Out" })
    ).toBeVisible()

    await account.openSavingsAccount()

    const accountId = await account.getAccountId()

    console.log("New Account ID =", accountId)

    expect(accountId).not.toBeNull()

    const savingAccPath = path.resolve(
        __dirname,
        "../Utils/savingAcc.json"
    )

    const accountDetailPath = path.resolve(
        __dirname,
        "../Utils/accountDetail.json"
    )

    const accountData = {
        accountId: Number(accountId)
    }

    fs.writeFileSync(
        savingAccPath,
        JSON.stringify(accountData, null, 2)
    )

    fs.writeFileSync(
        accountDetailPath,
        JSON.stringify(
            {
                accountId: Number(accountId),
                accountType: "SAVINGS"
            },
            null,
            2
        )
    )

    console.log("savingAcc.json updated")
    console.log("accountDetail.json updated")

    await account.openAccountOverview()

    await expect(
        page.locator("#accountTable")
    ).toBeVisible()

    console.log("Account Overview Verified")
})