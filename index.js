const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

mongoose.connect(config.databaseDev, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

// Connexion a la base de données
db.on('connected', () => {
    console.log(`Connected to database ${config.databaseDev}`);
    
});

db.on('error', (err) => {
    console.error(`Erreur : ${err}`);
    
});

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 24828;

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
