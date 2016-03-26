(function(){
    angular
        .module("MoocApp")
        .factory("UserService", userService);

    function userService($http, $rootScope){
        var api = {
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile
    };
        return api;

        function getProfile(){
            return $http.get("/api/project/profile/"+ $rootScope.currentUser._id);
        }

        function register(user){
            return $http.post("/api/project/register", user);
        }

        function logout(){
            return $http.post("/api/project/logout");
        }

        function getCurrentUser(){
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;

        }

        function login(credentials) {
            return $http.post("/api/project/login", credentials);
        }
    }
})();