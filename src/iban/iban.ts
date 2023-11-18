import * as cdigit from 'cdigit';
import { Account } from '../index';

const country: string = 'CZ';
const countryCode: string = '1235';

export const calculateCheckDigits = (account: Account): string => {
  return cdigit.mod97_10.compute(
    [account.bankCode, account.prefix, account.number, countryCode].join(''),
  );
};

export const getIban = (account: Account): string => {
  const checkDigits = calculateCheckDigits(account);

  return [country, checkDigits, account.bankCode, account.prefix, account.number].join('');
};
