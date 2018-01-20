(function() {
    'use strict';
  
    angular.module('app')
        .controller('mySuggestionsController', mySuggestionsController);
  
    function mySuggestionsController($localStorage,dataService, $state, NgMap, $window, $mdDialog) {
        if(!$localStorage.currentUser) $state.go('login');
        var vm = this;
        vm.types = ['restaurant','cafe','nightlife','outdoors','art','hotel','shopping','relaxation','sport', 'other'];
        vm.newItem={
            name: null,
            address: null,
            type: null
        };
        NgMap.getMap('suggestion-map').then(function(map) {
            vm.map = map;
        });
        vm.marker=null;
        vm.gmaptypes=['address'];
        vm.placeChanged = function() {
            console.log("this", this);
            //vm.place = this.getPlace();
            //console.log('location', vm.place.geometry.location);
            //vm.map.setCenter(vm.place.geometry.location);
            vm.marker = vm.newItem.address;
        }
        vm.createItem = createItem;
        vm.cancelItem = cancelItem;
        vm.showCreateDialog = showCreateDialog;
        vm.cancelDialog = cancelDialog;
        vm.showDeleteDialog = showDeleteDialog;

        vm.propertyName = 'place.name';
        vm.reverse = true;
        vm.sortBy = function(propertyName) {
            vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
            vm.propertyName = propertyName;
          };

        listItems();

        /////

        function listItems(){
            dataService.read("mysuggestions", $localStorage.currentUser.user.id, function (res) {
                if (res.status === 200) {
                    vm.mySuggestions = res.data;
                }
                else {
                    console.log("ERROR: ", res);
                }
                
            });
        };

        function createItem(form){
            var s = {
                user: {
                    id: $localStorage.currentUser.user.id,
                    username: $localStorage.currentUser.user.username,
                    email: $localStorage.currentUser.user.email
                },
                place:{
                    name: vm.newItem.name,
                    address: vm.newItem.address,
                    type: vm.newItem.type
                }
            }
            console.log("new sugg", s);
            dataService.create("suggestions", s, function(res) {
                if (res.status === 200) {
                    cancelDialog(form);
                    listItems();
                }
                else {
                    cancelDialog(form);
                    console.log('Error: ' + res.data);
                }
            });
        };

        function deleteItem(id){
            dataService.remove("suggestions", id, function(res) {
                if (res.status === 200) {
                    listItems();
                }
                else {
                    console.log('Error: ' + res.data);
                }
            });
        };

        function cancelItem(form){
            vm.newItem = null;
            vm.newItem={
                name: null,
                address: null,
                type: null
            };
            vm.marker = null;
            form.$setPristine();
            form.$setUntouched();
        };

        function showCreateDialog(ev) {
            $mdDialog.show({
                controller: () => vm,
                controllerAs: 'vm',
                templateUrl: './www/home/views/dialogs/newSuggestionDialog.html',
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        function cancelDialog(form) {
            cancelItem(form);
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
    }
  })();