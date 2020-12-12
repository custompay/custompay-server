const { Router } = require('express');
const api = require('../services/api');

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: "Hello World!" }));

routes.post('/accounts', async (request, response) => {

  return response.json(result);
});

module.exports = routes;
