
require('dotenv').config();
const request = require('supertest');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function getToken(username, password) {
  const res = await request(BASE_URL)
    .post('/api/login')
    .send({ username, password });
  return res.body.token;
}

module.exports = { BASE_URL, getToken, request };



module.exports = { BASE_URL, getToken, request };module.exports = { BASE_URL, getToken, request };


