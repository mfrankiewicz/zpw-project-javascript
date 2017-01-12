const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const server = app.listen(80);
const socket = require('socket.io' )(server);

app.use(express.static(path.join(__dirname, 'html/frontend')));
app.use('/administrator', express.static(path.join(__dirname, 'html/backend')));
app.use('/assets', express.static(path.join(__dirname, 'html/assets')));

require('./routes')(app);
