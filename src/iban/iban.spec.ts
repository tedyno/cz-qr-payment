import { calculateCheckDigits, getIban } from './iban';

describe('iban', () => {
  it('calculateCheckDigits', () => {
    expect(
      calculateCheckDigits({
        bankCode: '0800',
        prefix: '000000',
        number: '123123',
      }),
    ).toEqual('43');
  });

  it('getIban', () => {
    expect(
      getIban({
        bankCode: '3030',
        prefix: '000000',
        number: '1263035066',
      }),
    ).toEqual('CZ2130300000001263035066');
  });
});
