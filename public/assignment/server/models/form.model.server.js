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


        //var newForm = {
        //    _id: uuid.v4(),
        //    title: form.title,
        //    userId: userId,
        //    fields: form.fields
        //};
        //mock.push(newForm);
        //return newForm;
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
        //return mock;
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


        //for (var m in mock) {
        //    if (mock[m]._id === formId) {
        //        return mock[m];
        //    }
        //}
        //return null;
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

        //var resultForms = [];
        //for (var m in mock) {
        //    if (mock[m].userId === userId) {
        //        resultForms.push(mock[m]);
        //    }
        //}
        //return resultForms;
    }


    function updateForm(formId, form) {
        var deferred = q.defer();
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


    //var index = -1;
    //
    //for (var m in mock) {
    //    if (mock[m]._id === formId) {
    //        index = m;
    //    }
    //}
    //if (index != -1){
    //    mock[index] = {
    //        _id: formId,
    //        title: newForm.title,
    //        userId: newForm.userId,
    //        fields: newForm.fields
    //    };
    //    return mock[index]
    //}
    //return null;


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


        //var index = -1;
        //for (var m in mock) {
        //    if (mock[m]._id === formId) {
        //        index = m;
        //        break;
        //    }
        //}
        //if (index != -1) {
        //    mock.splice(index, 1);
        //}
        //return mock;
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


        //for (var m in mock) {
        //    if (mock[m].title === title) {
        //        return mock[m];
        //    }
        //}
        //return null;
    }


    function createField(formId, field) {
        var deferred = q.defer();
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


        //field._id = uuid.v4();
        //var form = findFormByFormId(formId);
        //
        //if (form != null) {
        //    if (form.fields == null) {
        //        form.fields = [];
        //    }
        //    form.fields.push(field);
        //    return field;
        //}
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

        //var form = findFormByFormId(formId);
        //if (form != null){
        //    return form.fields;
        //}
        //return null;

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
        //var form = findFormByFormId(formId);
        //if (form != null){
        //    for (var f in form) {
        //        if (form[f]._id === fieldId) {
        //            return form[f];
        //        }
        //    }
        //}
        //return null;
    }

    function updateField(formId, fieldId, newField) {
        var deferred = q.defer();
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


        //var field = findFieldByFormIdAndFieldId(formId, fieldId);
        //field._id = newField._id;
        //field.label = newField.label;
        //field.type = newField.type;
        //field.placeholder = newField.placeholder;
        //field.options = newField.options;
        //return field;
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

        //var form = findFormByFormId(formId);
        //if (form.fields != null) {
        //    for (var f in form.fields) {
        //        if (form.fields[f]._id === fieldId) {
        //            form.fields.splice(f, 1);
        //            break;
        //        }
        //    }
        //    return form.fields;
        //}
        //return null;

    }


};