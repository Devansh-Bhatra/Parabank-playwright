import { APIRequestContext, expect } from '@playwright/test';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  /**
   * TC-021 / TS-11 — GET accounts list for a customer
   */
  async getCustomerAccounts(customerId: string) {
    const url = `${BASE_URL}/customers/${customerId}/accounts`;
    console.log(`[API] GET ${url}`);
    const response = await this.request.get(url);
    const body = await response.json();
    console.log(`[API] Response status: ${response.status()} | Body: ${JSON.stringify(body)}`);
    return { response, body };
  }

  /**
   * TC-022 / TS-12 — POST create new account
   */
  async createAccount(customerId: string, accountType: number, fromAccountId: string) {
    const url = `${BASE_URL}/createAccount?customerId=${customerId}&newAccountType=${accountType}&fromAccountId=${fromAccountId}`;
    console.log(`[API] POST ${url}`);
    const response = await this.request.post(url);
    const body = await response.json().catch(() => ({}));
    console.log(`[API] Response status: ${response.status()} | Body: ${JSON.stringify(body)}`);
    return { response, body };
  }

  /**
   * TC-023 / TS-13 — GET account details by account ID
   */
  async getAccountDetails(accountId: string) {
    const url = `${BASE_URL}/accounts/${accountId}`;
    console.log(`[API] GET ${url}`);
    const response = await this.request.get(url);
    const body = await response.json().catch(() => ({}));
    console.log(`[API] Response status: ${response.status()} | Body: ${JSON.stringify(body)}`);
    return { response, body };
  }

  /**
   * TC-024 / TS-14 — POST transfer funds
   */
  async transferFunds(fromAccountId: string, toAccountId: string, amount: number) {
    const url = `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${amount}`;
    console.log(`[API] POST ${url}`);
    const response = await this.request.post(url);
    const status = response.status();
    console.log(`[API] Transfer response status: ${status}`);
    return { response, status };
  }

  /**
   * TC-025 / TS-15 — GET invalid account (expect 404/error)
   */
  async getInvalidAccount(invalidAccountId: string) {
    const url = `${BASE_URL}/accounts/${invalidAccountId}`;
    console.log(`[API] GET ${url} (invalid account test)`);
    const response = await this.request.get(url);
    const status = response.status();
    console.log(`[API] Invalid account response status: ${status}`);
    return { response, status };
  }

  // ── assertion helpers ──────────────────────────────────────────────────────

  assertStatus(actual: number, expected: number) {
    expect(actual).toBe(expected);
    console.log(`[API] Status code assertion passed: ${actual} === ${expected}`);
  }

  assertAccountExists(accounts: any[], accountId: string) {
    const found = accounts.some((a: any) => String(a.id) === String(accountId));
    expect(found).toBeTruthy();
    console.log(`[API] Account ${accountId} found in accounts list`);
  }

  assertAccountType(account: any, expectedType: string) {
    expect(account.type).toBe(expectedType);
    console.log(`[API] Account type verified: ${account.type}`);
  }

  assertBalanceIsNumeric(account: any) {
    expect(typeof account.balance).toBe('number');
    console.log(`[API] Balance is numeric: ${account.balance}`);
  }

  assertAccountSchema(account: any) {
    expect(account).toHaveProperty('id');
    expect(account).toHaveProperty('customerId');
    expect(account).toHaveProperty('type');
    expect(account).toHaveProperty('balance');
    console.log('[API] Account schema validation passed');
  }
}
