const { Router } = require('express');
const api = require('../services/api');

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: "Hello World!" }));

routes.get('/status', async (request, response) => {
  return response.json({
    message: "Operação realizada com sucesso.",
    code: 0
  });
});

routes.post('/purchases', async (request, response) => {
  console.log(request.body);

  return response.json({ ok: "ok" });
});

routes.post('/purchases/cancel', async (request, response) => {
  return response.json({ ok: "ok" });
});

routes.post('//chargebacks', async (request, response) => {
  return response.json({ ok: "ok" });
});

module.exports = routes;
