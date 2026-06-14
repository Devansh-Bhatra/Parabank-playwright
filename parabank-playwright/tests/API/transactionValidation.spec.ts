import { test, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

test('Validate Transactions', async ({ request }) => {

    const savingAcc = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '../Utils/savingAcc.json'),
            'utf-8'
        )
    )

    console.log('Account ID =', savingAcc.accountId)

    const response = await request.get(
        `https://parabank.parasoft.com/parabank/services/bank/accounts/${savingAcc.accountId}/transactions`
    )

    console.log('Status =', response.status())

    const body = await response.text()
    console.log(body)

    expect(response.status()).toBe(200)
})