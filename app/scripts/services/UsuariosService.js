    'use strict';


    /**
     * @ngdoc function
     * @name testAngularJsApp.Services:usuarioService
     * @description
     * # usuarioService
     * Services of the testAngularJsApp
     */



     angular.module('testAngularJsApp').factory('usuarioService', ['$http', '$q', function ($http, $q) {

         var REST_SERVICE_URI = 'http://localhost:8082/CompraVenta/usuarios';
          var REST_ADD_URI = 'http://localhost:8082/CompraVenta/user';


         var factory = { fetchAllUsers : fetchAllUsers, 
            createUser: createUser, fetchUserId:fetchUserId, updateUser:updateUser, deleteUser:deleteUser

        };

        return factory;



        function fetchAllUsers(){

          var deferred = $q.defer();
          $http.get(REST_SERVICE_URI)
          .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
            );
          return deferred.promise;
      }


      function createUser(user){

        var deferred = $q.defer();
         $http.post(REST_ADD_URI, user)
        .then(

            function(response){

                deferred.resolve(response.statusText);

            },

            function(errResponse){
                console.error('Error while creting User');
                deferred.reject(errResponse)
            }
            );
        return deferred.promise;

    }


    function fetchUserId(id){

        var deferred = $q.defer();
          $http.get(REST_SERVICE_URI + '-' + id)
          .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
            );
          return deferred.promise;

    }

    function updateUser(user, id){
      var deferred = $q.defer();
      $http.put(REST_SERVICE_URI + '-' + id, user)
      .then(function(response){
        deferred.resolve(response.statusText);
      }, function(errResponse){
        console.error('Error while fetching User');
          deferred.reject(errResponse);
      });
      return deferred.promise;

    }

    function deleteUser(id){
      var deferred = $q.defer();
      $http.delete(REST_SERVICE_URI + '-' + id)
      .then(function(response){
          deferred.resolve(response.statusText);
      }, function(errResponse){
          console.log("Error while delete User")
            deferred.reject(errResponse);
      });
      return deferred.promise;

    }

}])		
