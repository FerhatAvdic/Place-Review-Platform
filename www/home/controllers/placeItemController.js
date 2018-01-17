(function() {
    'use strict';
  
    angular.module('app')
        .controller('placeItemController', placeItemController);
  
    function placeItemController(dataService, $stateParams, $state, $localStorage ,jwtHelper, NgMap) {
        var vm = this;
        vm.place = null;
        vm.reviews = [];
        vm.newReview = {
            user: null,
            place_id: null,
            rating: null,
            body: null
        }
        NgMap.addMap('place-item-map');
        vm.cancelReview = cancelReview;
        vm.createReview = createReview;
        if($localStorage.currentUser) {
            var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
            vm.role = tokenPayload.role;
            vm.user_id = tokenPayload._id;
        }

        fetchItem();
        fetchReviews();
        initNewReview();

        ///////////

        function initNewReview(){
            if($localStorage.currentUser){
                vm.newReview = {
                    user: {
                        id: $localStorage.currentUser.user.id,
                        username: $localStorage.currentUser.user.username,
                        email: $localStorage.currentUser.user.email
                    },
                    place_id: $stateParams.item_id,
                    rating: null,
                    body: null
                }
            }
        }
        
        function fetchItem(){
            dataService.read("places", $stateParams.item_id, function (res) {
                if (res.status === 200) {
                    vm.place = res.data;
                }
                else {
                    $state.go('home');
                    console.log("ERROR: ", res);
                }
                
            });
        };

        function fetchReviews(){
            dataService.read("reviewsbyplace", $stateParams.item_id, function (res) {
                if (res.status === 200) {
                    vm.reviews = res.data;
                    console.log("reviews",vm.reviews);
                }
                else {
                    console.log("ERROR: ", res);
                }
            });
        }

        function createReview(form){
            dataService.create("reviews", vm.newReview, function(res) {
                if (res.status === 200) {
                    cancelReview(form);
                    fetchReviews();
                }
                else {
                    cancelReview(form);
                    console.log('Error: ' + res.data);
                }
            });
        };

        function cancelReview(form){
            vm.newReview=null;
            form.$setPristine();
            form.$setUntouched();
            
            vm.newReview = {
                user: null,
                place_id: null,
                rating: null,
                body: null
            }
        };
    }
  })();