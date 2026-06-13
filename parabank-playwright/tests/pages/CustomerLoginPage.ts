import { Locator, Page } from "@playwright/test"
import registeredUser from "../Utils/registeredUser.json"

class CustomerLogin {

    page: Page
    username: Locator
    password: Locator
    loginBtn: Locator

    constructor(page: Page) {

        this.page = page

        this.username =
            page.locator(
                'input[name="username"]'
            )

        this.password =
            page.locator(
                'input[name="password"]'
            )

        this.loginBtn =
            page.locator(
                'input[value="Log In"]'
            )
    }

    async login() {

        await this.page.goto(
            "https://parabank.parasoft.com/parabank/index.htm"
        )

        await this.username.fill(
            registeredUser.username
        )

        await this.password.fill(
            registeredUser.password
        )

        await this.loginBtn.click()

        await this.page.waitForTimeout(
            3000
        )
    }
}

export default CustomerLogin