/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('./app');

describe('Health check for server', () => {
  test('A GET request to / should have a status code of 200', async () => {
    await supertest(app).get('/health-check').expect(200);
  });
});
