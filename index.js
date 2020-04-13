const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

mongoose.connect(config.database);

var db = mongoose.connection;

// Connexion a la base de données
db.on('connected', () => {
    console.log(`Connected to database ${config.database}`);
    
});

db.on('error', (err) => {
    console.error(`Erreur : ${err}`);
    
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// app.get('/', (req, res) => {
//     res.send('Invalid Endpoint');
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
