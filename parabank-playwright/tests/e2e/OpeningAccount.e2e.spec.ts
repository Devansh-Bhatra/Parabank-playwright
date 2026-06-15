import { test, expect } from '@playwright/test'
import CustomerLogin from '../pages/CustomerLoginPage'
import OpenAccountPage from '../pages/OpenAccountPage'

test.describe('Open Account E2E Validation', () => {
    test('Open Savings Account and Validate by API',async({page,request }) => {
        const login = new CustomerLogin(page)
        const account = new OpenAccountPage(page)
        // Login
        await login.login()
        await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible({ timeout: 15000 })
    console.log('Login successful')
    // Open Savings Account
        await account.openSavingsAccount()
        const accountId = await account.getAccountId()
        console.log('New Account ID =', accountId)
        expect(accountId).not.toBe('')
        // Validate Account Exists via API
        const response = await request.get(  `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`)
        console.log('API Status =', response.status())
      expect(response.status()).toBe(200)
      const body = await response.text()
        console.log(body)
        expect(body).toContain(`<id>${accountId}</id>`)
        console.log('Account verified successfully through API')
        // Open Account Overview
        await account.openAccountOverview()
        await expect(page.locator('#accountTable')).toBeVisible({ timeout: 15000 })
        console.log('Account overview verified')
    })

})
test.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({
        path: `screenshots/${testInfo.title}.png`,
        fullPage: true
    })
})