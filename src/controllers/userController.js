const jwt = require('jsonwebtoken');
const userService = require('../service/userService');
const SECRET = 'supersecret';

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = userService.authenticate(username, password);
  if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Os campos obrigatórios são username e password.' });
  }
  const user = userService.register(username, password);
  if (!user) return res.status(400).json({ error: 'Usuário já existe' });
  res.status(201).json({ id: user.id, username: user.username });
};