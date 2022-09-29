const mongoose = require('mongoose');

const bank_transferSchema = new mongoose.Schema({
    payment_voucher_no: {
        type:  String,
        required: true,
    },
    b_name: {
        type:  String,
        required: true,
    },
    b_address: {
        type:  String,
        required: true,
    },
    payment_from: {
        type:  String,
        required: true,
    },
    bank_name: {
        type:  String,
        required: true,
    },
    iban_no: {
        type:  String,
        required: true,
    },
    swift_code: {
        type:  String,
        required: true,
    },
    transfer_charge: {
        type:  String,
        required: true,
    },
    transfer_purpose: {
        type:  String,
        required: true,
    },
    currency: {
        type:  String,
        required: true,
    },
    amount: {
        type:  Number,
        required: true,
    },
    amountInWords: {
        type:  String,
        required: true,
    },
    transfer_amount: {
        type: Number,
        required: true,
    },
});


module.exports = mongoose.model("bank_transfer", bank_transferSchema);