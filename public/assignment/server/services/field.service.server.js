module.exports = function (app, formModel) {
    'use strict';

    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldId);
    app.post("/api/assignment/form/:formId/field", createNewField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);


    function getFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.getFieldsByFormId(formId);
        res.json(fields);


    }

    function getFieldByFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFieldId(formId, fieldId);
        res.json(field);


    }

    function deleteFieldByFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldByFieldId(formId, fieldId);
        res.json(fields);


    }

    function createNewField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var field = formModel.createField(formId, field);
        res.json(field);


    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        var field = formModel.updateField(formId, fieldId, newField);
        res.json(field);

    }

};