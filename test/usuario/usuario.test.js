const { expect } = require('chai');
const { request, BASE_URL } = require('../helpers');
const usuarios = require('../fixtures/usuario.json');

describe('JIRA-1: Cadastro de um Usuário', () => {
  it('Deve falhar ao cadastrar usuário com username já existente', async () => {
    await request(BASE_URL).post('/api/register').send(usuarios[0]);
    const res1 = await request(BASE_URL).post('/api/register').send(usuarios[0]);
    expect(res1.status).to.equal(400);
  });

  it('Deve cadastrar usuário com todos os campos obrigatórios', async () => {
    const res2 = await request(BASE_URL).post('/api/register').send(usuarios[1]);
    expect(res2.status).to.equal(201);
    expect(res2.body).to.have.property('id');
    expect(res2.body).to.have.property('username', usuarios[1].username);
  });
});



