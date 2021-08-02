const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const debug = require('debug')('app');
const fireBase = require('firebase-admin');
const homeRouter = require('./routes/homeRouter');
const contactRouter = require('./routes/contactRouter');
const auditionRouter = require('./routes/auditionRouter');
const aboutRouter = require('./routes/aboutRouter');
require('dotenv').config();
const app = express();


const PORT = process.env.PORT;
require('dotenv').config();
app.use(morgan('dev'));

// import * as fireBase from 'firebase-admin'


var fireBaseConfig = {
    apiKey: process.env.Firebase_apiKey,
    authDomain: process.env.Firebase_authDomain,
    projectId: process.env.Firebase_projectId,
    storageBucket: process.env.Firebase_storageBucket,
    messagingSenderId: process.env.Firebase_messagingSenderId,
    appId: process.env.Firebase_appId
};
  // Initialize Firebase
fireBase.initializeApp(fireBaseConfig);

const firestore = fireBase.firestore();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/', homeRouter);
app.use('/contact', contactRouter);
app.use('/audition', auditionRouter);
app.use('/about', aboutRouter);



app.listen(PORT,()=>{
    debug(chalk.blue(`Server up: http//localhost:${PORT}`))
})