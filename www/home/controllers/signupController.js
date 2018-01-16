(function() {
    'use strict';
  
    angular.module('app')
        .controller('signupController', signupController);
  
    function signupController(authService, $state) {
        var vm = this;
        vm.newUser = {
            username: null,
            email: null,
            password: null,
            address :null
        }
        vm.signup = signup;

        ///

        function signup(){
            authService.Register(vm.newUser, function(res){
                if(res === true){
                    console.log("signed up");
                    $state.go('home');
                }
                else{
                    console.log("something went wrong");
                }
            })
        }
    }
  })();