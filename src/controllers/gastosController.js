const gastosService = require('../service/gastosService');

exports.list = (req, res) => {
  const gastos = gastosService.list(req.user.id);
  res.json(gastos);
};

exports.create = (req, res) => {
  const gasto = gastosService.create(req.user.id, req.body);
  if (!gasto) return res.status(400).json({ error: 'Grupo inválido ou usuário não pertence ao grupo' });
  res.status(201).json(gasto);
};

exports.update = (req, res) => {
  const gasto = gastosService.update(req.user.id, req.params.id, req.body);
  if (!gasto) return res.status(404).json({ error: 'Gasto não encontrado' });
  res.json(gasto);
};

exports.remove = (req, res) => {
  const success = gastosService.remove(req.user.id, req.params.id);
  if (!success) return res.status(404).json({ error: 'Gasto não encontrado' });
  res.status(204).send();
};