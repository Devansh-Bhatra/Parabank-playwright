import { test, expect } from '@playwright/test'
import savingAcc from '../Utils/savingAcc.json'

test('Validate Account Details', async ({ request }) => {

    const response = await request.get(
        `https://parabank.parasoft.com/parabank/services/bank/accounts/${savingAcc.accountId}`
    )

    console.log("Account ID =", savingAcc.accountId)
    console.log("Status =", response.status())

    expect(response.status()).toBe(200)

    const responseText = await response.text()

    console.log("Response =", responseText)

    expect(responseText).toContain(`<id>${savingAcc.accountId}</id>`)
    expect(responseText).toContain('<balance>')

})