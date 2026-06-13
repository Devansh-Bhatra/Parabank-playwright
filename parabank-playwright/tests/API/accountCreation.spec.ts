import { test, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

test('Create New Account API', async ({ request }) => {

    // Path: tests/API/ se tests/Utils/ jaana hai
    const checkingData = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '../Utils/checkingAcc.json'),
            'utf-8'
        )
    )

    const customerId    = checkingData.customerId
    const fromAccountId = checkingData.accountId

    console.log('customerId =', customerId)
    console.log('fromAccountId =', fromAccountId)

    const response = await request.post(
        `https://parabank.parasoft.com/parabank/services/bank/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${fromAccountId}`
    )

    console.log('Status =', response.status())
    const body = await response.text()
    console.log(body)

    expect(response.status()).toBe(200)
    expect(body).toContain('<id>')
})