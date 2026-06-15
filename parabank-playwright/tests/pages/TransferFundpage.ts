import {Locator,Page} from"@playwright/test"
class TransferFundPage {

    page:Page
    transferFunds:Locator
    amount:Locator
    fromAccount:Locator
    toAccount:Locator
    transferBtn:Locator
    constructor(page:Page) {
     this.page=page
        this.transferFunds=page.getByRole("link",{name:"Transfer Funds"})
this.amount =page.locator("#amount")
this.fromAccount=page.locator("#fromAccountId")
this.toAccount=page.locator("#toAccountId")
this.transferBtn =page.locator('[value="Transfer"]')
    }

    async transferMoney(value:string) {
        await this.transferFunds.click()
        await this.page.waitForLoadState("networkidle")
       await this.amount.fill(value)
         const fromOptions =await this.fromAccount.locator("option").count()
        const toOptions =await this.toAccount.locator("option").count()
       if (fromOptions > 0 &&toOptions > 1){
         await this.fromAccount.selectOption({index:0})
     await this.toAccount.selectOption({index:1})}
     await this.transferBtn.click()
     await this.page.waitForTimeout(2000)
    }
}
export default TransferFundPage