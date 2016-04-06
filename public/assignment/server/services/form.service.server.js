module.exports = function (app, formModel) {
    'use strict';

    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findFormsByUserId(userId);
        res.json(forms);


    }

    function findFormByFormId(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormByFormId(formId);
        res.json(form);

    }

    function deleteFormByFormId(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormByFormId(formId);
        res.json(forms);

    }


    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var forms = formModel.createFormForUser(userId, form);
        res.json(forms);

    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var updatedForm = formModel.updateForm(formId, form);
        res.json(updatedForm);


    }
};