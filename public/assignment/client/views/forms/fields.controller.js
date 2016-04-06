(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, UserService, FormService, $routeParams, $scope) {
        var vm = this;
        //var formId = $routeParams.formId;
        //var title = $routeParams.title;

        vm.addField = addField;
        vm.deleteField = deleteField;
        vm.editField = editField;
        vm.updateFields = updateFields;
        vm.saveEditedField = saveEditedField;

        //vm.title = title;
        vm.field = {};


        function init() {
            vm.formId = $routeParams.formId;
            vm.currentUser = UserService.getCurrentUser();
            updateAllFields();
            FormService
                .findFormById(vm.formId)
                .then(function(response){
                    vm.form = response.data;
                });
            //FieldService
            //    .getFieldsForForm(formId)
            //    .then(function (response) {
            //        vm.fields = response.data;
            //    });

        }

        init();

        vm.sortableOptions = $('#sortable').sortable({
            start: vm.dragStart,
            update: vm.dragEnd
        });

        vm.dragStart = function(e, ui) {
            ui.item.data('start', ui.item.index());
        };
        vm.dragEnd = function(e, ui) {
            var start = ui.item.data('start'),
                end = ui.item.index();

            vm.fields.splice(end, 0,
                vm.fields.splice(start, 1)[0]);

            vm.$apply();
        };


        function updateFields(){
            FormService
                .sortFields(vm.formId, vm.fields)
                .then(function(response){
                    vm.fields = response.data.fields;
                });
        }


        function updateAllFields(){
            FieldService
                .getFieldsForForm(vm.formId, vm.fields)
                .then(function(response){
                    vm.fields = response.data.fields;
                });

        }


        function addField(fieldType) {
            if (fieldType == null) return;
            var field = {"type" : fieldType};
            switch (fieldType) {
                case "TEXT":
                    field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    field = {"label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    field = {
                        "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "CHECKBOXES":
                    field = {
                        "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIOS":
                    field = {
                        "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
                default:
                    return;
            }

            FieldService
                .createFieldForForm(vm.formId, field)
                .then(function (response) {
                   vm.fields = response.data;

                });
        }

        function deleteField(fieldId) {
            console.log("field ID");
            console.log(fieldId);
            FieldService
                .deleteFieldFromForm(formId, fieldId)
                .then(function (response) {
                    console.log("delete");
                    console.log(response.data);

                    vm.fields = response.data;
                });
        }


        function editField(fieldId) {

            for (var f in vm.fields){
                if (vm.fields[f]._id === fieldId){
                    break;
                }
            }
            vm.field = {
                _id: vm.fields[f]._id,
                    label: vm.fields[f].label,
                    type: vm.fields[f].type,
                    placeholder: vm.fields[f].placeholder,
                    options: vm.fields[f].options
            };
            if (vm.field.options != null){
                vm.field.optionList = "";
                for (var o in vm.field.options){
                    vm.field.optionList += vm.field.options[o].label.toString()+":" + vm.field.options[o].value.toString()+"\n";
                }
            }
            $("#myModal").modal();


            //$scope.selectedFieldIndex = index;
            //vm.selectedField = {
            //    _id: field._id,
            //    label: field.label,
            //    type: field.type,
            //    placeholder: field.placeholder,
            //    options: field.options
            //};
            //if (field.type === 'OPTIONS' || field.type === 'CHECKBOXES' || field.type === 'RADIOS') {
            //    var optionList = [];
            //    for (var o in field.optionList) {
            //        optionList.push(field.options[o].label + " : " + field.options[o].value + "\n");
            //    }
            //    field.optionList = optionList;
            //}
        }


        function saveEditedField(newField) {
            if (newField.optionList != null){
                var newOptions = [];
                var optLine = vm.field.optionList.split("\n");
                for (var o in optLine){
                    if (optLine[o]){
                        var items = optLine[o].split(":");
                        var option =
                        {
                            "label": items[0],
                            "value": items[1]
                        };
                        newOptions.push(option);
                    }

                }
                newField.options = newOptions;

            }
            FieldService
                .updateField(vm.formId, newField._id, newField)
                .then(function (response){
                    vm.fields = response.data;
                });


            //FieldService
            //    .createFieldForForm(formId, field)
            //    .then(function(newField){
            //        vm.fields.push(newField);
            //    });
        }

            //FormService
            //    .findFormById(formId)
            //    .then(function (response) {
            //        var updatedForm = response.data;
            //        form.fields = $scope.fields;
            //        FormService
            //            .updateFormById(formId, updatedForm);
            //    })

        }






        //for the dialog window

})();