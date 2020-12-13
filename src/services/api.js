const axios = require("axios");

const api = axios.create({
  baseURL: 'https://custompay.herokuapp.com/',
});

module.exports = api;
