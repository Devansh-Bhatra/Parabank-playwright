import { Locator, Page } from "@playwright/test";

class OpenAccountPage {

    page: Page;
    openAccountLink: Locator;
    accountType: Locator;
    fromAccount: Locator;
    openAccountBtn: Locator;
    newAccountId: Locator;
    accountOverviewLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.openAccountLink =
            page.getByRole("link", {
                name: "Open New Account"
            });

        this.accountType = page.locator("#type");

        this.fromAccount =
            page.locator("#fromAccountId");

        this.openAccountBtn =
            page.locator('input[value="Open New Account"]');

        this.newAccountId =
            page.locator("#newAccountId");

        this.accountOverviewLink =
            page.getByRole("link", {
                name: "Accounts Overview"
            });
    }

    async openSavingsAccount() {

        await this.openAccountLink.click();

        await this.accountType.selectOption("0");

        await this.fromAccount.selectOption({ index: 0 });

        await this.openAccountBtn.click();

        await this.page.waitForLoadState("networkidle");

        await this.page.waitForTimeout(3000);
    }

    async getAccountId() {

        const text =
            await this.newAccountId.textContent();

        return text?.trim() || "";
    }

    async openAccountOverview() {

        await this.accountOverviewLink.click();
    }
}

export default OpenAccountPage;