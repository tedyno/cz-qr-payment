import { Account } from '../index';

export const transformPrefix = (prefix: string): string => {
  return prefix.padStart(6, '0');
};

export const transformNumber = (number: string): string => {
  return number.padStart(10, '0');
};

export const transformBankCode = (bankCode: string): string => {
  return bankCode.padStart(4, '0');
};

export const transformBankAccountString = (bankAccount: string): Account => {
  const matches = Array.from(bankAccount.matchAll(/^((\d{1,6})-)?(\d{2,10})\/(\d{3,4})$/g))[0];

  return {
    prefix: transformPrefix(matches[2] || ''),
    number: transformNumber(matches[3]),
    bankCode: transformBankCode(matches[4]),
  };
};
