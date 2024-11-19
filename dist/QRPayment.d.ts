import { Account, PaymentOptions, Payment, AmountInput, BankAccountInput, PaymentOptionsInput } from './index';
export declare class QRPayment {
    readonly paymentOptions: PaymentOptions;
    readonly account: Account;
    readonly payment: Payment;
    constructor(amount: AmountInput, bankAccount: BankAccountInput, paymentOptions?: PaymentOptionsInput);
    getSvg(): string;
    getQrContent(): string;
}
export declare function createQrPaymentSvg(amount: AmountInput, bankAccount: BankAccountInput, paymentOptions?: PaymentOptionsInput): string;
