(function() {
    'use strict';
  
    angular.module('app')
        .controller('navController', navController);
  
    function navController($localStorage,jwtHelper, authService, $window) {
        var vm = this;
        var tokenPayload = null;
        vm.role = null;
        vm.user_id = null;
        vm.logout = logout;
        if($localStorage.currentUser) {
            tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
            vm.role = tokenPayload.role;
            vm.user_id = tokenPayload._id;
        }

        function logout(){
            authService.Logout();
            $window.location.reload();
        }


    }
  })();