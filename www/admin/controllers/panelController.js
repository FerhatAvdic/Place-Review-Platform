(function() {
  'use strict';

  angular.module('app')
      .controller('panelController', panelController)
      .config(controllerConfig);

  function panelController($location, authService) {
      var vm = this;

      vm.logout=function(){
        authService.Logout();
        $location.path('/login');
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