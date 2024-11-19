import {
  AccountSchema,
  BankAccountStringSchema,
  PaymentOptionsSchema,
  PaymentSchema,
} from './validation/schema';
import { createQrCode, generateQrContent } from './qr/qr';
import { Account, PaymentOptions, Payment } from './index';
import { getIban } from './iban/iban';

export class QRPayment {
  public readonly paymentOptions: PaymentOptions = {};
  public readonly account: Account;
  public readonly payment: Payment;

  constructor(
    amount: number | null,
    bankAccount: Account | string,
    paymentOptions: Partial<PaymentOptions> = {},
  ) {
    if (typeof bankAccount === 'string') {
      this.account = BankAccountStringSchema.parse(bankAccount);
    } else {
      this.account = AccountSchema.parse(bankAccount);
    }

    this.paymentOptions = PaymentOptionsSchema.parse({ ...this.paymentOptions, ...paymentOptions });
    this.payment = PaymentSchema.parse({ amount });
  }

  public getSvg(): string {
    return createQrCode(this.getQrContent());
  }

  public getQrContent(): string {
    return generateQrContent(getIban(this.account), this.payment, this.paymentOptions);
  }
}

export function createQrPaymentSvg(
  amount: number,
  bankAccount: Account | string,
  paymentOptions: Partial<PaymentOptions> = {},
): string {
  return new QRPayment(amount, bankAccount, paymentOptions).getSvg();
}
