module.exports = function (app, formModel) {
    'use strict';

    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel
            .findFormsByUserId(userId)
            .then(function (forms) {
                res.json(forms);
            });

    }

    function findFormByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .findFormByFormId(formId)
            .then(function (form) {
                res.json(form);
            });
    }

    function deleteFormByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormByFormId(formId)
            .then(function (forms) {
                res.json(forms);
            });

    }


    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel
            .createFormForUser(userId, form)
            .then(function (newForm) {
                res.json(newForm);
            });

    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel
            .updateForm(formId, form)
            .then(function (updatedForm) {
                res.json(updatedForm);
            });

    }
};