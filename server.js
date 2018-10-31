'use strict'

const express = require('express');
const morgan = require('morgan');

const app = express();

const postRouter = require('./router');

app.use(morgan('common'));

app.use('/blog-posts', postRouter); 

app.listen(process.env.port || 8080, () => console.log(
    `Your app is listening on port ${process.env.PORT || 8080}`));