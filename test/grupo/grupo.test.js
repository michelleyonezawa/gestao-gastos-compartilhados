const { expect } = require('chai');
const { request, BASE_URL, getToken } = require('../helpers');
const usuarios = require('../fixtures/usuario.json');
const grupos = require('../fixtures/grupo.json');

describe('JIRA-2: Cadastro de um Grupo', () => {
  let token;

  before(async () => {
    await request(BASE_URL).post('/api/register').send(usuarios[0]);
    token = await getToken(usuarios[0].username, usuarios[0].password);
  });

  it('Deve falhar ao cadastrar grupo sem autenticação', async () => {
    const res = await request(BASE_URL).post('/api/grupos').send(grupos[0]);
    expect(res.status).to.equal(401);
  });

  it('Deve falhar ao cadastrar grupo com nome já existente', async () => {
    await request(BASE_URL).post('/api/grupos').set('Authorization', `Bearer ${token}`).send(grupos[0]);
    const res = await request(BASE_URL).post('/api/grupos').set('Authorization', `Bearer ${token}`).send(grupos[0]);
    expect(res.status).to.equal(400);
  });

  it('Deve cadastrar grupo com nome válido', async () => {
    const res = await request(BASE_URL).post('/api/grupos').set('Authorization', `Bearer ${token}`).send(grupos[1]);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('nome', grupos[1].nome);
  });

  it('Criador deve ser vinculado automaticamente ao grupo', async () => {
    const res = await request(BASE_URL).post('/api/grupos').set('Authorization', `Bearer ${token}`).send({ nome: 'GrupoVinculo' });
    expect(res.body.integrantes).to.include(res.body.integrantes[0]);
  });
});
