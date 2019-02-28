const router = require('express').Router();

const getAllUsers = require('../controllers/user/getAllUsers');
const loginUser = require('../controllers/user/loginUser');
const registerUser = require('../controllers/user/registerUser');
const updateUser = require('../controllers/user/updateUser');
const deleteUser = require('../controllers/user/deleteUser');
const getUser = require('../controllers/user/getUser');

router.get('/', getAllUsers);
router.get('/user/info', getUser);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
