const express = require('express');
const app = express();
const port = process.env.PORT || 4002;
const cors = require('cors');
const bookingInfo = require('./bookingInfo');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

app.use(bodyParser.json());

app.use(cors());

MongoClient.connect(process.env.MONGOURL).then((client) => {
    app.get('/bookedTimes', async (req, res) => {
        let bookedTimes = await bookingInfo.getBookedTimes(req.query.companyID, client);
        if (bookedTimes) {
            res.status(200).send(bookedTimes);
        } else {
            res.status(500);
        }
    })

    app.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });
}).catch(err => {
    console.error(err);
});
