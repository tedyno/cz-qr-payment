/**
 * Represents an account with specific details.
 * @interface Account
 * @property {string} prefix - The account prefix.
 * @property {string} number - The account number.
 * @property {string} bankCode - The bank code associated with the account.
 */
export interface Account {
    readonly prefix: string;
    readonly number: string;
    readonly bankCode: string;
}
/**
 * Represents a payment with specific details.
 * @interface Payment
 * @property {string} amount - The payment amount.
 * @property {string} currency - The currency type (limited to 'CZK').
 */
export interface Payment {
    readonly amount: string;
    readonly currency: string;
}
/**
 * Represents options for a specific operation.
 * @interface PaymentOptions
 * @property {string | undefined} message - The main message content.
 * @property {string | undefined} DT - Datum splatnosti (YYYYMMDD).
 * @property {string | undefined} VS - Variabilní symbol.
 * @property {string | undefined} SS - Specifický symbol.
 * @property {string | undefined} KS - Konstantní symbol.
 * @property {string | undefined} URL - The URL associated with the operation.
 */
export interface PaymentOptions {
    message?: string;
    DT?: string;
    VS?: string;
    SS?: string;
    KS?: string;
    URL?: string;
}
export * from './QRPayment';
