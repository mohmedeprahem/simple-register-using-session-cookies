// requirement modules
const express = require(`express`);
const app = express();
const ejs = require(`ejs`);
const path = require(`path`);
const session = require(`express-session`)
const bodyParser = require('body-parser');
const mongoose = require(`mongoose`);
const MongoDBStore = require('connect-mongodb-session')(session);

// save data of session in mongodb
const store = new MongoDBStore({
  uri: 'mongodb://localhost/cookisProject',
  collection: 'session'
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// active session
app.use(session({secret:`my secret`, resave:false, saveUninitialized:false, store:store}));


// access to tamplate engine
app.set(`views`, path.join(__dirname,`view`));
app.set(`view engine`, `ejs`);

// maddleware of routes
const auth = require(`./routes/auth`);
const errorPage = require(`./routes/pageError`)
const list = require(`./routes/list`);

app.use((req, res, next) => {
  req.x = false;
  next();
})
app.use(auth);
app.use(list);
app.use(errorPage);




mongoose.connect('mongodb://localhost/cookisProject', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connecting to database....'))
.catch(err => console.log(err))

// add listener
app.listen(3000, () => console.log(`connect to port 3000...`));


