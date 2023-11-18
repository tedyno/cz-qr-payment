## @tedyno/cz-qr-payment

### Description
A simple and efficient npm package for generating QR codes tailored for CZ 🇨🇿 payments. This package facilitates the creation of QR codes in SVG format with customizable payment details, providing an easy solution for generating payment QR codes compatible with Czech banking systems.

### Installation
```bash
npm install @tedyno/cz-qr-payment
```
OR
```bash
yarn add @tedyno/cz-qr-payment
```

#### Usage
Using Class Instance
```js
import {QRPayment} from '@tedyno/cz-qr-payment';

const amount = 322.4; // 322.40 CZK
const accountNumber = '19-2000145399/0800';
const options = {
  VS: '126303', // Variable symbol
  KS: '126303', // Constant symbol
  SS: '126303', // Specific symbol
  message: 'Payment for order #126303', // Note
};

const qrPayment = new QRPayment(amount, accountNumber, options);
qrPayment.getSvg(); // returns svg as a string
```

Using Function
```js

const amount = 322.4; // 322.40 CZK
const accountNumber = '19-2000145399/0800';
const options = {
  VS: '126303', // Variable symbol
  KS: '126303', // Constant symbol
  SS: '126303', // Specific symbol
  message: 'Payment for order #126303', // Note
};

const qrPaymentSvg = createQrPaymentSvg(amount, accountNumber, options); // returns svg as a string
```

### QR Code Content Specifications
The information used for creating the QR code content adheres to the specifications provided by [qr-platba.cz](https://qr-platba.cz/pro-vyvojare/specifikace-formatu/). It's important to note that this package was primarily developed for personal use cases and might not cover all potential scenarios. While efforts have been made to ensure compatibility, users are responsible for verifying and validating the correctness of the generated QR code content. Testing with all possible accounts has not been conducted; however, the package has been tested successfully with various scenarios.

### Troubleshooting and Issues
If you encounter any troubles with the generated QR codes or have suggestions for improvements, please [create an issue](https://github.com/tedyno/cz-qr-payment/issues) on the GitHub repository page.
