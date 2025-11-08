const { expect } = require('chai');
const { request, BASE_URL } = require('../helpers');
const usuarios = require('../fixtures/usuario.json');

describe('JIRA-1: Cadastro de um Usuário', () => {
  it('Deve falhar ao cadastrar usuário com e-mail já existente', async () => {
    await request(BASE_URL).post('/api/register').send(usuarios[0]);
    const res = await request(BASE_URL).post('/api/register').send(usuarios[0]);
    expect(res.status).to.equal(400);
  });

  it('Deve cadastrar usuário com todos os campos obrigatórios', async () => {
    const res = await request(BASE_URL).post('/api/register').send(usuarios[1]);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('username', usuarios[1].username);
  });
});
