var express = require('express');
var router = express.Router();
const { getAllUsers, getUserById, login, signUp, isAuth, editUser, checkUserName, checkEmail } = require('../controllers/auth')

/* GET users listing. */

router.post('/signup', signUp);
router.post('/login', login);
router.get('/find/:username', checkUserName);
router.get('/find/:email', checkEmail);
// router.use('/', isAuth);
router.get('/', isAuth, getAllUsers);
router.get('/:id', isAuth, getUserById);
router.put('/:id', isAuth, editUser);



module.exports = router;
