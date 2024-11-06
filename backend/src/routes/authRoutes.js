const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.route('/auth')
    .post(authController.login)

module.exports = router;
