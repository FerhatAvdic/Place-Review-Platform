(function() {
    'use strict';
  
    angular.module('app')
        .controller('placesController', placesController);
  
    function placesController($location, dataService, $timeout, NgMap) {
        var vm = this;
        vm.items=[];
        vm.types = ['restaurant','cafe','nightlife','outdoors','art','hotel','shopping','relaxation','sport', 'other'];
        var geocoder = new google.maps.Geocoder();
        vm.prepFilter = {};
        vm.applyFilters = applyFilters;
        
        listItems();

        ////////

        function listItems(){
            dataService.list("places", function (res) {
                if (res.status === 200) {
                    vm.items = res.data;
                    vm.items.forEach(createMaps);

                    console.log("places", vm.items);
                }
                else {
                    console.log("ERROR: ", res);
                }
                
            });
        };

        function createMaps(item,index,array){
            NgMap.getMap(item._id).then(map => {
                setLocation(item.address, map);
            });
            /*
            if(index%3===0) {
                $timeout(() => { 
                    console.log("in timeout");
                    NgMap.getMap(item._id).then(map => {
                        setLocation(item.address, map);
                    });
            }, 0);
            }
            else {
                console.log("outside timeout");
                NgMap.getMap(item._id).then(map => {
                    setLocation(item.address, map);
                });
            }*/
        }

        function setLocation(address, map){
            geocoder.geocode( { 'address' : address }, (results, status) => {
                if( status == google.maps.GeocoderStatus.OK ) map.setCenter( results[0].geometry.location );
                else {
                    $timeout(function () {
                        //console.log("repeat call");
                        setLocation(address, map);
                    }, 1000);
                    //console.log( 'Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        function reloadMaps(){
            //console.log("reloading maps");
            vm.items.forEach(createMaps);
        }
        
        function applyFilters(){
            vm.filter = angular.copy(vm.prepFilter);
            reloadMaps();
        }

    
    }
  })();