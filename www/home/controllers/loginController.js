(function() {
    'use strict';
  
    angular.module('app')
        .controller('loginController', loginController);
  
    function loginController(authService, $state, $window) {
        var vm = this;
        vm.username=null;
        vm.password=null;
        vm.login = function(form) {
            authService.Login(vm.username, vm.password, function (result) {
                console.log("result",result);
                if (result === true) {
                    form.$setPristine();
                    $window.location.reload();
                    
                } else {
                    vm.error = 'Username or password is incorrect';
                    form.$setPristine();
                }
            });
        };
    }
  })();