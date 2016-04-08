(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, UserService) {

        var vm = this;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        //var selectedFormId;

        function init(){
            vm.currentUser = UserService.getCurrentUser();
            updateAllForms();
        }


        function updateAllForms(){
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(function (response) {
                    vm.forms = response.data;
                });

        }

        init();


        function addForm(form) {
            if (form && form.title){
                FormService
                    .createFormForUser(vm.currentUser._id, form)
                    .then(function (response){
                        vm.forms.push(response.data);
                        vm.form = {};
                        updateAllForms();
                    })
            }
        }



        function selectForm(index) {
            //selectedFormId = vm.forms[index]._id;
            //vm.title = vm.forms[index].title;
            vm.form = {
                _id : vm.forms[index]._id,
                title: vm.forms[index].title,
                userId: vm.forms[index].userId,
                fields: vm.forms[index].fields
            };
        }


        function updateForm(form) {
            //if (selectedFormId != null){
            //    var newForm = {
            //        title: title
            //    };
            if (form && form._id){
                FormService
                    .updateFormById(form._id, form)
                    .then(function () {
                        vm.form = {};
                        updateAllForms();
                    });
            }
        }

        function deleteForm(index) {
            FormService
                .deleteFormById(vm.forms[index]._id)
                .then(function(){
                    if (vm.form_id != null && vm.forms[index]._id === vm.form._id){
                        vm.form = {};
                    }
                    updateAllForms();
                    //FormService
                    //    .findAllFormsForUser(userId)
                    //    .then(function(response){
                    //        vm.forms = response.data;
                    //    })
                });

        }
    }


})();