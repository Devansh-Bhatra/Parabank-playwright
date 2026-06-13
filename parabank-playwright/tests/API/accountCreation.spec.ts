import { test, expect } from '@playwright/test'

test('Create New Account API', async ({ request }) => {

    const response = await request.post(
        'https://parabank.parasoft.com/parabank/services/bank/createAccount?customerId=14210&newAccountType=1&fromAccountId=16119'
    )

    console.log('Status =', response.status())

    const body = await response.text()

    console.log('Response =')
    console.log(body)

    expect(response.status()).toBe(200)
    expect(body).toContain('<id>')
})