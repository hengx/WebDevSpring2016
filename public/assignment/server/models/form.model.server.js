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
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
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
        return newForm;
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
            }
        }
        return resultForms;
    }


    function updateForm(formId, newForm) {
        var index = -1;

        for (var m in mock) {
            if (mock[m]._id === formId) {
                index = m;
            }
        }
        if (index != -1){
            mock[index] = {
                _id: formId,
                title: newForm.title,
                userId: newForm.userId,
                fields: newForm.fields
            };
            return mock[index]
        }
        return null;
    }


    function deleteFormByFormId(formId) {
        var index = -1;
        for (var m in mock) {
            if (mock[m]._id === formId) {
                index = m;
                break;
            }
        }
        if (index != -1){
            mock.splice(index, 1);
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
            return field;
        }
    }

    function findFieldsByFormId(formId) {
        var form = findFormByFormId(formId);
        if (form != null){
            return form.fields;
        }
        return null;

    }

    function findFieldByFormIdAndFieldId(formId, fieldId) {
        var form = findFormByFormId(formId);
        if (form != null){
            for (var f in form) {
                if (form[f]._id === fieldId) {
                    return form[f];
                }
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
                    return form.fields[f];
                }
            }
        }
        return null;

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
            return form.fields;
        }
        return null;

    }
};