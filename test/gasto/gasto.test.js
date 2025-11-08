const { expect } = require('chai');
const { request, BASE_URL, getToken } = require('../helpers');
const usuarios = require('../fixtures/usuario.json');
const grupos = require('../fixtures/grupo.json');
const gastos = require('../fixtures/gasto.json');

let token;
let grupoId;

describe('JIRA-4: Registro de Gasto por Integrante', () => {
  before(async () => {
    await request(BASE_URL).post('/api/register').send(usuarios[0]);
    token = await getToken(usuarios[0].username, usuarios[0].password);
    const grupoRes = await request(BASE_URL).post('/api/grupos').set('Authorization', `Bearer ${token}`).send(grupos[0]);
    grupoId = grupoRes.body.id;
  });

  it('Deve falhar ao registrar gasto sem autenticação ou vínculo ao grupo', async () => {
    const res = await request(BASE_URL).post('/api/gastos').send({ ...gastos[0], grupoId });
    expect(res.status).to.equal(401);
  });

  it('Deve registrar gasto em grupo do qual o usuário faz parte', async () => {
    const res = await request(BASE_URL).post('/api/gastos').set('Authorization', `Bearer ${token}`).send({ ...gastos[0], grupoId });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('grupoId', grupoId);
  });

  it('Deve falhar ao registrar gasto com valor menor ou igual a zero', async () => {
    const res = await request(BASE_URL).post('/api/gastos').set('Authorization', `Bearer ${token}`).send({ ...gastos[0], grupoId, valor: 0 });
    expect(res.status).to.equal(400);
  });

  it('Deve registrar gasto com valor maior que zero', async () => {
    const res = await request(BASE_URL).post('/api/gastos').set('Authorization', `Bearer ${token}`).send({ ...gastos[1], grupoId });
    expect(res.status).to.equal(201);
  });

  it('Deve falhar ao registrar gasto sem informações obrigatórias', async () => {
    const res = await request(BASE_URL).post('/api/gastos').set('Authorization', `Bearer ${token}`).send({ grupoId });
    expect(res.status).to.equal(400);
  });
});
