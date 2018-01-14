(function () {

    var  app = angular.module('app', ['ngMaterial','ui.router','ngStorage','ngMessages', 'angular-jwt','ngTable',]);

    app.config(function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "./www/home/views/places.html",
                controller: 'placesController as vm'
            })
            .state('placeItem', {
                url: "/place-item/:item_id",
                templateUrl: "./www/home/views/placeItem.html",
                controller: 'placeItemController as vm'
            })
            .state('profile', {
                url: "/profile",
                templateUrl: "./www/home/views/profile.html",
                controller: 'profileController as vm'
            })
            .state('login', {
                url: "/login",
                templateUrl: "./www/home/views/login.html",
                controller: 'loginController as vm'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "./www/home/views/signup.html",
                controller: 'signupController as vm'
            })

    })
    /*.run(function($rootScope, $http, $location, $localStorage, jwtHelper, authService) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login', '/', '/place/*'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if ($localStorage.currentUser){
                var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
                var tokenExpired = jwtHelper.isTokenExpired($localStorage.currentUser.token);
                //console.log("token",$localStorage.currentUser.token,"tokenExpiration", tokenExpired);
                if ((restrictedPage && tokenExpired) || !tokenPayload.role === 'home') {
                    authService.Logout();
                    $location.path('/login');
                }
                else if(!tokenExpired && tokenPayload.role === 'home' && !restrictedPage){
                    //if loged in home is trying to access public pages aka login
                    $location.path('/');
                }
            }else if (restrictedPage){
                $location.path('/login');
            }
        });
    })*/;


}());