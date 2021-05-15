const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto-js')
const app = express();
const port = 8081;
const secret = "randomgenerationsecret";

let savedLinks = new Map(); 

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/encode',  (req, res) => {
    const newShorten = req.body.url; 
    var encoded = null;
    if(!savedLinks.has(newShorten)){
        savedLinks[newShorten] = crypto.AES.encrypt(newShorten,secret)
    }
    else{
        encoded = savedLinks.get(savedLinks.indexOf(newShorten));
    }
    res.send(encodedLink, 200);

});

app.post('/decode',  (req, res) => {
    res.redirect(307,CryptoJS.AES.decrypt(req.body, secret));

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));