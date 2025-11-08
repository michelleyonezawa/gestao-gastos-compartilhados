const { expect } = require('chai');
const { request, BASE_URL, getToken } = require('../helpers');
const usuarios = require('../fixtures/usuario.json');
const grupos = require('../fixtures/grupo.json');
const gastos = require('../fixtures/gasto.json');

describe('JIRA-5: Visualização de Gastos do Grupo', () => {
  let token;
  let grupoId;

  before(async () => {
    await request(BASE_URL).post('/api/register').send(usuarios[0]);
    token = await getToken(usuarios[0].username, usuarios[0].password);
    const grupoRes = await request(BASE_URL).post('/api/grupos').set('Authorization', `Bearer ${token}`).send(grupos[0]);
    grupoId = grupoRes.body.id;
    await request(BASE_URL).post('/api/gastos').set('Authorization', `Bearer ${token}`).send({ ...gastos[0], grupoId });
  });

  it('Deve falhar ao visualizar gastos de grupo não pertencente', async () => {
    const res = await request(BASE_URL).get('/api/gastos').set('Authorization', `Bearer invalidtoken`);
    expect(res.status).to.equal(401);
  });

  it('Deve exibir lista de gastos de grupo pertencente', async () => {
    const res = await request(BASE_URL).get('/api/gastos').set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  // Para detalhes e totais, seria necessário endpoint específico na API
});
