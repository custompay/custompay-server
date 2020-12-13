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
  try {
    return response.json({
      message: "Operação realizada com sucesso.",
      code: 0,
    }).status(200);
  } catch (error) {
    if (error.statusCode == 503) {
      return response.json({
        message: "Sistema indisponível. Erro ao acessar base de dados.",
        code: 900
      }).status(503);
    } else {
      return response.json({
        message: "Não foi possível executar comando. Erro desconhecido.",
        code: 999,
      });
    }
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
  try {
    return response.json({
      message: "Operação realizada com sucesso.",
      code: 0,
      authorization_id: 123456,
      balance: {
        amount: 123,
        currency_code: 986
      }
    }).status(200);
  } catch (error) {
    if (error.statusCode == 400) {
      return response.json({
        message: "Saldo insuficiente.",
        balance: {
          amount: 123,
          currency_code: 986
        },
        code: 530
      }).status(412);
    } else if (error.statusCode == 404) {
      return response.json({
        message: "Número único de conta não encontrado.",
        code: 111
      }).status(404);
    } if (error.statusCode == 412) {
      return response.json({
        message: "Saldo insuficiente.",
        balance: {
          amount: 123,
          currency_code: 986
        },
        code: 530
      }).status(412);
    } else if (error.statusCode == 483) {
      return response.json({
        message: "MCC Inválido para este cartão.",
        code: 434
      }).status(483);
    } else if (error.statusCode == 499) {
      return response.json({
        message: "Mensagem de negação recebida.",
        code: 499
      }).status(499);
    } else if (error.statusCode == 503) {
      return response.json({
        message: "Sistema indisponível. Erro ao acessar base de dados.",
        code: 900
      }).status(503);
    } else {
      return response.json({
        message: "Não foi possível executar comando. Erro desconhecido.",
        code: 999,
      });
    }
  }
});

routes.post('/purchases/cancel', async (request, response) => {
  try {
    return response.json({
      message: "Operação realizada com sucesso.",
      code: 0,
      authorization_id: 123456,
      balance: {
        amount: 123,
        currency_code: 986
      }
    }).status(200);
  } catch (error) {
    if (error.statusCode == 404) {
      return response.json({
        message: "Número único de conta não encontrado.",
        code: 111
      }).status(404);
    } else if (error.statusCode == 409) {
      return response.json({
        message: "Transação já cancelada.",
        code: 144
      }).status(409);
    } else if (error.statusCode == 412) {
      return response.json({
        message: "Saldo insuficiente.",
        balance: {
          amount: 123,
          currency_code: 986
        },
        code: 530
      }).status(412);
    } else if (error.statusCode == 499) {
      return response.json({
        message: "Mensagem de negação recebida.",
        code: 499
      }).status(499);
    } else if (error.statusCode == 503) {
      return response.json({
        message: "Sistema indisponível. Erro ao acessar base de dados.",
        code: 900
      }).status(503);
    } else {
      return response.json({
        message: "Não foi possível executar comando. Erro desconhecido.",
        code: 999,
      });
    }
  }
});

routes.post('/chargebacks', async (request, response) => {
  try {
    return response.json({
      message: "Operação realizada com sucesso.",
      code: 0,
      authorization_id: 123456,
      balance: {
        amount: 123,
        currency_code: 986
      }
    }).status(200);
  } catch (error) {
    if (error.statusCode == 404) {
      return response.json({
        message: "Número único de conta não encontrado.",
        code: 111
      }).status(404);
    } else if (error.statusCode == 412) {
      return response.json({
        message: "Saldo insuficiente.",
        balance: {
          amount: 123,
          currency_code: 986
        },
        code: 530
      }).status(412);
    } else if (error.statusCode == 499) {
      return response.json({
        message: "Mensagem de negação recebida.",
        code: 499
      }).status(499);
    } else if (error.statusCode == 503) {
      return response.json({
        message: "Sistema indisponível. Erro ao acessar base de dados.",
        code: 900
      }).status(503);
    } else {
      return response.json({
        message: "Não foi possível executar comando. Erro desconhecido.",
        code: 999,
      });
    }
  }
});

module.exports = routes;
