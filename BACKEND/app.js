const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto-js');
const { response } = require('express');

const app = express();
const port = 8081;

let savedLinks = new Map(); 

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Simple url encoding API');

});

app.post('/encode',  (req, res) => {
    try{
        new URL(req.body.url);
    } catch(_){
        res.sendStatus(404).end()
        return;
    }

    var shaurl = crypto.SHA1(req.body.url);
    var buffer = Buffer.from(shaurl.toString(),'utf8');
    var encoded = buffer.toString('base64').substring(0,7)

    if(!savedLinks.has(encoded)){
        savedLinks.set(encoded, req.body.url); 
    }
    
    res.status(200).send(encoded).end();

});

app.post('/decode',  (req, res) => {
    if(req.body.url){
        var decoded = savedLinks.get(req.body.url); 
    }
    if(decoded){
        res.status(200).send(decoded);
    }
    else{
        res.sendStatus(404).end();
        return;
    }

});

app.get('/*' , (req, res) => {
    var decoded = null;
    console.log(req.params[0]);
    if(!req.params[0]){
        res.sendStatus(404).end();
        return;
    }
    else if(savedLinks.has(req.params[0])){
        decoded = savedLinks.get(req.params[0]); 
    }
    else if(!(decoded.includes("http://") || decoded.includes("https://")) ){
        decoded = "https://" + decoded;
    }

    res.setTimeout(5000);
    res.redirect(decoded);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));