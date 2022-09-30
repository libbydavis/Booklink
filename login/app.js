const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
const cors = require('cors');
const authentication = require('./authenticate.js');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

app.use(bodyParser.json());

app.use(cors());

MongoClient.connect(process.env.MONGOURL).then((client) => {
    app.post('/authenticate',  async (req, res) => {
        let auth = await authentication.authenticate(req.body.email, req.body.password, client);
        res.send(auth);
    });

    app.post('/register', async (req, res) => {
        let registered = await authentication.register(req.body, client);
        if (registered) {
            res.status(200).send(registered);
        }
        else {
            res.status(500).send(registered);
        }
    });

    app.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });
}).catch(err => {
    console.error(err);
});
