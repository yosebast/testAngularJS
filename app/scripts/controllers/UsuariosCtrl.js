        'use strict';

        /**
        * @ngdoc function
        * @name testAngularJsApp.controller:UserCtrl
        * @description
        * # UserCtrl
        * Controller of the testAngularJsApp
        */


        angular.module('testAngularJsApp').controller('UserCtrl', ['$location', 'usuarioService', function($location, usuarioService){

          var ListUsu = this;
          ListUsu.datosComp = [];
         // ListUsu.newUser = {idusuario:null, nombre:'', apellidos:'', email:'', edad:'', tlf:'', fotoUrl:'', registrado:'', clave:'', regDate:null};
        //  ListUsu.clickedUser={};
          fetchAllUsers();

          function fetchAllUsers(){
            usuarioService.fetchAllUsers()
            .then(
              function(d){
               ListUsu.datosComp = d;

               var length = ListUsu.datosComp.length;
               for (var i = 0; i < length; i++) {
                console.log(ListUsu.datosComp[i].nombre); 
                console.log(ListUsu.datosComp[i].apellidos);
                console.log(ListUsu.datosComp[i].email);
                console.log(ListUsu.datosComp[i].edad);
                console.log(ListUsu.datosComp[i].tlf);
                console.log(ListUsu.datosComp[i].fotoUrl);
                console.log(ListUsu.datosComp[i].registrado);
                console.log(ListUsu.datosComp[i].clave);
              };

            },
            function(errResponse){
              condole.error('Error while fetching Users');
            }

            );

          }



        //con esta funcion nos vamos a la pagina add.html
        ListUsu.add = function(){
          $location.path('/add');
        }

        //ahora desde add.html  tenemos que insertar un usuario


        //metodo para editar registros   con este metodo envio un parametro y recogo ese parametro en el otro controlador
        ListUsu.edit = function(user){
          console.log('user to be edited', user);
          $location.path('/add/' +  user.idusuario);

        }

      //de esta forma llevo la informacion a la ventana modal
        ListUsu.selectUserDelete = function(user){
          console.log(user);
          ListUsu.clickedUser = user;
          

        }

        // metodo para borrar registros
        ListUsu.remove = function(id){

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


    