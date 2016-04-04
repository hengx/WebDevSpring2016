var mock = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function () {
    'use strict';
    var api = {
        findFormByTitle: findFormByTitle,
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findFormByFormId: findFormByFormId,
        findFormsByUserId: findFormsByUserId,
        updateForm: updateForm,
        deleteFormByFormId: deleteFormByFormId,

        findFieldsByFormId: findFieldsByFormId,
        findFieldByFieldId: findFieldByFieldId,
        deleteFieldByFieldId: deleteFieldByFieldId,
        createField: createField,
        updateField: updateField

    };
    return api;


    function findFormByTitle(title) {
        for (var m in mock) {
            if (mock[m].title === title) {
                return mock[m];
            }
        }
        return null;
    }

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


    function updateForm(formId, newForm) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                mock[m].title = newForm.title;
                mock[m].userId = newForm.userId;
                mock[m].fields = newForm.fields;
                break;
            }

        }
        return mock;
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

    function deleteFormByFormId(formId) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                mock.splice(m, 1);
                break;
            }
        }
        return mock;
    }


    function findFieldsByFormId(formId) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                return mock[m].fields;
            }

        }
        return null;

    }

    function findFieldByFieldId(formId, fieldId) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                for (var f in mock[m].fields) {
                    if (mock[m].fields[f] === fieldId) {
                        return mock[m].fields[f];

                    }
                }
            }

        }
        return null;
    }


    function deleteFieldByFieldId(formId, fieldId) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                for (var f in mock[m].fields) {
                    if (mock[m].fields[f]._id === fieldId) {
                        mock[m].fields.splice(f, 1);
                        break;
                    }
                }
            }
        }
        return mock;

    }


    function createField(formId, field) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                field._id = uuid.v4();
                mock[m].fields.push(field);
                return mock[m].fields[f];
            }

        }
        console.log("Create Field Failed");
        return null;
    }


    function updateField(formId, fieldId, newField) {

        for (var m in mock) {
            if (mock[m]._id === formId) {
                for (var f in mock[m].fields) {
                    if (mock[m].fields[f] === fieldId) {
                        mock[m].fields[f] = newField;
                        console.log("update field");
                        console.log(newField);
                        console.log(mock[m].fields[f]);
                        return mock[m].fields[f];
                    }

                }
            }
        }
        return null;
    }

};