import { test, expect } from '@playwright/test'
import CustomerLogin from '../pages/CustomerLoginPage'
import TransferFundPage from '../pages/TransferFundpage'

test.describe('Transfer Fund E2E Validation', () => {

    test('TC-029 Transfer Money and Validate', async ({ page, request }) => {

        const login = new CustomerLogin(page)
        const transfer = new TransferFundPage(page)

        // Login
        await login.login()

        await expect(
            page.getByRole('link', { name: 'Log Out' })
        ).toBeVisible()

        // Transfer money
        await transfer.transferMoney('100')

        // Validate transfer success
        await expect(
            page.locator('body')
        ).toContainText('Transfer Complete')

        console.log('Transfer completed successfully')

        // API Validation
        const response = await request.get(
            'https://parabank.parasoft.com/parabank/services/bank/accounts'
        )

        console.log('API Status =', response.status())

        expect(response.ok()).toBeTruthy()
    })

})