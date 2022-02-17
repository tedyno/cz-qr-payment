import * as cdigit from "cdigit";
import QRCode from 'qrcode-svg'

/**
 * Specifikace QR kodu (https://qr-platba.cz/pro-vyvojare/specifikace-formatu/)
 */
export class QRPayment {
    static parse = {
        amount: value => {
            const parsedFloat = parseFloat(value).toFixed(2);
            if (parsedFloat > 0) {
                return String(parseFloat(value).toFixed(2));
            }

            throw Error(`Invalid amount: ${value}`);
        },
        prefix: value => {
            value = value ? String(value) : '';
            if (/^\d{0,6}$/.test(value)) {
                return value.padStart(6, '0');
            }
            throw Error(`Invalid prefix: '${value}'`);
        },
        number: value => {
            if (/^\d{2,10}$/.test(String(value))) {
                return String(value).padStart(10, '0');
            }

            throw Error(`Invalid account number: '${value}'`);
        },
        bankCode: value => {
            if (value && /^\d{3,4}$/.test(String(value))) {
                return String(value).padStart(4, '0');
            }

            throw Error(`Invalid bank code: ${value}`);
        },
        bankAccountString: value => {
            if (value && /^(\d{1,6}-)?(\d{2,10})\/\d{3,4}$/.test(String(value))) {
                const matches = Array.from(value.matchAll(/^((\d{1,6})-)?(\d{2,10})\/(\d{3,4})$/g))[0];
                return {
                    prefix: matches[2],
                    number: matches[3],
                    bankCode: matches[4],
                };
            }

            throw Error(`Invalid bank account: ${value}`);
        },
        message: value => {
            value = value ? String(value) : '';
            if (/^[^*]{0,60}$/.test(value)) {
                return value;
            }

            return null;
        },
        DT: value => {
            if (value instanceof Date) {
                const date = ('0' + value.getDate()).slice(-2);
                const month = ('0' + (value.getMonth() + 1)).slice(-2);
                const year = value.getFullYear();
                return `${year}${date}${month}`;
            }

            value = value ? String(value) : '';
            if (/^\d{8}|^$/.test(value)) {
                return value;
            }

            return null;
        },
        symbols: value => {
            value = value ? String(value) : '';
            if (/^\d{0,10}$/.test(value)) {
                return value;
            }

            return value.substring(0, 9);
        },
        VS: value => QRPayment.parse.symbols(value),
        SS: value => QRPayment.parse.symbols(value),
        KS: value => QRPayment.parse.symbols(value),
        URL: value => {
            value = value ? String(value) : '';
            if (/^[^*]{0,140}$/.test(value)) {
                return value;
            }

            return value.substring(0, 139);
        },
    }

    /**
     *
     * @type {{DT: string, SS: string, padding: number, color: string, background: string, width: number, KS: string, message: string, VS: string, height: number}}
     */
    options = {
       message: '',
       padding: 4,
       width: 256,
       height: 256,
       color: "#000000",
       background: "#ffffff",
       DT: '', //datum splatnosti YYYYMMDD
       VS: '', // Variabilní symbol
       SS: '', // Specifický symbol
       KS: '', // Konstantní symbol
       URL: '', // URL
    }
    /**
     *
     * @param amount
     * @param prefix
     * @param number
     * @param bankCode
     * @param options
     */
    constructor(amount, prefix, number, bankCode, options = {}) {
        this.amount = QRPayment.parse.amount(amount);
        this.prefix = QRPayment.parse.prefix(prefix);
        this.number = QRPayment.parse.number(number);
        this.bankCode = QRPayment.parse.bankCode(bankCode);
        this.country = 'CZ';
        this.options = {...this.options, ...options};
    }

    static fromBankAccountString(amount, string, options = {}) {
        const bankAccount = QRPayment.parse.bankAccountString(string);
        return new this(amount, bankAccount.prefix, bankAccount.number, bankAccount.bankCode, options);
    }

    /**
     * @param {string }string
     */
    convertLetters = (string) => {
        if (string.length < 1) throw Error('Invalid value of string');
        const stringMap  = {'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19, 'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24, 'P': 25, 'Q': 26, 'R': 27, 'S': 28, 'T': 29, 'U': 30, 'V': 31, 'W': 32, 'X': 33, 'Y': 34, 'Z': 35};

        return [...string].map(char => String(stringMap[char])).join('');
    }

    /**
     *
     * @param string
     * @returns {string}
     */
    calculateCheckDigits = (string) => {
        return cdigit.mod97_10.compute(string);
    }

    /**
     *
     * @returns {string}
     */
    getIban = () => {
        const checkDigits = this.calculateCheckDigits([this.bankCode, this.prefix, this.number, this.convertLetters(this.country)].join(''));

        return [this.country, checkDigits, this.bankCode, this.prefix, this.number].join('');
    }

    /**
     * @returns {string}
     */
    generateContent = () => {
        const content = {
            ACC: this.getIban(),
            AM: this.amount,
            CC: 'CZK',
            ...(QRPayment.parse.message(this.options.message) && {MSG: QRPayment.parse.message(this.options.message)}),
            ...(QRPayment.parse.VS(this.options.VS) && {'X-VS': QRPayment.parse.VS(this.options.VS)}),
            ...(QRPayment.parse.SS(this.options.SS) && {'X-SS': QRPayment.parse.SS(this.options.SS)}),
            ...(QRPayment.parse.KS(this.options.KS) && {'X-KS': QRPayment.parse.KS(this.options.KS)}),
            ...(QRPayment.parse.URL(this.options.URL) && {'X-URL': QRPayment.parse.URL(this.options.URL)}),
            ...(QRPayment.parse.DT(this.options.DT) && {'DT': QRPayment.parse.DT(this.options.DT)}),
        }

        return 'SPD*1.0*' + Object.keys(content).map((key) => [key, content[key]].join(':')).join('*');
    }

    /**
     *
     * @returns object
     */
    getQR() {
        return new QRCode({
            content: this.generateContent(),
            padding: this.options.padding,
            width: this.options.width,
            height: this.options.height,
            color: this.options.color,
            background: this.options.background,
            ecl: "M",
        });
    }

    /**
     *
     * @returns string
     */
    render() {
        return this.getQR().svg();
    }
}
