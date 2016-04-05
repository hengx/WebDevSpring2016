var mock = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function () {
    'use strict';
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
        findFieldByFieldId: findFieldByFormIdAndFieldId,
        updateField: updateField,
        deleteFieldByFieldId: deleteFieldByFieldId


    };
    return api;


    function createFormForUser(userId, form) {
        var newForm = {
            _id: uuid.v4(),
            title: form.title,
            userId: userId,
            fields: form.fields
        };
        mock.push(newForm);
        return mock;
    }

    function findAllForms() {
        return mock;
    }

    function findFormByFormId(formId) {
        for (var m in mock) {
            if (mock[m]._id === formId) {
                return mock[m];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        var resultForms = [];
        for (var m in mock) {
            if (mock[m].userId === userId) {
                resultForms.push(mock[m]);
                break;
            }
        }
        return resultForms;
    }


    function updateForm(formId, newForm) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                mock[m].title = newForm.title;
                mock[m].userId = newForm.userId;
                mock[m].fields = newForm.fields;
                return mock[m];
            }
        }
        return null;
    }


    function deleteFormByFormId(formId) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                mock.splice(m, 1);
                break;
            }
        }
        return mock;
    }

    function findFormByTitle(title) {
        for (var m in mock) {
            if (mock[m].title === title) {
                return mock[m];
            }
        }
        return null;
    }



    function createField(formId, field) {
        field._id = uuid.v4();
        var form = findFormByFormId(formId);

        if (form != null) {
            if (form.fields == null) {
                form.fields = [];
            }
            form.fields.push(field);
            return form.fields;

        }
    }

    function findFieldsByFormId(formId) {
        var form = findFormByFormId(formId);
        return form.fields;
    }

    function findFieldByFormIdAndFieldId(formId, fieldId) {
        var form = findFormByFormId(formId);
        for (var f in form) {
            if (form[f]._id === fieldId) {
                return form[f];
            }
        }
        return null;
    }

    function updateField(formId, fieldId, newField) {
        var form = findFormByFormId(formId);
        if (form.fields != null) {
            for (var f in form.fields) {
                if (form.fields[f]._id === fieldId) {
                    form.fields[f] = newField;
                    break;
                }
            }

        }
        return form.fields;
    }


    function deleteFieldByFieldId(formId, fieldId) {
        var form = findFormByFormId(formId);
        if (form.fields != null) {
            for (var f in form.fields) {
                if (form.fields[f]._id === fieldId) {
                    form.fields.splice(f, 1);
                    break;
                }
            }

        }
        return form.fields;
    }
};