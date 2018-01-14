(function() {
    'use strict';
  
    angular.module('app')
        .controller('placesController', placesController);
  
    function placesController($location, authService, dataService, NgTableParams, $mdDialog) {
        var vm = this;

        vm.types=['restaurant','cafe','nightlife','outdoors','art','hotel','shopping','relaxation','sport', 'other'];
        vm.newItem={
            name:null,
            address:null,
            type:null
        };
        vm.editItem = null;
        vm.items=[];
        vm.listItems = listItems;
        vm.fetchItem = fetchItem;
        vm.createItem = createItem;
        vm.updateItem = updateItem;
        vm.deleteItem = deleteItem;
        vm.showCreateDialog = showCreateDialog;
        vm.showUpdateDialog = showUpdateDialog;
        vm.showDeleteDialog = showDeleteDialog;
        vm.cancelDialog = cancelDialog;

        listItems();

        ///////

        function listItems(){
            dataService.list("places", function (res) {
                if (res.status === 200) {
                    vm.items = new NgTableParams({}, { dataset: res.data, counts:[]});
                }
                else {
                    console.log("ERROR: ", res);
                }
                
            });
        };
        function fetchItem(id){
            dataService.read("places",id, function (res) {
                if (res.status === 200) {
                    vm.editItem = res.data;
                }
                else {
                    console.log("ERROR: ", res);
                }
                
            });
        };

        function createItem(){
            dataService.create("places", vm.newItem, function(res) {
                if (res.status === 200) {
                    cancelItem();
                    listItems();
                    cancelDialog();
                }
                else {
                    console.log('Error: ' + res.data);
                }
            });
        };

        function updateItem(){
            dataService.update("places", vm.editItem._id, vm.editItem, function(res) {
                if (res.status === 200) {
                    listItems();
                    cancelDialog();
                }
                else {
                    console.log('Error: ' + res.data);
                }
            });
        };
        function deleteItem(){
            dataService.remove("places", vm.deletingItem._id, function(res) {
                if (res.status === 200) {
                    listItems();
                }
                else {
                    console.log('Error: ' + res.data);
                }
            });
        };

        function cancelItem(){
            vm.newItem = {
                name:null,
                address:null,
                type:null
            };
            vm.editItem = null;
        };

        function showCreateDialog (ev) {
            $mdDialog.show({
                controller: () => vm,
                controllerAs: 'vm',
                templateUrl: './www/admin/views/dialogs/newPlaceDialog.html',
                targetEvent: ev,
                clickOutsideToClose:true
              });
          };

        function showUpdateDialog (ev, place) {
            vm.editItem = angular.copy(place);
            $mdDialog.show({
                controller: () => vm,
                controllerAs: 'vm',
                templateUrl: './www/admin/views/dialogs/editPlaceDialog.html',
                targetEvent: ev,
                clickOutsideToClose:true
                });
        };

        function showUpdateDialog (ev, place) {
            vm.editItem = angular.copy(place);
            $mdDialog.show({
                controller: () => vm,
                controllerAs: 'vm',
                templateUrl: './www/admin/views/dialogs/editPlaceDialog.html',
                targetEvent: ev,
                clickOutsideToClose:true
                });
        };

        function showDeleteDialog (ev,place){
            vm.deletingItem = angular.copy(place);
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this item?')
                .textContent('This can not be undone.')
                .targetEvent(ev)
                .ok('Confirm')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                //confirm
                deleteItem()
              }, function() {
                  //cancel
              });
        }
        
        function cancelDialog() {
            cancelItem();
            $mdDialog.cancel();
        };


    }
  })();