import { test, expect } from'@playwright/test'
import * as fs from'fs'
import * as path from'path'

test('Get Accounts List',async({request})=>{
    const checkingData = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../Utils/checkingAcc.json'),
    'utf-8'
        )
    )
    const customerId = checkingData.customerId
    console.log('Customer ID =', customerId)

    const response = await request.get(`https://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`
    )
const body = await response.text()
    console.log('Status =', response.status())
    console.log('Response =')
    console.log(body)

    expect(
        response.status(),`API failed. Response: ${body}`).toBe(200)
    expect(body).toContain('<account>')
})