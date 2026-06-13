import { Locator, Page } from "@playwright/test"

class TransferFundPage {

    page: Page
    transferFunds: Locator
    amount: Locator
    transferBtn: Locator

    constructor(page: Page) {

        this.page = page

        this.transferFunds = page.getByRole('link', { name: 'Transfer Funds' })
        this.amount = page.locator('#amount')
        this.transferBtn = page.locator('[value="Transfer"]')
    }

    async transferMoney(value: string) {

        await this.transferFunds.click()

        await this.amount.fill(value)

        await this.transferBtn.click()
    }
}

export default TransferFundPage