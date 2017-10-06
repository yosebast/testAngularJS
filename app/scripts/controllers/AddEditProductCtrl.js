 
        'use strict';

        /**
        * @ngdoc function
        * @name testAngularJsApp.controller:UserCtrl
        * @description
        * # UserCtrl
        * Controller of the testAngularJsApp
        */



  angular.module('testAngularJsApp').controller('ProductCreationUpdateCtrl', ['$scope','$routeParams', '$location', 'productosService', function($scope, $routeParams, $location, productosService){




         $scope.reset = function(){        
           $scope.newProduct={idproducto:null, subcategoria:null, categoria:null, seccion:null, titulo:'', precio:null, fechaPublicacion:null, estado:'', visitas:null, nomImagen:''};
            $scope.myForm.$setPristine(); //reset Form       
          }

          $scope.cancel = function(){
            $location.path('/productos');
          }
        

          //dentro de esta function trabajamos la edicion actualizacion y la insercion  de usuarios

          $scope.agregar = function(){  

          var file = $scope.file;            
            console.log(file);           
           

            if($scope.newProduct.idproducto == null){

            //addProduct
            console.log($scope.newProduct);

            productosService.createProducto($scope.newProduct, file)
            .then(
             function(p){

              if(p == 'Creado'){
                $location.path('/productos');

              }


            },

            function(errResponse){
              console.error('Error while updating Producto');
            });


          }else{
            //upDateUser

            console.log($scope.newProduct);

            productosService.updateProduct($scope.newProduct, $scope.newProduct.idproducto)
            .then(function(u){

              if(u == "OK"){
                $location.path('/productos');
              }


            }, 
            function(errResponse){
              console.error('Error while updating Producto');
            })

          }

        }


        fetchProductoId();

        function fetchProductoId(){

          if( $routeParams.id != null){

          productosService.fetchProductoId($routeParams.id)
          .then(function(m){

            $scope.newProduct = m;
          }, 

          function(errResponse){

           console.error('Error while updating Producto');

         })
        }else{
          //llama a los combos para que se cargen en la pagina de insertar producto

         //  $scope.newUser={idusuario:null, nombre:'', apellidos:'', email:'', edad:'', tlf:'', fotoUrl:'', registrado:'', clave:'', regDate:null};

          productosService.cargaComboSeccion()
            .then(function(d){
              $scope.secciones = d;

              var length = $scope.secciones.length;

              for (var i = 0; i < length; i++) {
                console.log($scope.secciones[i].nomseccion)
              };

            }, function(errResponse){

              console.error('Error while fetching Secciones');
            });         

          }       
      
       } ;

         


         $scope.selectAction = function() {
        console.log($scope.newProduct.seccion);
//se cargara las categorias para esa seccion
           productosService.cargaComboCategoria($scope.newProduct.seccion)
               .then(function(d){
              $scope.categorias = d;

              var length = $scope.categorias.length;

              for (var i = 0; i < length; i++) {
                console.log($scope.categorias[i].nomcategoria)
              };

            }, function(errResponse){

              console.error('Error while fetching Categorias');
            });


          };


           $scope.selectActionCategoria = function(){
            console.log($scope.newProduct.categoria);

               productosService.cargaComboSubcategoria($scope.newProduct.categoria)
               .then(function(d){
              $scope.subcategorias = d;

              var length = $scope.subcategorias.length;

              for (var i = 0; i < length; i++) {
                console.log($scope.subcategorias[i].nomsubcategoria)
              };

            }, function(errResponse){

              console.error('Error while fetching Subcategorias');
            });
          }




          $scope.selectActionSubCategoria = function(){
            console.log($scope.newProduct.subcategoria);
          }

         



      }]);




