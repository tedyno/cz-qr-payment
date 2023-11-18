"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isISO8601Date = exports.isNumeric = exports.iso8601Pattern = exports.bankAccountStringPattern = exports.bankAccountPrefixPattern = exports.bankAccountNumberPattern = exports.bankAccountBankCodePattern = void 0;
exports.bankAccountBankCodePattern = /^\d{3,4}$/;
exports.bankAccountNumberPattern = /^\d{2,10}$/;
exports.bankAccountPrefixPattern = /^\d{0,6}$/;
exports.bankAccountStringPattern = /^(\d{1,6}-)?(\d{2,10})\/\d{3,4}$/;
exports.iso8601Pattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,})?(Z|[-+]\d{2}:\d{2})?$/;
const isNumeric = (value) => /^\d+$/.test(value);
exports.isNumeric = isNumeric;
const isISO8601Date = (date) => {
    return exports.iso8601Pattern.test(date);
};
exports.isISO8601Date = isISO8601Date;
