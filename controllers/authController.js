const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    req.session.userId = user.id;
    res.redirect('/acoustic');
  } catch (error) {
    res.status(500).send('Error registering new user');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.id;
      res.redirect('/acoustic');
    } else {
      res.status(401).send('USUARIO O CONTRASEÑA INCORRECTA');
    }
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

exports.dashboard = (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('acoustic', { username: req.session.username });
};
