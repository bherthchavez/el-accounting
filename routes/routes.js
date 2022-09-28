const router = require('express').Router();
const userController = require('../controllers/user.controller');
const bankAccController = require('../controllers/bank.account.controller');
const suppAccController = require('../controllers/supplier.account.controller');
const dashboard = require('../controllers/dashboard.controller');
const user = require('../controllers/user.auth.controller');
const upload = require('../middleware/upload.middleware')


router.get('/', dashboard.viewDashboard);
router.get('/sign-in', user.signIn);
router.post('/sign-in', user.checkUser);
router.get('/logout', user.logoutUser);

router.get('/add', (req, res)=>{
    res.render('add_user', {title: 'Add User'})
})
router.get('/edit/:id', userController.getEditUser);
router.post('/add', upload, userController.addUser );
router.post('/update/:id', upload, userController.editUser)
router.get('/delete/:id', userController.deleteUser);


router.get('/bank-accounts', bankAccController.viewBankAcc);
router.post('/add/bank-accounts/', bankAccController.addBankAcc );
router.post('/update/bank-accounts/:id', bankAccController.updateBankAcc)
router.get('/delete/bank-account/:id', bankAccController.deleteBankAcc);


router.get('/supplier-accounts', suppAccController.viewSuppAcc);
router.post('/add/supplier-accounts/', suppAccController.addSuppAcc );
router.post('/update/supplier-accounts/:id', suppAccController.updateSuppAcc)
router.get('/delete/supplier-account/:id', suppAccController.deleteSuppAcc);
router.get('/create-bill/:id', suppAccController.cBillSuppAcc);

router.post('/supplier-bill',upload, suppAccController.supplierBill);


module.exports = router;