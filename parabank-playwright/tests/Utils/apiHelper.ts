import { APIRequestContext, expect } from '@playwright/test';
const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

export class ApiHelper {
  constructor(private request: APIRequestContext) {}
async getCustomerAccounts(customerId: string) {
    const url = `${BASE_URL}/customers/${customerId}/accounts`;
console.log(`[API] GET ${url}`);
const response = await this.request.get(url);
    const body = await response.json();
console.log(
      `[API] Response Status: ${response.status()} | Body: ${JSON.stringify(body)}`
    );
    return { response, body };
  }
  async createAccount(
    customerId: string,
    accountType: number,
    fromAccountId: string
  ) {
    const url =
      `${BASE_URL}/createAccount?customerId=${customerId}` +
      `&newAccountType=${accountType}` +
      `&fromAccountId=${fromAccountId}`;
    console.log(`[API] POST ${url}`);
    const response = await this.request.post(url);
    const body = await response.json().catch(() => ({}));
    console.log(
      `[API] Response Status: ${response.status()} | Body: ${JSON.stringify(body)}`
    );
    return { response, body };
  }

  async getAccountDetails(accountId: string) {
    const url = `${BASE_URL}/accounts/${accountId}`;
    console.log(`[API] GET ${url}`);
    const response = await this.request.get(url);
    const body = await response.json().catch(() => ({}));
    console.log(
      `[API] Response Status: ${response.status()} | Body: ${JSON.stringify(body)}`
    );
    return { response, body };
  }

  async transferFunds(
    fromAccountId: string,
    toAccountId: string,
    amount: number
  ) {
    const url =
      `${BASE_URL}/transfer?fromAccountId=${fromAccountId}` +
      `&toAccountId=${toAccountId}` +
      `&amount=${amount}`;
    console.log(`[API] POST ${url}`);
    const response = await this.request.post(url);
    const status = response.status();
    console.log(`[API] Transfer Response Status: ${status}`);
    return { response, status };
  }

  async getInvalidAccount(invalidAccountId: string) {
    const url = `${BASE_URL}/accounts/${invalidAccountId}`;
    console.log(`[API] GET ${url} (Invalid Account Test)`);
    const response = await this.request.get(url);
    const status = response.status();
    console.log(`[API] Invalid Account Response Status: ${status}`);

    return { response, status };
  }

  assertStatus(actual: number, expected: number) {
    expect(actual).toBe(expected);

    console.log(
      `[API] Status Code Assertion Passed: ${actual} === ${expected}`
    );
  }
  assertAccountExists(accounts: any[], accountId: string) {
    const found = accounts.some(
      (account) => String(account.id) === String(accountId)
    );

    expect(found).toBeTruthy();
    console.log(`[API] Account ${accountId} Found In Accounts List`);
  }

  assertAccountType(account: any, expectedType: string) {
    expect(account.type).toBe(expectedType);
    console.log(`[API] Account Type Verified: ${account.type}`);
  }

  assertBalanceIsNumeric(account: any) {
    expect(typeof account.balance).toBe('number');
    console.log(`[API] Balance Is Numeric: ${account.balance}`);
  }

  assertAccountSchema(account: any) {
    expect(account).toHaveProperty('id');
    expect(account).toHaveProperty('customerId');
    expect(account).toHaveProperty('type');
    expect(account).toHaveProperty('balance');
    console.log('[API] Account Schema Validation Passed');
  }
}