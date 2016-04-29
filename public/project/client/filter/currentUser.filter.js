(function (){
    'use strict';

    angular
        .module('MoocApp')
        .filter('excludeCurrentUser', CurrentUserFilter);

    function CurrentUserFilter() {
        return function(usersList, currentUser) {
            if (usersList !== undefined) {
                return usersList.filter(function (user) {
                    return user._id !== currentUser._id;
                });
            } else {
                return [];
            }
        };
    }
})();