require('dotenv').config();
const request = require('supertest');
const BASE_URL = process.env.BASE_URL;

async function getToken(username, password) {
  const res = await request(BASE_URL)
    .post('/api/login')
    .send({ username, password });
  return res.body.token;
}

module.exports = { BASE_URL, getToken, request };

