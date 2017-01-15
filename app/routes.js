const md5 = require('md5');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb:27017/zpw');

const models = require('./models')(mongoose);

module.exports = function(app, socket){

    /**
     * /dishes
     */
    app.get('/dishes', function(req, res){
        models.Dish.find().lean().exec(function (err, data) {
            return res.end(JSON.stringify(data));
        });
    });

    app.get('/dishes/:dishId', function(req, res){
        models.Dish.find({ _id:req.params.dishId }).lean().exec(function (err, data) {
            return res.end(JSON.stringify(data));
        });
    });

    /**
     * /dish-categories
     */
     app.get('/dish-categories', function(req, res){
         models.DishCategory.find().lean().exec(function (err, data) {
             return res.end(JSON.stringify(data));
         });
     });

    /**
     * dish-ratings
     */
     app.get('/dish-ratings/:dishId', function(req, res){
         models.DishRating.find({ dishId:req.params.dishId }).lean().exec(function (err, data) {
             return res.end(JSON.stringify(data));
         });
     });

     app.post('/dish-ratings', function(req, res){
         models.DishRating({
             dishId: req.body.dishId,
             rating: req.body.rating
         }).save(function(){
             return res.end();
         });
     });

     /**
      * dish-comments
      */
      app.get('/dish-comments/:dishId', function(req, res){
          models.DishComment.find({ dishId:req.params.dishId }).sort([['dateAdded', 'descending']]).lean().exec(function (err, data) {
              return res.end(JSON.stringify(data));
          });
      });

      app.post('/dish-comments', function(req, res){
          models.DishComment({
                dishId: req.body.dishId,
                author:req.body.author,
                comment: req.body.comment,
                dateAdded: req.body.dateAdded
          }).save(function(){
              socket.sockets.send('DishCommentAdded');
              return res.end();
          });
      });

     /**
      * Dev
      */
    app.get('/dbmigration/e4dc0c36d021c2d98ed390ad76e66967', function(req, res){
        models.User({
            email: "michal@frankiewicz.me",
            password: md5("secret"),
            type: 1
        }).save();

        models.Table({
            number: 1,
            seats: 2
        }).save();

        models.Table({
            number: 2,
            seats: 4
        }).save();

        models.Table({
            number: 3,
            seats: 2
        }).save();

        models.Table({
            number: 4,
            seats: 4
        }).save();

        models.Table({
            number: 5,
            seats: 3
        }).save();

        models.Table({
            number: 6,
            seats: 2
        }).save();

        models.DishCategory({
            label: "Przystawki ciepłe",
        }).save(function(err, model) {
            dishCategoryId = arguments[1]._id;

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Pierogi w trzech smakach",
                price: 38.00,
                description: "z farszem z dzikiego ptactwa; ze szpinakiem i dynią; z serem ricotta i kurkami, podane na tafli sosu z borowików",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Dzik marynowany",
                price: 54.00,
                description: "w czerwonym winie z leśnymi grzybami  i świeżym rozmarynem, podany w czarce razowej",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Foie gras",
                price: 86.00,
                description: "z gęsiej wątróbki z karmelizowanymi jabłkami i tostem paryskim w towarzystwie sosu figowego",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

        });

        models.DishCategory({
            label: "Przystawki zimne",
        }).save(function(err, model) {
            dishCategoryId = arguments[1]._id;

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Śledź w duecie",
                price: 36.00,
                description: "smażony i marynowany w occie oraz marynowany w sherry",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Sałatka z perliczką",
                price: 48.00,
                description: "i marynowaną dynią",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Kawior",
                price: 420.00,
                description: "z tradycyjnymi blinami, kwaśną śmietaną i marynowanym łososiem oraz jajkiem przepiórczym",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Tatar z polędwicy wołowej",
                price: 56.00,
                description: "serwowany tradycyjnie z borowikiem, musztardą i jajkiem przepiórczym",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();
        });

        models.DishCategory({
            label: "Zupy",
        }).save(function(err, model) {
            dishCategoryId = arguments[1]._id;

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Krem z pieczonego buraka",
                price: 26.00,
                description: "z musem z koziego sera",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Aksamitny krem z dyni",
                price: 28.00,
                description: "z truflową nutą i siankiem z pora",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Consommé z perliczki",
                price: 32.00,
                description: "z domowym makaronem",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Consommé grzybowe",
                price: 38.00,
                description: "z pierożkami cielęcymi i foie gras",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();
        });

        models.DishCategory({
            label: "Dania główne",
        }).save(function(err, model) {
            dishCategoryId = arguments[1]._id;

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Roladka z koźlaka podhalańskiego",
                price: 89.00,
                description: "w sosie jałowcowym w towarzystwie modrej kapusty i aksamitnego purée z selera",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Złocista pierś z bażanta",
                price: 112.00,
                description: "ze smażonymi ziemniaczkami, bobem i foie gras, podana na sosie Porto",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Comber z sarny",
                price: 148.00,
                description: "podany na podgrzybkach i kapuście włoskiej z dodatkiem pomidorków Concasse i sosu ze starego wina",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Połowa pieczonej kaczki",
                price: 96.00,
                description: "podana z karmelizowanymi buraczkami  i muślinowym purée ziemniaczanym oraz sosem z czarnej porzeczki",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Bistecca z polędwicy wołowej ",
                price: 124.00,
                description: "podana ze strudlem ziemniaczanym i smażonym szpinakiem z dodatkiem sosu balsamiczno – miodowego",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();
        });

        models.DishCategory({
            label: "Dania rybne",
        }).save(function(err, model) {
            dishCategoryId = arguments[1]._id;

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Pieczony sandacz",
                price: 89.00,
                description: "podany na risotto barwionym atramentem z kałamarnic z dodatkiem sosu z kopru włoskiego oraz Martini",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Filet z jesiotra",
                price: 112.00,
                description: "podany na soczewicy duszonej w pomidorach z dodatkiem krewetek i sosu maślanego",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();
        });

        models.DishCategory({
            label: "Desery",
        }).save(function(err, model) {
            dishCategoryId = arguments[1]._id;

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Strudel jabłkowy",
                price: 26.00,
                description: "z sosem waniliowym i lodami lipowymi",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Suflet czekoladowy",
                price: 28.00,
                description: "podany na sosie malinowym",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();

            models.Dish({
                dishCategoryId: dishCategoryId,
                label: "Lody z karmelizowanych w miodzie borowików",
                price: 38.00,
                description: "na „ziemi” czekoladowo-orzechowej z sosem z czarnej porzeczki",
                photos: [
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300',
                    'http://placehold.it/400x300'
                ],
                available: true
            }).save();
        });

        return res.end();
    });
}
