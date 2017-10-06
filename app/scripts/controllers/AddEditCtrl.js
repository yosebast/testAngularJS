   
        'use strict';

        /**
        * @ngdoc function
        * @name testAngularJsApp.controller:UserCtrl
        * @description
        * # UserCtrl
        * Controller of the testAngularJsApp
        */

   angular.module('testAngularJsApp').controller('UseCreationUpdateCtrl', ['$scope','$routeParams', '$location', 'usuarioService', function($scope, $routeParams, $location, usuarioService){

         $scope.reset = function(){        
           $scope.newUser={idusuario:null, nombre:'', apellidos:'', email:'', edad:'', tlf:'', fotoUrl:'', registrado:'', clave:'', regDate:null};
            $scope.myForm.$setPristine(); //reset Form       
          }

          $scope.cancel = function(){
            $location.path('/usuarios');
          }

          //dentro de esta function trabajamos la edicion actualizacion y la insercion  de usuarios

          $scope.agregar = function(){

            if($scope.newUser.idusuario == null){

            //addUser
            console.log($scope.newUser);

            usuarioService.createUser($scope.newUser)
            .then(
             function(p){

              if(p == 'Creado'){
                $location.path('/usuarios');

              }


            },

            function(errResponse){
              console.error('Error while updating User');
            });


          }else{
            //upDateUser

            console.log($scope.newUser);

            usuarioService.updateUser($scope.newUser, $scope.newUser.idusuario)
            .then(function(u){

              if(u == "OK"){
                $location.path('/usuarios');
              }


            }, 
            function(errResponse){
              console.error('Error while updating User');
            })

          }

        }


        fetchUserId();

        function fetchUserId(){

          if( $routeParams.id != null){

          usuarioService.fetchUserId($routeParams.id)
          .then(function(m){

            $scope.newUser = m;
          }, 

          function(errResponse){

           console.error('Error while updating User');

         })
        }
       } 


      }]);