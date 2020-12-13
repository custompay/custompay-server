const authorizationId = () => {
  let random;

  do {
    random = Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);
  } while (random < 100000 && random < 999999);

  return random;
};

module.exports = authorizationId;
