var express    = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');
//const config = require('./config/database');
const app = express();

mongoose.connect(config.database)
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+ err);
});

// Set port
var port = process.env.PORT || 8787;        // set the port
// CORS Middleware
app.use(cors());
// Express app will use body-parser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


const users = require('./routes/users');
const places = require('./routes/places');
app.use('/api', [users, places]);

app.use('/', express.static("./"));


app.get('/',function(request,response){
    response.sendFile(path.resolve(__dirname + '/www/index.html'));
});

app.listen(port);
console.log('RESTAPI listening on port: ' + port);