const gastos = [];
let nextId = 1;

exports.list = (userId) => {
  return gastos.filter(g => g.userId === userId);
};

const grupoService = require('./grupoService');

exports.create = (userId, data) => {
  const { grupoId, descricao, valor, categoria, data: dataGasto } = data;
  if (!grupoId) return null;
  const grupo = grupoService.getById(grupoId);
  if (!grupo) return null;
  if (!grupo.integrantes.includes(userId)) return null;
  const gasto = { id: nextId++, userId, grupoId, descricao, valor, categoria, data: dataGasto };
  gastos.push(gasto);
  return gasto;
};

exports.update = (userId, id, data) => {
  const gasto = gastos.find(g => g.id == id && g.userId === userId);
  if (!gasto) return null;
  Object.assign(gasto, data);
  return gasto;
};

exports.remove = (userId, id) => {
  const index = gastos.findIndex(g => g.id == id && g.userId === userId);
  if (index === -1) return false;
  gastos.splice(index, 1);
  return true;
};