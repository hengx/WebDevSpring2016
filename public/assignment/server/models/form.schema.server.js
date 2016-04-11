module.exports = function (mongoose) {
    'use strict';

    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var formSchema = mongoose.Schema({
        userId: String,
        title: {
            type: String,
            default: 'New Form'
        },
        fields: [fieldSchema],
        created: {
            type: Date,
            default: Date.now()
        },
        updated: {
            type: Date,
            default: Date.now()
        }
    }, {collection: 'form'});
    return formSchema;
};