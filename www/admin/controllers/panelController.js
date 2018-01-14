(function() {
  'use strict';

  angular.module('app')
      .controller('panelController', panelController)
      .config(controllerConfig);

  function panelController($location, authService, $mdSidenav) {
    var vm = this;
    vm.toggleLeft = buildToggler('left-navbar')

    vm.logout=function(){
        authService.Logout();
        $location.path('/login');
    };
    function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
    };
  }
  function controllerConfig($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('grey', {
          'default': '800', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      .accentPalette('orange', {
          'default': '200'
      });
  }
})();