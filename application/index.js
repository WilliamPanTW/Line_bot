const dotenv = require("dotenv");
dotenv.config({ path: './application/.env' });
const express = require('express');
const line = require('@line/bot-sdk');

const {  handleEvent} = require('./handlers/handler'); 

const app = express();
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent)) // Use handleEvent from handler.js
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port", process.env.PORT || 3000);
});
