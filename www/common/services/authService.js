(function () {
    'use strict';

    angular
        .module('app')
        .factory('authService', Service);

    function Service($http, $localStorage) {
        var service = {};
        const api = '/api/';
        service.Login = Login;
        service.Logout = Logout;
        service.Register = Register;

        return service;

        function Register(user, callback){
            $http.post(api +'register', user)
                .then(function (response) {
                    // login successful if there's a token in the response
                    //console.log("response.data.token", response.data.token);
                    if (response.data.success) {
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                },
                function(error){
                    console.log("login error:",error);
                });
        }

        function Login(username, password, callback) {
            $http.post(api +'authenticate', { username: username, password: password })
                .then(function (response) {
                    //console.log("response",response);
                    // login successful if there's a token in the response
                    //console.log("response.data.token", response.data.token);
                    if (response.data.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { user: response.data.user, token: response.data.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = response.data.token;
                        //console.log("Authorization header: ", $http.defaults.headers.common.Authorization);
                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                },
                function(error){
                    console.log("login error:",error);
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();
