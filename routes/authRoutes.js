const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/login'));

router.get('/register', (req, res) => res.render('register'));
router.post('/register', authController.register);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/dashboard', authController.dashboard);

module.exports = router;
