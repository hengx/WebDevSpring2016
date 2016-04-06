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

        var selectedFormId;

        function init(){
            selectedFormId = null;
            FormService
                .findAllFormsForUser(userId)
                .then(function (response) {
                    vm.forms = response.data;
                });

        }
        init();


        function addForm(form) {

            if ($rootScope.currentUser != null){
                //var newForm = {
                //    title: form.title,
                //    user: userId
                //};
                FormService
                    .createFormForUser(userId, form)
                    .then(function (response) {
                        vm.forms.push(response.data);
                    }, function (err) {
                        console.log(err);

                    });
            }
        }



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
                    .then(function () {
                        FormService
                            .findAllFormsForUser(userId)
                            .then(function(response){
                                vm.forms = response.data;
                            })
                    });
            }
        }

        function deleteForm(index) {
            FormService
                .deleteFormById(vm.forms[index]._id)
                .then(function(){
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response){
                            vm.forms = response.data;
                        })
                });

        }
    }


})();