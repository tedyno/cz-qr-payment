Usage

```js
import {QRPayment} from "./qrsvgjs.js";

const payment = new QRPayment(156.90, 123, 1234567891, 0100, {
    VS: 126303,
    message: 'Payment for order #126303',
});
```
OR

```js
import {QRPayment} from "./qrsvgjs.js";

const payment = QRPayment.fromBankAccountString(156.90, '123-1234567891/0100', {
    VS: 126303,
    message: 'Payment for order #126303',
});
```

to save the QR code
```js
payment.getQR().save("qr.svg", function(error) {
    if (error) throw error;
    console.log("Done!");
});
```

to get the QR svg as xml string
```js
payment.getQR().svg();
```
