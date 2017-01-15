module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    mongoose.model('dishes', new Schema({
        dishCategoryId: String,
        label: String,
        price: Number,
        description: String,
        photos: [String],
        available: Boolean
    }));

    mongoose.model('dish_categories', new Schema({
        label: String
    }));

    mongoose.model('dish_ratings', new Schema({
        dishId: String,
        rating: Number
    }));

    mongoose.model('dish_comments', new Schema({
        dishId: String,
        author: String,
        comment: String,
        dateAdded: Number
    }));

    mongoose.model('tables', new Schema({
        number: Number,
        seats: Number
    }));

    mongoose.model('reservations', new Schema({
        tableId: String,
        date: Number,
        dishes: [String],
        firstname: String,
        lastname: String,
        phone: String,
        email: String
    }));

    mongoose.model('users', new Schema({
        email: String,
        password: String,
        type: Number
    }));

    mongoose.model('user_sessions', new Schema({
        userId: String
    }));

    return {
        Dish:           mongoose.model('dishes'),
        DishCategory:   mongoose.model('dish_categories'),
        DishRating:     mongoose.model('dish_ratings'),
        DishComment:    mongoose.model('dish_comments'),
        Table:          mongoose.model('tables'),
        Reservation:    mongoose.model('reservations'),
        User:           mongoose.model('users'),
        UserSession:    mongoose.model('user_sessions')
    };
}
