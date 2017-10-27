    'use strict';


    /**
     * @ngdoc function
     * @name testAngularJsApp.Services:ProductosService
     * @description
     * # ProductosService
     * Services of the testAngularJsApp
     */


     	angular.module('testAngularJsApp').factory('productosService', ['$http', '$q', function($http, $q){
     		
     		var REST_SERVICE_URL = 'http://localhost:8082/CompraVenta/allproductos';
            var REST_ADD_URI = 'http://localhost:8082/CompraVenta/product';
            var REST_ADD_URI_SECCION = 'http://localhost:8082/CompraVenta/seccions';
            var REST_ADD_URI_SUBCATEGORIA = 'http://localhost:8082/CompraVenta/subcategoria';
            var REST_ADD_URI_CATEGORIA = 'http://localhost:8082/CompraVenta/categoria';

     		var factory = { fetchAllProductos : fetchAllProductos,
     						createProducto : createProducto,
                            cargaComboSeccion : cargaComboSeccion,
                            cargaComboSubcategoria : cargaComboSubcategoria,
                            cargaComboCategoria : cargaComboCategoria,
     						fetchProductoId : fetchProductoId,
     						updateProducto : updateProducto,
     						deleteProducto : deleteProducto
     					};


     		return factory;


     		function fetchAllProductos(){

     			var deferred = $q.defer();
     			$http.get(REST_SERVICE_URL)
     			.then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Productos');
                deferred.reject(errResponse);
            }
            );

     			return deferred.promise;

     		}



    function createProducto(product, file){

        var deferred = $q.defer();

            var formData= new FormData();
            formData.append("fichero", file);
             // product.urlFoto1 = formData;


          // asi se puede parser un string y obtener un numero pero aqui no es necesario por que el formData convierte a todos en string
            product.precio = parseInt(product.precio);
            product.visitas = parseInt(product.visitas);

             //formData.append('objProduct', product);

               /* formData.append('secciones', product.seccion);
                 formData.append('categorias', product.categoria);
                  formData.append('subcategorias', product.subcategoria);
                   formData.append('titulo', product.titulo);
                    formData.append('precio', product.precio);
                     formData.append('fecha', product.fechaPublicacion);
                      formData.append('estado', product.estado);
                        formData.append('visitas', product.visitas);
                          formData.append('nomImagen', product.nomImagen);
                            //formData.append('idproducto', product.idproducto);*/


                            formData.append('data', angular.toJson(product));



            $http.post(REST_ADD_URI, formData, {
            transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
            })
                .then(

            function(response){

                deferred.resolve(response.statusText);

            },

            function(errResponse){
                console.error('Error while creting Producto');
                deferred.reject(errResponse)
            }
            );
        return deferred.promise;

    }

//carga el combo seccion

    function cargaComboSeccion(){

            var deferred = $q.defer();
                $http.get(REST_ADD_URI_SECCION)
                .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching combo seccion');
                deferred.reject(errResponse);
            }
            );

                return deferred.promise;


    }

//carga el combo categorias segun la opcion seleccionada en el combo seccion

function cargaComboCategoria(seccion){

 //cargo el combo de subcategorias              

             if(seccion == null)  {

                //aqui hay que poner return por que sino no funciona  por que la funcion obtieneListadoCategorias   devuelve un return  y cargaComboCategoria  tiene que devolver un return 
                //si no le pongo return peta no funciona  lo mismo se aplica a   subcategoria.

             return obtieneListadoCategorias();
             }  else {
             return  obtieneListadoCategoriasSeccion(seccion);
             }                

            //fin combo de subcategorias
  }


//carga el combo subcategoria segun la opcion seleccionada en el combo categoria

  function cargaComboSubcategoria(categoria){

 //cargo el combo de subcategorias
            if( categoria == null){
                return obtieneListadoSubcategoria();
            }else{
                return obtieneListadoSubcategoriaCategoria(categoria);
            }          

            //fin combo de subcategorias
  }     

      function fetchProductoId(id){

        var deferred = $q.defer();
          $http.get(REST_SERVICE_URL + '-' + id)
          .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Productos');
                deferred.reject(errResponse);
            }
            );
          return deferred.promise;

    }

       

    function updateProducto(producto, id){
      var deferred = $q.defer();

      var formData = new FormData();
      //formData.append('fichero', file);
      //delete producto.urlFoto1;
      //delete producto.idproducto;

      formData.append('data', angular.toJson(producto));

       $http.put(REST_SERVICE_URL + '-' + id, producto)
      .then(function(response){
        deferred.resolve(response.statusText);
      }, function(errResponse){
        console.error('Error while fetching Productos');
          deferred.reject(errResponse);
      });
      return deferred.promise;

    }
          

   function deleteProducto(id){
      var deferred = $q.defer();
      $http.delete(REST_SERVICE_URL + '-' + id)
      .then(function(response){
          deferred.resolve(response.statusText);
      }, function(errResponse){
          console.log("Error while delete Producto")
            deferred.reject(errResponse);
      });
      return deferred.promise;

    }


function  obtieneListadoCategoriasSeccion(seccion){

 var deferred = $q.defer(); 
    $http.post(REST_ADD_URI_CATEGORIA, seccion)                
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching combo categoria');
                deferred.reject(errResponse);
            }
            );
    return deferred.promise;

};

function obtieneListadoCategorias(){

var deferred = $q.defer(); 
 $http.get(REST_ADD_URI_CATEGORIA)                
            .then(function (response) {
             deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching combo categoria');
                deferred.reject(errResponse);
            });
    return deferred.promise;

};


function obtieneListadoSubcategoria(){
      var deferred = $q.defer();          
            $http.get(REST_ADD_URI_SUBCATEGORIA)            
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching combo subcategoria');
                deferred.reject(errResponse);
            }
            );

             return deferred.promise;

}


function obtieneListadoSubcategoriaCategoria(categoria){

      var deferred = $q.defer();          
            $http.post(REST_ADD_URI_SUBCATEGORIA, categoria)            
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching combo subcategoria');
                deferred.reject(errResponse);
            }
            );

             return deferred.promise;

}
     			
     		
     	}])

    