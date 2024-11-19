import {
  AccountSchema,
  BankAccountStringSchema,
  PaymentOptionsSchema,
  PaymentSchema,
} from './validation/schema';
import { createQrCode, generateQrContent } from './qr/qr';
import {
  Account,
  PaymentOptions,
  Payment,
  AmountInput,
  BankAccountInput,
  PaymentOptionsInput,
} from './index';
import { getIban } from './iban/iban';

export class QRPayment {
  public readonly paymentOptions: PaymentOptions = {};
  public readonly account: Account;
  public readonly payment: Payment;

  constructor(
    amount: AmountInput,
    bankAccount: BankAccountInput,
    paymentOptions: PaymentOptionsInput = {},
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
  amount: AmountInput,
  bankAccount: BankAccountInput,
  paymentOptions: PaymentOptionsInput = {},
): string {
  return new QRPayment(amount, bankAccount, paymentOptions).getSvg();
}
