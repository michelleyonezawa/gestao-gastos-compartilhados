const users = [];
let nextId = 1;

exports.register = (username, password) => {
  if (users.find(u => u.username === username)) return null;
  const user = { id: nextId++, username, password };
  users.push(user);
  return user;
};

exports.authenticate = (username, password) => {
  return users.find(u => u.username === username && u.password === password);
};

// Método para resetar usuários durante testes
exports._reset = () => {
  users.length = 0;
  nextId = 1;
};