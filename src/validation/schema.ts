import { Account, Payment } from '../index';
import { z } from 'zod';
import {
  bankAccountBankCodePattern,
  bankAccountNumberPattern,
  bankAccountPrefixPattern,
  bankAccountStringPattern,
  isISO8601Date,
  isNumeric,
} from './validators';
import {
  transformBankAccountString,
  transformBankCode,
  transformNumber,
  transformPrefix,
} from './transformators';

export const BankAccountStringSchema = z
  .string()
  .regex(bankAccountStringPattern)
  .transform((bankAccount: string): Account => transformBankAccountString(bankAccount));

export const PaymentOptionsSchema = z.object({
  message: z
    .string()
    .optional()
    .refine(
      (message: string | undefined) => !message || !message.includes('*'),
      "Message cannot contain the '*' character",
    ),
  DT: z
    .string()
    .optional()
    .refine(
      (date: string | undefined) => !date || isISO8601Date(date),
      'DT has to be a valid ISO 8601 date',
    ),
  VS: z
    .string()
    .optional()
    .refine(
      (val: string | undefined) => !val || (val.length <= 10 && isNumeric(val)),
      'VS should be empty or contain only digits (maximum length is 10)',
    ),
  SS: z
    .string()
    .optional()
    .refine(
      (val: string | undefined) => !val || (val.length <= 10 && isNumeric(val)),
      'SS should be empty or contain only digits (maximum length is 10)',
    ),
  KS: z
    .string()
    .optional()
    .refine(
      (val: string | undefined) => !val || (val.length <= 10 && isNumeric(val)),
      'KS should be empty or contain only digits (maximum length is 10)',
    ),
  URL: z
    .string()
    .optional()
    .refine((val: string | undefined) => !val || val.length <= 140, 'Maximum length is 140'),
});

export const PaymentSchema = z
  .object({
    amount: z
      .number()
      .min(1, 'Minimum value is 1')
      .transform((amount: number) => amount.toFixed(2))
      .refine((val: string) => val.length <= 10, 'Invalid amount')
      .nullable(),
  })
  .transform(
    (data): Payment => ({
      ...data,
      currency: 'CZK',
    }),
  );

export const AccountSchema = z
  .object({
    prefix: z.string().regex(bankAccountPrefixPattern, 'Account number prefix is invalid'),
    number: z.string().regex(bankAccountNumberPattern, 'Account number is invalid'),
    bankCode: z.string().regex(bankAccountBankCodePattern, 'BankCode is invalid'),
  })
  .transform(
    (data: Account): Account => ({
      ...data,
      prefix: transformPrefix(data.prefix || ''),
      number: transformNumber(data.number),
      bankCode: transformBankCode(data.bankCode),
    }),
  );
