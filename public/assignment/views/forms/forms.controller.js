(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootController, $location){

        var currentForms = [];
        $scope.currentUser  = $rootController.currentUser;
        currentForms = FormService.findAllFormsForUser(currentUser._id, function());

    }

    var model = {
        addForm: addForm,
        updateForm: updateForm,
        deleteForm: deleteForm,
        selectForm: selectForm

    };
    return model;

    function addForm(FormService, currentForms){
        currentForms.push()




    }

})();