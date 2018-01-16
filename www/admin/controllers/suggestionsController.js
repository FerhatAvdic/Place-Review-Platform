(function() {
    'use strict';
  
    angular.module('app')
        .controller('suggestionsController', suggestionsController);
  
    function suggestionsController(dataService) {
        var vm = this;
        vm.updateItem = updateItem;
        vm.deleteItem = deleteItem;

        /// TABLE SORT
        vm.propertyName = 'user.username';
        vm.reverse = true;
        vm.sortBy = function(propertyName) {
            vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
            vm.propertyName = propertyName;
          };


        listItems();
        function listItems(){
            dataService.list("suggestions", function (res) {
                if (res.status === 200) {
                    vm.items = res.data;
                }
                else {
                    console.log("ERROR: ", res);
                }
                
            });
        };
        function updateItem(id){
            console.log("UPdating");
            dataService.update("suggestions", id, {isProcessed: true}, function(res) {
                if (res.status === 200) {
                    console.log("updated");
                    listItems();
                }
                else {
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
    }
  })();