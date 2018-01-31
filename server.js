const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/client/build`));
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({extended: false}));

require('./server/config/route')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));