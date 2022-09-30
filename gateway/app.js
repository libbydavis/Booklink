const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());

app.use(cors());

app.post('/authenticate', (req, res) => {
    axios.post('http://localhost:4001/authenticate', req.body, {timeout: 5000}).then((response) => {
        if (response.data) {
            res.status(200).send(response.data);
        }
        else {
            res.status(404).send({error: "email and password do not match"});
        }
    }).catch(() => {
        res.status(500).send({error: "network error"});
    })
})

app.post('/register', (req, res) => {
    axios.post('http://localhost:4001/register', req.body).then((response) => {
        res.status(200).send(response.data);
    }).catch(() => {
        res.status(500);
    })
})

app.get('/bookedTimes', (req, res) => {
    axios.get('http://localhost:4002/bookedTimes', {params: {companyID: req.query.company}}).then((response) => {
        res.status(200).send(response.data);
    }).catch(() => {
        res.status(500);
    })
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
