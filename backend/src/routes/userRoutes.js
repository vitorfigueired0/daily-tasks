const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();
router.route('/user')
    .post(userController.createUser)

module.exports = router;
