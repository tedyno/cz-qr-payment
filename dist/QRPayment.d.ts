import { Account, PaymentOptions, Payment } from './index';
export declare class QRPayment {
    readonly paymentOptions: PaymentOptions;
    readonly account: Account;
    readonly payment: Payment;
    constructor(amount: number, bankAccount: Account | string, paymentOptions?: Partial<PaymentOptions>);
    getSvg(): string;
    getQrContent(): string;
}
export declare function createQrPaymentSvg(amount: number, bankAccount: Account | string, paymentOptions?: Partial<PaymentOptions>): string;
