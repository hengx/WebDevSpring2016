module.exports = function(app){

    var userModel = require("./models/user.model.server.js")(app);
    var formModel = require("./models/form.model.server.js")(app);


    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};