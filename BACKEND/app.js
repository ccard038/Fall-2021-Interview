const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto-js');
const { response } = require('express');
var base62 = require('base62/lib/ascii');

const app = express();
const port = 8081;
const secret = "randomgenerationsecret";

let savedLinks = new Map(); 

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/encode',  (req, res) => {
    var shaurl = crypto.SHA1(req.body.url);
    var buffer = Buffer.from(shaurl.toString(),'utf8');
    var encoded = buffer.toString('base64').substring(0,7); 

    if(!savedLinks.has(encoded)){
        savedLinks.set(encoded, req.body.url); 
        //savedLinks[encoded] = req.body.url;
    }
    res.status(200).send(encoded);

});

//might be better to put this one just as a get with paratmeters, same for the encode endpoint...
app.post('/decode',  (req, res) => {
    decoded = savedLinks.get(req.body.url); 
    res.status(200).send(decoded);

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));