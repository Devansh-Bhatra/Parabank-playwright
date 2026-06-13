import { test, expect } from '@playwright/test'
import savingAcc from '../Utils/savingAcc.json'

test('Validate Account Exists', async ({ request }) => {

    const response = await request.get(
        `https://parabank.parasoft.com/parabank/services/bank/accounts/${savingAcc.accountId}`
    )

    console.log('Status =', response.status())
    console.log(await response.text())

    expect(response.status()).toBe(200)
})