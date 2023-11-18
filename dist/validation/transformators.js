"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformBankAccountString = exports.transformBankCode = exports.transformNumber = exports.transformPrefix = void 0;
const transformPrefix = (prefix) => {
    return prefix.padStart(6, '0');
};
exports.transformPrefix = transformPrefix;
const transformNumber = (number) => {
    return number.padStart(10, '0');
};
exports.transformNumber = transformNumber;
const transformBankCode = (bankCode) => {
    return bankCode.padStart(4, '0');
};
exports.transformBankCode = transformBankCode;
const transformBankAccountString = (bankAccount) => {
    const matches = Array.from(bankAccount.matchAll(/^((\d{1,6})-)?(\d{2,10})\/(\d{3,4})$/g))[0];
    return {
        prefix: (0, exports.transformPrefix)(matches[2] || ''),
        number: (0, exports.transformNumber)(matches[3]),
        bankCode: (0, exports.transformBankCode)(matches[4]),
    };
};
exports.transformBankAccountString = transformBankAccountString;
