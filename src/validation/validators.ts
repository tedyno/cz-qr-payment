export const bankAccountBankCodePattern = /^\d{3,4}$/;
export const bankAccountNumberPattern = /^\d{2,10}$/;
export const bankAccountPrefixPattern = /^\d{0,6}$/;
export const bankAccountStringPattern = /^(\d{1,6}-)?(\d{2,10})\/\d{3,4}$/;
export const iso8601Pattern =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,})?(Z|[-+]\d{2}:\d{2})?$/;

export const isNumeric = (value: string): boolean => /^\d+$/.test(value);

export const isISO8601Date = (date: string): boolean => {
  return iso8601Pattern.test(date);
};
