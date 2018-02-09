const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/help_docs';

mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl)
		.then(() => console.log('MongoDB is connecting now!'))
		.catch(err => console.log(err))


const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();


app.set('views', './public/views/pages');
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/client/build`));
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
	name: 'sessionId',
	secret: 'dongchangwei dog pipi',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ 
		mongooseConnection: mongoose.connection,
	})
}))


require('./server/config/route')(app);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));