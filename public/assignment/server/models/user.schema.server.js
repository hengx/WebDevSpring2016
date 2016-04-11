module.exports = function(mongoose) {
    'use strict';

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phones: [String],
        roles: {
            type: [String],
            default: ['student']
        }
    }, {collection: 'user'});
    return userSchema;
};