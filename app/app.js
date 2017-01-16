const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const server = app.listen(80);
const socket = require('socket.io' )(server);
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb:27017/zpw');

const models = require('./models')(mongoose);

app.use(bodyParser.json())
app.use(cookieParser());

require('./gulp-tasks')();
require('./routes')(app, express, socket, path, models);
