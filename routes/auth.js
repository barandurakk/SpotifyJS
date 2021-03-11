const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");

module.exports = (app) => {
    app.post("/api/getUserDetails", (req,res) => {

        const token = req.body.token;

        if(token){       
            axios.get("https://api.spotify.com/v1/me", setHeader(token)).then(details => {
                console.log(details.data);
               return res.status(200).send(details.data);
            }).catch(err=>{
                console.error(err);
                res.status(500).send({error: "Something is wrong!"})
            })
        }else{
            res.status(403).send({error: "Token cannot found!"})
        }

    })
};
