import { Payment, PaymentOptions } from '../index';
import qrcode from 'qrcode-generator';

export const generateQrContent = (
  iban: string,
  payment: Payment,
  options: PaymentOptions,
): string => {
  const content = new Map<string, string>([
    ['ACC', iban],
    ['AM', payment.amount],
    ['CC', payment.currency],
  ]);

  if (options.message) {
    content.set('MSG', options.message);
  }

  if (options.VS) {
    content.set('X-VS', options.VS);
  }

  if (options.SS) {
    content.set('X-SS', options.SS);
  }

  if (options.KS) {
    content.set('X-KS', options.KS);
  }

  if (options.URL) {
    content.set('X-URL', options.URL);
  }

  if (options.DT) {
    content.set('DT', options.DT);
  }

  return 'SPD*1.0*' + [...content.entries()].map(([key, value]) => `${key}:${value}`).join('*');
};

export const createQrCode = (content: string): string => {
  const qr = qrcode(0, 'L');
  qr.addData(content);
  qr.make();

  return qr.createSvgTag({ scalable: true });
};
