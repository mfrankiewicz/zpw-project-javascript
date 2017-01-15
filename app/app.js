const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware')
const app = express();
const server = app.listen(80);
const socket = require('socket.io' )(server);


app.use(sassMiddleware({
    src: path.join(__dirname, 'assets/sass'),
    dest: path.join(__dirname, 'html/assets/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/assets/css'
}));
app.use(express.static(path.join(__dirname, 'html/frontend')));
app.use('/administrator', express.static(path.join(__dirname, 'html/backend')));
app.use('/assets', express.static(path.join(__dirname, 'html/assets')));

app.use(bodyParser.json())
app.use(cookieParser());

require('./routes')(app, socket);
