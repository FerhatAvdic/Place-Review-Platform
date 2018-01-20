(function() {
    'use strict';
  
    angular.module('app')
        .controller('placeItemController', placeItemController);
  
    function placeItemController(dataService, $stateParams, $state, $localStorage, jwtHelper, NgMap, $mdDialog) {
        var vm = this;
        vm.place = null;
        vm.reviews = [];
        vm.newReview = {
            user: null,
            place_id: null,
            rating: null,
            body: null
        }
        vm.showCreateDialog = showCreateDialog;
        vm.createReview = createReview;
        vm.cancelDialog = cancelDialog;
        vm.cancelReview = cancelReview;
        vm.showDeleteDialog = showDeleteDialog;
        vm.showUpdateDialog = showUpdateDialog;
        vm.updateReview = updateReview;
        if($localStorage.currentUser) {
            var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
            vm.role = tokenPayload.role;
            vm.user_id = tokenPayload._id;
        }
        vm.editingReview = {
            user: null,
            place_id: null,
            rating: null,
            body: null
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
                    cancelDialog(form);
                    fetchReviews();
                }
                else {
                    cancelReview(form);
                    console.log('Error: ' + res.data);
                }
            });
        };
        function updateReview(form) {
            dataService.update("reviews", vm.editingReview._id, vm.editingReview, function (res) {
                if (res.status === 200) {
                    cancelDialog(form);
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

            vm.editingReview = {
                user: null,
                place_id: null,
                rating: null,
                body: null
            }
        };

        function showCreateDialog(ev) {
            $mdDialog.show({
                controller: () => vm,
                controllerAs: 'vm',
                templateUrl: './www/home/views/dialogs/newReviewDialog.html',
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        function showUpdateDialog(ev, item) {
            vm.editingReview = angular.copy(item);
            console.log(vm.editingReview);
            $mdDialog.show({
                controller: () => vm,
                controllerAs: 'vm',
                templateUrl: './www/home/views/dialogs/editReviewDialog.html',
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        function cancelDialog(form) {
            cancelReview(form);
            $mdDialog.cancel();
        };

        function showDeleteDialog(ev, id) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this item?')
                .textContent('This can not be undone.')
                .targetEvent(ev)
                .ok('Confirm')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                //confirm
                deleteItem(id)
            }, function () {
                //cancel
            });
        };
        function deleteItem(id) {
            dataService.remove("reviews", id, function (res) {
                if (res.status === 200) {
                    fetchReviews();
                }
                else {
                    console.log('Error: ' + res.data);
                }
            });
        };
    }
  })();