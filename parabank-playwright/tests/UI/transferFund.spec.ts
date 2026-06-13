import { test, expect } from '@playwright/test'
import CustomerLogin from '../pages/CustomerLoginPage'
import TransferFundPage from '../pages/TransferFundpage'

test('Transfer Funds', async ({ page }) => {

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    const login = new CustomerLogin(page)
    const transfer = new TransferFundPage(page)

    await login.login()

    await expect(
        page.getByRole('link', { name: 'Log Out' })
    ).toBeVisible()

    await transfer.transferMoney('100')

    await page.waitForTimeout(3000)

    console.log(await page.locator('body').textContent())

    await page.screenshot({
        path: 'transfer-debug.png',
        fullPage: true
    })
})