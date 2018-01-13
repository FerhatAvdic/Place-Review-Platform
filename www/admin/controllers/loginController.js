(function() {
    'use strict';
  
    angular.module('app')
        .controller('loginController', loginController)
        .config(controllerConfig);
  
    function loginController($location, authService) {
        var vm = this;
        vm.username=null;
        vm.password=null;
        vm.login = function() {
            vm.loading = true;
            authService.Login(vm.username, vm.password, function (result) {
                console.log("result",result);
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };
    }
    function controllerConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
        .primaryPalette('grey', {
            'default': '800', // by default use shade 400 from the pink palette for primary intentions
        })
        .accentPalette('orange', {
            'default': '200'
        });
    }
  })();