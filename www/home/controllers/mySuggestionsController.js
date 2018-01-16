(function() {
    'use strict';
  
    angular.module('app')
        .controller('mySuggestionsController', mySuggestionsController);
  
    function mySuggestionsController($localStorage,dataService, $state) {
        if(!$localStorage.currentUser) $state.go('login');
        var vm = this;
        vm.types = ['restaurant','cafe','nightlife','outdoors','art','hotel','shopping','relaxation','sport', 'other'];
        vm.newItem={
            name: null,
            address: null,
            type: null
        };
        vm.createItem = createItem;
        vm.cancelItem = cancelItem;
        vm.deleteItem = deleteItem;

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
                    cancelItem(form);
                    listItems();
                }
                else {
                    cancelItem(form);
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
            form.$setPristine();
            form.$setUntouched();
        };
    }
  })();