const express = require('express');

const router = express.Router();

router.get('/acoustic', (req, res) => {
  res.render('acoustic');
});

router.get('/bass', (req, res) => {
  res.render('bass');
});

router.get('/electric', (req, res) => {
  res.render('electric');
});

router.get('/amps', (req, res) => {
  res.render('amps');
});

module.exports = router;
