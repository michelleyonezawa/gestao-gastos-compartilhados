const grupoService = require('../service/grupoService');

exports.create = (req, res) => {
  const userId = req.user.id;
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome do grupo é obrigatório' });
  const grupo = grupoService.create(nome, userId);
  if (!grupo) return res.status(400).json({ error: 'Nome do grupo já existe' });
  res.status(201).json(grupo);
};
