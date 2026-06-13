import { test, expect } from '@playwright/test'

test('Get Accounts List', async ({ request }) => {

    const customerId = 14210

    const response = await request.get(
        `https://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`
    )

    console.log('Status =', response.status())

    expect(response.status()).toBe(200)

    const body = await response.text()

    console.log(body)

    expect(body).toContain('<account>')
})