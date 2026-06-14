import { test, expect } from '@playwright/test'

test('Get Accounts List', async ({ request }) => {

    const customerId = 14210; // Isko latest valid customerId se replace karo

    const response = await request.get(
        `https://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`
    );

    const body = await response.text();

    console.log('Customer ID =', customerId);
    console.log('Status =', response.status());
    console.log('Response =');
    console.log(body);

    expect(
        response.status(),
        `API failed. Response: ${body}`
    ).toBe(200);

    expect(body).toContain('<account>');
});