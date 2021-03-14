const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");

module.exports = (app) => {
  app.post("/api/getUserDetails", (req, res) => {
    const token = req.body.token;
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", setHeader(token))
        .then((details) => {
          return res.status(200).send(details.data);
        })
        .catch((err) => {
          if (err.response.status === 401) res.status(401).send({ error: "Invalid Token" });
          return res.status(500).send({ error: "Something is wrong!" });
        });
    } else {
      return res.status(403).send({ error: "Token cannot found!" });
    }
  });
};
