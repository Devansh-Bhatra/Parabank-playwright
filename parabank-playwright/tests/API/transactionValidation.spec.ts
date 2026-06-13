import { test, expect } from '@playwright/test'
import savingAcc from '../Utils/savingAcc.json'

test('Validate Transactions', async ({ request }) => {

    const response = await request.get(
        `https://parabank.parasoft.com/parabank/services/bank/accounts/${savingAcc.accountId}/transactions`
    )

    console.log('Account ID =', savingAcc.accountId)
    console.log('Status =', response.status())

    const body = await response.text()

    console.log(body)

    expect(response.status()).toBe(200)
})