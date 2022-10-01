const router = require('express').Router();
const dashboard = require('../controllers/dashboard.controller');
const settings = require('../controllers/settings.controller');
const bankAccController = require('../controllers/bank.account.controller');
const suppAccController = require('../controllers/supplier.account.controller');
const transactionController = require('../controllers/transaction.controller');
const user = require('../controllers/user.auth.controller');
const upload = require('../middleware/upload.middleware')


router.get('/', dashboard.viewDashboard);
router.get('/sign-in', user.signIn);
router.post('/sign-in', user.checkUser);
router.get('/logout', user.logoutUser);

router.get('/system-settings', settings.viewSysSettings);
router.post('/update-system-settings', settings.updateSysSettings);

router.get('/master', settings.viewChartAcc);
router.post('/add/account-ledger', settings.addChartAcc );
router.post('/update/ledger/:id', settings.updateChartAcc)
router.get('/delete/ledger/:id', settings.deleteChartAcc);

router.get('/cost-center', settings.viewCostCenter);
router.post('/add/cost-center', settings.addCostCenter );
router.post('/update/cost-center/:id', settings.updateCostCenter)
router.get('/delete/cost-center/:id', settings.deleteCostCenter);

router.get('/purpose-transfer', settings.viewPurpose);
router.post('/add/purpose-transfer', settings.addPurpose );
router.post('/update/purpose/:id', settings.updatePurpose)
router.get('/delete/purpose/:id', settings.deletePurpose);

router.get('/bank-accounts', bankAccController.viewBankAcc);
router.post('/add/bank-accounts/', bankAccController.addBankAcc );
router.post('/update/bank-accounts/:id', bankAccController.updateBankAcc)
router.get('/delete/bank-account/:id', bankAccController.deleteBankAcc);

router.get('/supplier-accounts', suppAccController.viewSuppAcc);
router.post('/add/supplier-accounts/', suppAccController.addSuppAcc );
router.post('/update/supplier-accounts/:id', suppAccController.updateSuppAcc)
router.get('/delete/supplier-account/:id', suppAccController.deleteSuppAcc);

router.get('/create-bill/:id', transactionController.cBillSuppAcc);
router.get('/pay-bill/:id', transactionController.paySuppBill);
router.post('/supplier-bill',upload, transactionController.supplierBill);
router.post('/pay-supplier',upload, transactionController.paySupplier);

router.get('/print-letter/:id', transactionController.printLetter);
router.get('/print-voucher/:id', transactionController.printVoucher);

module.exports = router;