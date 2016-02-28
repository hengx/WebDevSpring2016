(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope, $location) {

        var currentUser = $rootScope.currentUser;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        if (currentUser) {
            FormService.findAllFormsForUser(currentUser._id, function (forms) {
                $scope.forms = forms;
            });
        }


        function addForm() {
            if (!currentUser) {
                alert("You need to login first");
                return;
            }
            var form = {
                title: formName
            };
            FormService.createFormForUser(currentUser._id, form, function (form) {
                $scope.forms.push(form);

            });
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.forms[index];
            $scope.formName = $scope.forms[index].title;
        }


        function updateForm() {
            var form = {
                title: formName,
                userId: currentUser._id
        }
            if ($scope.selectedForm) {
                FormService.updateFormById($scope.selectedForm._id, form, function (form) {
                    FormService.findAllFormsForUser(user._id, function (forms) {
                        $scope.forms = forms;
                    });

                });

            }

        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[id], function (forms) {
                FormService.findAllFormsForUser(user._id, function (forms) {
                    $scope.forms = forms;
                });
            });
        }


    }

})();