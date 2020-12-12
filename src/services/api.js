const axios = require("axios");

const api = axios.create({
  baseURL: 'https://api-hml.paysmart.com.br/paySmart/ps-processadora/v1',
});

module.exports = api;
