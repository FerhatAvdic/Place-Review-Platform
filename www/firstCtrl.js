(function () {
    'use strict';

    angular.module("app")
    .controller("firstCtrl",
    function () {
        var vm = this;
        this.color = 'red';
        this.myValue = 10;

   });
}());
