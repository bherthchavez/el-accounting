const router = require('express').Router();
const userController = require('../controllers/user.controller');
const bankAccController = require('../controllers/bank.account.controller');
const dashboard = require('../controllers/dashboard.controller');
const user = require('../controllers/user.auth.controller');
const upload = require('../middleware/upload.middleware')


router.get('/', dashboard.viewDashboard);
router.get('/sign-in', user.signIn);
router.post('/sign-in', user.checkUser);
router.get('/logout', user.logoutUser);
router.get('/incorrect-user', user.incorrectUser);

router.get('/add', (req, res)=>{
    res.render('add_user', {title: 'Add User'})
})
router.get('/edit/:id', userController.getEditUser);
router.post('/add', upload, userController.addUser );
router.post('/update/:id', upload, userController.editUser)
router.get('/delete/:id', userController.deleteUser);


router.get('/bank-accounts', bankAccController.viewBankAcc);
router.get('/add/bank-account', (req, res)=>{
    res.render('add_user', {title: 'Add Bank Account'})
})
router.get('/edit/:id', bankAccController.getEditBankAcc);
router.post('/add', upload, bankAccController.addBankAcc );
router.post('/update/:id', upload, bankAccController.editBankAcc)
router.get('/delete/:id', bankAccController.deleteBankAcc);


module.exports = router;