const { Router } = require('express');
const api = require('../services/api');

const routes = Router();

const authorizationId = () => {
  let random;

  do {
    random = Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);
  } while (random < 100000 && random < 999999);

  return random;
};

routes.get('/', (request, response) =>
  response.json({ message: "Hello World!" }));

routes.get('/status', async (request, response) => {
  return response.json({
    message: "Operação realizada com sucesso.",
    code: 0
  });
});

routes.get('/purchases', async (request, response) => {
  const { total_amount, } = request.body;
  
  const { data } = await api.post('/purchases');
  console.log(data);

  return response.json({
    message: "Operação realizada com sucesso.",
    code: 0,
    authorization_id: authorizationId(),
    balance: {
      amount: 123,
      currency_code: 986
    }
  });
});

routes.post('/purchases/cancel', async (request, response) => {
  return response.json({
    message: "Operação realizada com sucesso.",
    code: 0,
    authorization_id: authorizationId(),
    balance: {
      amount: 123,
      currency_code: 986
    }
  });
});

routes.post('/chargebacks', async (request, response) => {
  return response.json({
    message: "Operação realizada com sucesso.",
    code: 0,
    authorization_id: authorizationId(),
    balance: {
      amount: 123,
      currency_code: 986
    }
  });
});

module.exports = routes;
