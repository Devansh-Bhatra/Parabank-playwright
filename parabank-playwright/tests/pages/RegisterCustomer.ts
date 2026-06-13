import { Locator, Page } from "@playwright/test"
import testData from "../Utils/LoginData.json"
import * as fs from "fs"
import * as path from "path"

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

        const uniqueUser =
            `devansh${Date.now()}`

        await this.firstName.fill(testData.firstName)
        await this.lastName.fill(testData.lastName)
        await this.address.fill(testData.address)
        await this.city.fill(testData.city)
        await this.state.fill(testData.state)
        await this.zipCode.fill(testData.zipCode)
        await this.phone.fill(testData.phone)
        await this.ssn.fill(testData.ssn)

        await this.username.fill(uniqueUser)

        await this.password.fill(testData.password)
        await this.confirmPassword.fill(testData.password)

        await this.registerBtn.click()

        const filePath = path.resolve(
            __dirname,
            "../Utils/registeredUser.json"
        )

        fs.writeFileSync(
            filePath,
            JSON.stringify(
                {
                    username: uniqueUser,
                    password: testData.password
                },
                null,
                2
            )
        )

        console.log(
            "Registered User Saved:",
            uniqueUser
        )
    }
}

export default RegisterCustomer