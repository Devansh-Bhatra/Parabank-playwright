import { test, expect } from '@playwright/test'
import CustomerLogin from '../pages/CustomerLoginPage'
import TransferFundPage from '../pages/TransferFundpage'

test.describe('Transfer Fund E2E Validation', () => {

    test('TC-029 Transfer Money and Validate', async ({ page }) => {

        const login = new CustomerLogin(page)
        const transfer = new TransferFundPage(page)

        // Login
        await login.login()

        await expect(
            page.getByRole('link', { name: 'Log Out' })
        ).toBeVisible()

        console.log('Login successful')

        // Transfer Money
        await transfer.transferMoney('100')

        // Validate Transfer Success
        await expect(
            page.locator('body')
        ).toContainText('Transfer Complete')

        console.log('Transfer completed successfully')

        // Screenshot for report
        await page.screenshot({
            path: 'transfer-success.png',
            fullPage: true
        })

        console.log('Transfer validation completed')
    })

})