module.exports = function(app, db, mongoose){
    var userModel   = require("./models/user.model.server.js")(db, mongoose);
    var courseModel = require("./models/course.model.server.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, courseModel, userModel);
    var courseService = require("./services/course.service.server.js")(app, courseModel,userModel);

};