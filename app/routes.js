const md5 = require('md5');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb:27017/zpw');

const models = require('./models')(mongoose);

module.exports = function(app){
    app.get('/dbmigration/e4dc0c36d021c2d98ed390ad76e66967', function(req, res){
        models.User({
            email: "test1232@test.pl",
            password: "test",
            type: 2
        }).save();

        return res.end();
    });
}
