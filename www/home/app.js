(function () {

    var  app = angular.module('app', ['ngMaterial','ui.router','ngStorage','ngMessages', 'angular-jwt', 'md.data.table', 'ngMap']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "./www/home/views/places.html",
                controller: 'placesController as vm'
            })
            .state('places', {
                url: "/places/:item_id",
                templateUrl: "./www/home/views/placeItem.html",
                controller: 'placeItemController as vm'
            })
            .state('mysuggestions', {
                url: "/mysuggestions",
                templateUrl: "./www/home/views/mySuggestions.html",
                controller: 'mySuggestionsController as vm'
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
    .run(function($rootScope, $http, $location, $localStorage, jwtHelper, authService) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPages = ['/mySuggestions'];
            var restrictedPage = restrictedPages.indexOf($location.path()) !== -1;
            if ($localStorage.currentUser){
                var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
                var tokenExpired = jwtHelper.isTokenExpired($localStorage.currentUser.token);
                if(tokenExpired){
                    authService.Logout();
                }
                //console.log("token",$localStorage.currentUser.token,"tokenExpiration", tokenExpired);
                if ((restrictedPage && tokenExpired) || !tokenPayload.role === 'user') {
                    authService.Logout();
                    $location.path('/login');
                }
                else if(!tokenExpired && ($location.path()==='/login' || $location.path() === '/signup')){
                    //if loged in home is trying to access public pages aka login
                    $location.path('/');
                }
            }else if (restrictedPage){
                $location.path('/login');
            }
        });
    });


}());
