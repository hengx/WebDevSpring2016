(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, $routeParams) {
        var vm = this;
        var formId = $routeParams.formId;

        vm.addField = addField;
        vm.deleteField = deleteField;
        vm.editField = editField;
        vm.saveEditedField = saveEditedField;


        function init() {

            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    vm.fields = response.data;
                });

        }

        init();

        vm.sortableOptions = {
            'ui-floating': true,
            update: function (e, ui) {
            },
            axis: 'y'

        };


        function addField(fieldType) {
            var field = null;
            switch (fieldType) {
                case "SINGLELINE":
                    field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "MULTILINE":
                    field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    field = {"label": "New Date Field", "type": "DATE"};
                    break;
                case "DROPDOWN":
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
                .createFieldForForm(formId, field)
                .then(function (response) {
                    var field = response.data[response.data.length - 1];
                    vm.fields.push(field);

                });
        }

        function deleteField(index) {
            var fieldId = vm.fields[index]._id;
            console.log("field ID");
            console.log(fieldId);
            FieldService
                .deleteFieldFromForm(formId, fieldId)
                .then(function (response) {
                    console.log("delete");
                    console.log(response.data);

                    vm.fields.splice(index, 1);
                });
        }


        function editField(field) {
            vm.selectedField = field;
            if (field.type === 'OPTIONS' || field.type === 'CHECKBOXES' || field.type === 'RADIOS') {
                var optionList = [];
                for (var o in field.optionList) {
                    optionList.push(field.options[o].label + " : " + field.options[o].value + "\n");
                }
                field.optionList = optionList;
            }
        }


        function saveEditedField(field) {
            FieldService
                .createFieldForForm(formId, field)
                .then(function(newField){
                    vm.fields.push(newField);
                });
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