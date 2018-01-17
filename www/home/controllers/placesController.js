(function() {
    'use strict';
  
    angular.module('app')
        .controller('placesController', placesController);
  
    function placesController($location, dataService) {
        var vm = this;
        vm.items=[];
        vm.types = ['restaurant','cafe','nightlife','outdoors','art','hotel','shopping','relaxation','sport', 'other'];

        
        
        
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