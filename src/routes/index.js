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
  response.json({ message: "Sistema Ativo" }));

routes.get('/status', async (request, response) => {
  const status = request.status;

  try {
    if (status == 200)
      return response.status(200).json({
        message: "Operação realizada com sucesso.",
        code: 0,
      });
    else throw ({ status });
  } catch (error) {
    if (error.status == 503) {
      return response.status(503).json({
        message: "Sistema indisponível. Erro ao acessar base de dados.",
        code: 900
      });
    } else {
      return response.status(400).json({
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

    return response.status(200).json({
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
  const status = request.status;

  try {
    if (status == 200)
      return response.status(200).json({
        message: "Operação realizada com sucesso.",
        code: 0,
        authorization_id: 123456,
        balance: {
          amount: 123,
          currency_code: 986
        }
      });
    else throw ({ status });
  } catch (error) {
    console.log(error)
    if (error.status == 400) {
      return response.status(400).json({
        message: "Saldo insuficiente.",
        balance: {
          amount: 123,
          currency_code: 986
        },
        code: 530
      });
    } else if (error.status == 404) {
      return response.status(404).json({
        message: "Número único de conta não encontrado.",
        code: 111
      });
    } if (error.status == 412) {
      return response.status(412).json({
        message: "Saldo insuficiente.",
        balance: {
          amount: 123,
          currency_code: 986
        },
        code: 530
      });
    } else if (error.status == 483) {
      return response.status(483).json({
        message: "MCC Inválido para este cartão.",
        code: 434
      });
    } else if (error.status == 499) {
      return response.status(499).json({
        message: "Mensagem de negação recebida.",
        code: 499
      });
    } else if (error.status == 503) {
      return response.status(503).json({
        message: "Sistema indisponível. Erro ao acessar base de dados.",
        code: 900
      });
    } else {
      return response.status(400).json({
        message: "Não foi possível executar comando. Erro desconhecido.",
        code: 999,
      });
    }
  }
});

routes.post('/purchases/cancel', async (request, response) => {
  const status = request.status;

  try {
    if (status == 200)
      return response.status(200).json({
        message: "Operação realizada com sucesso.",
        code: 0,
        authorization_id: 123456,
        balance: {
          amount: 123,
          currency_code: 986
        }
      });
    else throw ({ status });
  } catch (error) {
    if (error.status == 404) {
      return response.status(404).json({
        message: "Número único de conta não encontrado.",
        code: 111
      });
    } else if (error.status == 409) {
      return response.status(409).json({
        message: "Transação já cancelada.",
        code: 144
      });
    } else if (error.status == 412) {
      return response.status(412).json({
        message: "Saldo insuficiente.",
        balance: {
          amount: 123,
          currency_code: 986
        },
        code: 530
      });
    } else if (error.status == 499) {
      return response.status(499).json({
        message: "Mensagem de negação recebida.",
        code: 499
      });
    } else if (error.status == 503) {
      return response.status(503).json({
        message: "Sistema indisponível. Erro ao acessar base de dados.",
        code: 900
      });
    } else {
      return response.status(400).json({
        message: "Não foi possível executar comando. Erro desconhecido.",
        code: 999,
      });
    }
  }
});

routes.post('/chargebacks', async (request, response) => {
  const status = request.status;

  try {
    if (status == 200)
      return response.status(200).json({
        message: "Operação realizada com sucesso.",
        code: 0,
        authorization_id: 123456,
        balance: {
          amount: 123,
          currency_code: 986
        }
      });
    else throw ({ status });
  } catch (error) {
    if (error.status == 404) {
      return response.status(404).json({
        message: "Número único de conta não encontrado.",
        code: 111
      });
    } else if (error.status == 412) {
      return response.status(412).json({
        message: "Saldo insuficiente.",
        balance: {
          amount: 123,
          currency_code: 986
        },
        code: 530
      });
    } else if (error.status == 499) {
      return response.status(499).json({
        message: "Mensagem de negação recebida.",
        code: 499
      });
    } else if (error.status == 503) {
      return response.status(403).json({
        message: "Sistema indisponível. Erro ao acessar base de dados.",
        code: 900
      });
    } else {
      return response.status(400).json({
        message: "Não foi possível executar comando. Erro desconhecido.",
        code: 999,
      });
    }
  }
});

module.exports = routes;
