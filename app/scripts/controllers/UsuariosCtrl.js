        'use strict';

        /**
        * @ngdoc function
        * @name testAngularJsApp.controller:UserCtrl
        * @description
        * # UserCtrl
        * Controller of the testAngularJsApp
        */


        angular.module('testAngularJsApp').controller('UserCtrl', ['$scope', '$location', 'usuarioService', function($scope, $location, usuarioService){

          $scope.datosComp = [];
          $scope.newUser = {idusuario:null, nombre:'', apellidos:'', email:'', edad:'', tlf:'', fotoUrl:'', registrado:'', clave:'', regDate:null};
          $scope.clickedUser={};
          fetchAllUsers();

          function fetchAllUsers(){
            usuarioService.fetchAllUsers()
            .then(
              function(d){
               $scope.datosComp = d;

               var length = $scope.datosComp.length;
               for (var i = 0; i < length; i++) {
                console.log($scope.datosComp[i].nombre); 
                console.log($scope.datosComp[i].apellidos);
                console.log($scope.datosComp[i].email);
                console.log($scope.datosComp[i].edad);
                console.log($scope.datosComp[i].tlf);
                console.log($scope.datosComp[i].fotoUrl);
                console.log($scope.datosComp[i].registrado);
                console.log($scope.datosComp[i].clave);
              };

            },
            function(errResponse){
              condole.error('Error while fetching Users');
            }

            );

          }



        //con esta funcion nos vamos a la pagina add.html
        $scope.add = function(){
          $location.path('/add');
        }

        //ahora desde add.html  tenemos que insertar un usuario


        //metodo para editar registros   con este metodo envio un parametro y recogo ese parametro en el otro controlador
        $scope.edit = function(user){
          console.log('user to be edited', user);
          $location.path('/add/' +  user.idusuario);

        }

      //de esta forma llevo la informacion a la ventana modal
        $scope.selectUserDelete = function(user){
          console.log(user);
          $scope.clickedUser = user;
          

        }

        // metodo para borrar registros
        $scope.remove = function(id){

          console.log('id to be remove', id);

        /*  angular.forEach($scope.datosComp, function(usuario){
            if(usuario.idusuario ==  id){
            }
          });*/

        usuarioService.deleteUser(id)
        .then(

          fetchAllUsers
          , function(errResponse){

            condole.error('Error while delete Users');

          })

      }     

    }]);


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

          usuarioService.fetchUserId($routeParams.id)
          .then(function(m){

            $scope.newUser = m;
          }, 

          function(errResponse){

           console.error('Error while updating User');

         })

        } 


      }]);