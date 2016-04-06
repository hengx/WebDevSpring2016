(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope) {

        var vm = this;
        var userId = $rootScope.currentUser._id;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        function init() {
            FormService
                .findAllFormsForUser(userId)
                .then(function (response) {
                    vm.forms = response.data;
                });
        }

        init();

        function addForm(form) {
            if ($rootScope.currentUser != null){
                var newForm = {
                    title: form.title
                };
                FormService
                    .createFormForUser(userId, newForm)
                    .then(function (response) {
                        vm.forms = response.data;
                    }, function (err) {
                        console.log(err);

                    });
            }
        }

        var selectedFormId;

        function selectForm(index) {
            selectedFormId = vm.forms[index]._id;
            vm.title = vm.forms[index].title;
        }


        function updateForm(form) {
            if (selectedFormId != null){
                var newForm = {
                    title: form.title
                };
                FormService
                    .updateFormById(selectedFormId, newForm)
                    .then(function (response) {
                        vm.forms = response.data;
                    });
            }

        }

        function deleteForm(index) {
            FormService
                .deleteFormById(vm.forms[index]._id)
                .then(function (response) {
                    console.log(response);
                    console.log("deleted");
                    //vm.forms.splice(index, 1);
                    vm.forms = response.data;
                });

        }
    }


})();