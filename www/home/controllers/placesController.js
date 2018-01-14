(function() {
    'use strict';
  
    angular.module('app')
        .controller('placesController', placesController);
  
    function placesController($location, dataService) {
        var vm = this;
        vm.items=[];
        
        listItems();

        ////////

        function listItems(){
            dataService.list("places", function (res) {
                if (res.status === 200) {
                    vm.items = res.data;
                    console.log("places", vm.items);
                }
                else {
                    console.log("ERROR: ", res);
                }
                
            });
        };
    }
  })();