        'use strict';

        /**
        * @ngdoc function
        * @name testAngularJsApp.controller:ProductosCtrl
        * @description
        * # ProductosCtrl
        * Controller of the testAngularJsApp
        */

        angular.module('testAngularJsApp').controller('ProductosCtrl', ['$location', 'productosService', function($location, productosService){

        	var ListProduct = this;
        	ListProduct.datosComp = [];
        	ListProduct.clickedProducto={};

        	fetchAllProductos();

        	function fetchAllProductos(){

        		productosService.fetchAllProductos()
        		.then(function(d){
        			ListProduct.datosComp = d;

        			var length = ListProduct.datosComp.length;

        			for (var i = 0; i < length; i++) {
        				console.log(ListProduct.datosComp[i].precio)
        			};

        		}, function(errResponse){

        			console.error('Error while fetching Productos');
        		});
        	}



        //con esta funcion nos vamos a la pagina add.html
        ListProduct.add = function(){
          $location.path('/addProducto');
        }

        //ahora desde add.html  tenemos que insertar un usuario


        //metodo para editar registros   con este metodo envio un parametro y recogo ese parametro en el otro controlador
        ListProduct.edit = function(producto){
          console.log('producto to be edited', producto);
          $location.path('/addProducto/' +  producto.idproducto);

        }

      //de esta forma llevo la informacion a la ventana modal
        ListProduct.selectProductDelete = function(producto){
          console.log(producto);
          ListProduct.clickedProducto = producto;
          

        }

        // metodo para borrar registros
        ListProduct.remove = function(id){

          console.log('id to be remove', id);

        /*  angular.forEach($scope.datosComp, function(usuario){
            if(usuario.idusuario ==  id){
            }
          });*/

        productosService.deleteProducto(id)
        .then(

          fetchAllProductos
          , function(errResponse){

            condole.error('Error while delete Productos');

          })

      }   


                
        	
        }]);



      