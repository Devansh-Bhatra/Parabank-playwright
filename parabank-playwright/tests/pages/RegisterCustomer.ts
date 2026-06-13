import { Locator, Page } from "@playwright/test"
import testData from "../Utils/LoginData.json"

class RegisterCustomer {

    page: Page
    firstName: Locator
    lastName: Locator
    address: Locator
    city: Locator
    state: Locator
    zipCode: Locator
    phone: Locator
    ssn: Locator
    username: Locator
    password: Locator
    confirmPassword: Locator
    registerBtn: Locator

    constructor(page: Page) {

        this.page = page

        this.firstName = page.locator('#customer\\.firstName')
        this.lastName = page.locator('#customer\\.lastName')
        this.address = page.locator('#customer\\.address\\.street')
        this.city = page.locator('#customer\\.address\\.city')
        this.state = page.locator('#customer\\.address\\.state')
        this.zipCode = page.locator('#customer\\.address\\.zipCode')
        this.phone = page.locator('#customer\\.phoneNumber')
        this.ssn = page.locator('#customer\\.ssn')
        this.username = page.locator('#customer\\.username')
        this.password = page.locator('#customer\\.password')
        this.confirmPassword = page.locator('#repeatedPassword')
        this.registerBtn = page.locator('[value="Register"]')
    }

    async registerUser() {

        await this.firstName.fill(testData.firstName)
        await this.lastName.fill(testData.lastName)
        await this.address.fill(testData.address)
        await this.city.fill(testData.city)
        await this.state.fill(testData.state)
        await this.zipCode.fill(testData.zipCode)
        await this.phone.fill(testData.phone)
       await this.ssn.fill(testData.ssn)
        await this.username.fill(testData.username)
        await this.password.fill(testData.password)
        await this.confirmPassword.fill(testData.password)

        await this.registerBtn.click()
        await this.page.waitForTimeout(3000)

    console.log(await this.page.textContent('body'))
    }
}

export default RegisterCustomer