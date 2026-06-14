import { test, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

test('Validate Account Exists', async ({ request }) => {

    const savingAcc = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '../Utils/savingAcc.json'),
            'utf-8'
        )
    )

    console.log('Account ID =', savingAcc.accountId)

    const response = await request.get(
        `https://parabank.parasoft.com/parabank/services/bank/accounts/${savingAcc.accountId}`
    )

    console.log('Status =', response.status())
    console.log(await response.text())

    expect(response.status()).toBe(200)
})