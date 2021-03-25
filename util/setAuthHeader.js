module.exports = (token) => {
  let authToken = `Bearer ${token}`;

  let config = {
    headers: {
      Authorization: authToken,
    },
  };

  return config;
};
