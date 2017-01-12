module.exports = function(app){
    app.get('/', function(req, res){
        return res.end('/');
    });
}
