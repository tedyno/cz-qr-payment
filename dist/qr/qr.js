"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQrCode = exports.generateQrContent = void 0;
const qrcode_generator_1 = __importDefault(require("qrcode-generator"));
const generateQrContent = (iban, payment, options) => {
    const content = new Map([
        ['ACC', iban],
        ['CC', payment.currency],
    ]);
    if (payment.amount) {
        content.set('AM', payment.amount);
    }
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
exports.generateQrContent = generateQrContent;
const createQrCode = (content) => {
    const qr = (0, qrcode_generator_1.default)(0, 'L');
    qr.addData(content);
    qr.make();
    return qr.createSvgTag({ scalable: true });
};
exports.createQrCode = createQrCode;
