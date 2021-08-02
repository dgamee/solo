const express = require('express');
const router = express.Router();
const debug = require('debug')('app');
const chalk = require('chalk');
require('dotenv').config();
const key = process.env.PRIVATE_KEY;

router.get('/',(req,res)=>{
    res.status(200).render('./audition-form/audition',{key})
});



module.exports = router