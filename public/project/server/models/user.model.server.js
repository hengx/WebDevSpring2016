var mock = require("./user.mock.json");

//load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function() {

    //load user schema

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds

    };
    return api;


    function findUsersByIds(userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById(userIds[u]);
            if (user) {
                users.push({
                    username: user.username,
                    _id: user._id,
                });
            }
        }
        return users;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        //use q to defer the response
        var deferred = q.defer();

        //insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {
            if (err) {
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });

        //return a promise
        return deferred.promise;
        //user._id = "ID_" + (new Date()).getTime();
        //mock.push(user);
        //return user;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        //find one retrieve one document

        UserModel.findOne(
            //first argument is predictate
            {
                username: credentials.username,
                password: credentials.password
            },

            //doc is unique instance matches predicate
            function (err, doc) {
                if (err) {
                    //reject promise if error
                    deferred.reject(err);
                } else {
                    //resolve promise
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

    }

    //    for (var u in mock){
    //        if (mock[u].username === credentials.username && mock[u].password === credentials.password){
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}
};