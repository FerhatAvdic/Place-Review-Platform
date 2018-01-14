(function () {
    'use strict';

    angular.module("app")
    .factory("dataService", ['$http', function ($http) {

        var source = "/api/";

        return {
            //CRUD
            list: function (dataSet, callback) {
                $http.get(source + dataSet)
                .then(function (result) {
                    return callback(result);
                }, function (result) {
                    callback(result);
                });
            },

            read: function (dataSet, id, callback) {
                $http.get(source + dataSet + "/" + id)
                     .then(function (result) {
                         return callback(result);
                     }, function (result) {
                         callback(result);
                     });
            },
            readByQuery: function(dataSet, data, callback) {
                $http({ method: "get", url: source + dataSet, params: data })
                     .then(function (result) {
                         return callback(result);
                     }, function (result) {
                         callback(result);
                     });
            },

            create: function (dataSet, data, callback) {
                $http({ method: "post", url: source + dataSet, data: data })
                   .then(function (result) {
                       return callback(result);
                   }, function (result) {
                       callback(result);
                   });
            },

            update: function (dataSet, id, data, callback) {
                $http({ method: "put", url: source + dataSet + "/" + id, data: data })
                   .then(function (result) {
                       return callback(result);
                   }, function (result) {
                       callback(result);
                   });
            },

            remove: function (dataSet, id, callback) {
                $http({ method: "delete", url: source + dataSet + "/" + id })
                     .then(function (result) {
                         return callback(result);
                     }, function (result) {
                         callback(result);
                     });
            }


        };
    }]);
}());
