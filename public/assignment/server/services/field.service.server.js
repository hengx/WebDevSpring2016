module.exports = function (app, formModel) {
    'use strict';

    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormIdAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldId);
    app.post("/api/assignment/form/:formId/field", createNewField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);


    function getFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFieldsByFormId(formId);
        res.json(fields);

    }

    function getFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFormIdAndFieldId(formId, fieldId);
        res.json(field);


    }

    function deleteFieldByFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldByFieldId(formId, fieldId);
        if (fields != null){
            res.json(fields);
            return;
        }
        res.json({message: "Field Failed To Delete"});



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
        if (field != null){
            res.json(field);
            return;
        }
        res.json({message: "Field Update Failed"});


    }

};