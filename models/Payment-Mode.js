const mongoose = require('mongoose');

let payment_modeSchema = new mongoose.Schema({
    payment_voucher_no: {
        type:  String,
        required: true,
    },
    cheque_no: {
        type:  String,
        required: true,
    },
    beneficiary_name: {
        type:  String,
        required: true,
    },
    cheque_date: {
        type:  String,
        required: true,
    },
    cheque_status: {
        type:  String,
        required: true,
    },
    cheque_amount: {
        type:  Number,
        required: true,
    },
});


module.exports = mongoose.model("payment_mode", payment_modeSchema);