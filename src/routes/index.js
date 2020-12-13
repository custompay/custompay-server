const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const api = require('../services/api');
const cards = path.resolve(__dirname, '..', '..', 'virtualCard.json');

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

routes.post('/accounts', (request, response) => {
  const data = request.body;

  try {
    return response.sendStatus(200);
  } catch (error) {
    return response.json({ message: error.message });
  }
});

routes.post('/accounts/:id/cards', (request, response) => {
  const data = request.body;
  const psResponseId = request.params.id;

  try {
    const newCards = JSON.parse(fs.readFileSync(cards));
    newCards.push(data);
    fs.writeFileSync(cards, JSON.stringify(newCards));

    return response.json({
      resultData: {
        resultCode: 0,
        resultDescription: "Comando concluído com sucesso",
        psResponseId
      },
      virtualCard: {
        vCardId: "vcrt-faa28e51-9378-4585-ba20-e3bc273c691e",
        vPan: "5092570047467931",
        vCvv: "441",
        vDateExp: "09/27",
        vCardholder: "Fulano dos Santos"
      }
    }
    );
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

routes.post('/purchases', async (request, response) => {
  const { statusCode } = request;
  // const result = await api.post('/purchases')

  // console.log(result.data, result.status);

  if (statusCode === 200) {
    return response.json({
      message: "Operação realizada com sucesso.",
      code: 0,
      authorization_id: 123456,
      balance: {
        amount: 123,
        currency_code: 986
      }
    });
  } else if (statusCode === 400) {
    return response.json({
      message: "Saldo insuficiente.",
      balance: {
        amount: 123,
        currency_code: 986
      },
      code: 530
    });
  } else if (statusCode === 483) {
    return response.json({
      message: "MCC Inválido para este cartão.",
      code: 434
    });
  } else {
    return response.json({
      message: "Não foi possível executar comando. Erro desconhecido.",
      code: statusCode, 
    });
  }
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
