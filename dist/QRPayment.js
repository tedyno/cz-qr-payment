"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQrPaymentSvg = exports.QRPayment = void 0;
const schema_1 = require("./validation/schema");
const qr_1 = require("./qr/qr");
const iban_1 = require("./iban/iban");
class QRPayment {
    constructor(amount, bankAccount, paymentOptions = {}) {
        this.paymentOptions = {};
        if (typeof bankAccount === 'string') {
            this.account = schema_1.BankAccountStringSchema.parse(bankAccount);
        }
        else {
            this.account = schema_1.AccountSchema.parse(bankAccount);
        }
        this.paymentOptions = schema_1.PaymentOptionsSchema.parse({ ...this.paymentOptions, ...paymentOptions });
        this.payment = schema_1.PaymentSchema.parse({ amount });
    }
    getSvg() {
        return (0, qr_1.createQrCode)(this.getQrContent());
    }
    getQrContent() {
        return (0, qr_1.generateQrContent)((0, iban_1.getIban)(this.account), this.payment, this.paymentOptions);
    }
}
exports.QRPayment = QRPayment;
function createQrPaymentSvg(amount, bankAccount, paymentOptions = {}) {
    return new QRPayment(amount, bankAccount, paymentOptions).getSvg();
}
exports.createQrPaymentSvg = createQrPaymentSvg;
