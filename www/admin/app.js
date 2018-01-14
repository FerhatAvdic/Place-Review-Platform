(function () {

    var  app = angular.module('app', ['ngMaterial','ui.router','ngStorage','ngMessages', 'angular-jwt','ngTable',]);

    app.config(function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "./www/admin/views/login.html",
                controller: 'loginController as vm'
            })
            .state('panel', {
                url: "/",
                templateUrl: "./www/admin/views/panel.html",
                controller: 'panelController as vm'
            })
            .state('panel.places', {
                url: "^/places",
                templateUrl: "./www/admin/views/places.html",
                controller: 'placesController as vm'
            })
            .state('panel.suggestions', {
                url: "^/suggestions",
                templateUrl: "./www/admin/views/suggestions.html",
                controller: 'suggestionsController as vm'
            })

    }).run(function($rootScope, $http, $location, $localStorage, jwtHelper, authService) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if ($localStorage.currentUser){
                var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
                var tokenExpired = jwtHelper.isTokenExpired($localStorage.currentUser.token);
                //console.log("token",$localStorage.currentUser.token,"tokenExpiration", tokenExpired);
                if ((restrictedPage && tokenExpired) || !tokenPayload.role === 'admin') {
                    authService.Logout();
                    $location.path('/login');
                }
                else if(!tokenExpired && tokenPayload.role === 'admin' && !restrictedPage){
                    //if loged in admin is trying to access public pages aka login
                    $location.path('/');
                }
            }else if (restrictedPage){
                $location.path('/login');
            }
        });
    });


}());
