module.exports = function (app, formModel) {
    'use strict';

    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormIdAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldId);
    app.post("/api/assignment/form/:formId/field", createNewField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);


    function getFieldsByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .findFieldsByFormId(formId)
            .then (function(fields){
                res.json(fields);
            });


    }

    function getFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .findFieldByFormIdAndFieldId(formId, fieldId)
            .then(function(field){
                res.json(field);
            });



    }

    function deleteFieldByFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .deleteFieldByFieldId(formId, fieldId)
            .then (function (fields){
                res.json(fields);
            });

    }

    function createNewField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel
            .createField(formId, field)
            .then (function(newField){
                res.json(newField);
            });

    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        formModel
            .updateField(formId, fieldId, newField)
            .then (function(field){
                res.json(field);
            });

    }

};