//var mock = require("./form.mock.json");
var q = require("q");
var uuid = require('node-uuid');

module.exports = function (db, mongoose) {
    'use strict';
    var formSchema = require('./form.schema.server.js')(mongoose);
    var fieldSchema = require('./field.schema.server.js')(mongoose);
    var formModel = mongoose.model("formModel", formSchema);
    var fieldModel = mongoose.model("fieldModel", fieldSchema);

    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findFormsByUserId: findFormsByUserId,
        findFormByFormId: findFormByFormId,
        updateForm: updateForm,
        deleteFormByFormId: deleteFormByFormId,
        findFormByTitle: findFormByTitle,


        createField: createField,
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        updateField: updateField,
        deleteFieldByFieldId: deleteFieldByFieldId

    };
    return api;


    function createFormForUser(userId, inputForm) {
        delete inputForm._id;
        var deferred = q.defer();
        var form = {
            userId: userId,
            title: inputForm.title
        };
        formModel
            .create(form, function (err, newForm) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(newForm);
                }
            });
        return deferred.promise;

    }

    function findAllForms(userId) {
        var deferred = q.defer();
        formModel
            .find({userId: userId}, function (err, forms) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(forms);
                }
            });
        return deferred.promise;
    }

    function findFormByFormId(formId) {
        var deferred = q.defer();
        formModel
            .findById(formId, function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;
    }

    function findFormsByUserId(userId) {

        var deferred = q.defer();
        formModel
            .find({userId: userId}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }


    function updateForm(formId, form) {
        var deferred = q.defer();
        delete form._id;
        formModel
            .update({_id: formId}, {$set: form}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;

    }


    function deleteFormByFormId(formId) {
        var deferred = q.defer();
        formModel
            .remove({_id: formId}, function (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;

    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        formModel
            .find({title: title}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

    }


    function createField(formId, field) {
        var deferred = q.defer();
        delete field._id;
        formModel
            .findById(formId, function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newField = form.fields.create(field);
                    form.fields.push(newField);
                    form.save();
                    deferred.resolve(form.fields);
                }

            });
        return deferred.promise;
    }

    function findFieldsByFormId(formId) {
        var deferred = q.defer();
        formModel
            .findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;

    }

    function findFieldByFormIdAndFieldId(formId, fieldId) {
        var deferred = q.defer();
        formModel
            .findFormByFormId(formId, function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form.fields.id(fieldId));
                }
            });
        return deferred.promise;
    }

    function updateField(formId, fieldId, newField) {
        var deferred = q.defer();
        delete newField._id;
        formModel
            .findById(formId, function (err, form){
                if (err){
                    deferred.reject(err);
                } else {
                    for (var f in form.fields){
                        if (form.fields[i]._id === fieldId){
                            form.fields[i].label = newField.label;
                            form.fields[i].type = newField.type;
                            form.fields[i].placeholder = newField.placeholder;
                            form.fields[i].options = newField.options;
                        }
                    }
                    form.save();
                    deferred.resolve(newField);
                }
            });
        return deferred.promise;

    }


    function deleteFieldByFieldId(formId, fieldId) {
        var deferred = q.defer();
        formModel
            .findById(formId, function(err, form){
                if (err){
                    deferred.reject(err);
                } else {
                    for (var f in form.fields){
                        if (form.fields[f]._id  === fieldId){
                            form.fields.splice(f, 1);
                        }
                    }
                    form.save();
                    deferred.resolve(form.fields);
                }
            });
        return deferred.promise;
    }


};