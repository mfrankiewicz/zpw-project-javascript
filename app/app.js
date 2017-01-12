const express = require('express');
const app = express();
const server = app.listen(80);

app.get('/', function (req, res) {
    return res.end('/');
});
