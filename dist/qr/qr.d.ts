import { Payment, PaymentOptions } from '../index';
export declare const generateQrContent: (iban: string, payment: Payment, options: PaymentOptions) => string;
export declare const createQrCode: (content: string) => string;
