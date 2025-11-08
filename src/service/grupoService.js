const grupos = [];
let nextId = 1;


exports.create = (nome, userId) => {
  if (grupos.find(g => g.nome === nome)) return null;
  const grupo = {
    id: nextId++,
    nome,
    integrantes: [userId]
  };
  grupos.push(grupo);
  return grupo;
};

exports.getById = (id) => {
  return grupos.find(g => g.id == id);
};
