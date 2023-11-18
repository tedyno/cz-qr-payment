"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIban = exports.calculateCheckDigits = void 0;
const cdigit = __importStar(require("cdigit"));
const country = 'CZ';
const countryCode = '1235';
const calculateCheckDigits = (account) => {
    return cdigit.mod97_10.compute([account.bankCode, account.prefix, account.number, countryCode].join(''));
};
exports.calculateCheckDigits = calculateCheckDigits;
const getIban = (account) => {
    const checkDigits = (0, exports.calculateCheckDigits)(account);
    return [country, checkDigits, account.bankCode, account.prefix, account.number].join('');
};
exports.getIban = getIban;
