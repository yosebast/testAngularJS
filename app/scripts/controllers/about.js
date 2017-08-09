'use strict';

/**
 * @ngdoc function
 * @name testAngularJsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testAngularJsApp
 */
angular.module('testAngularJsApp')
  .controller('AboutCtrl', ['$scope', function ($scope) {
   
$scope.tareas = [{texto:'Ser Super Heroico con AngularJs', hecho:true},{texto:'Crear una app con angularjs', hecho:false}];

$scope.agregarTarea = function(){
$scope.tareas.push({texto:$scope.writeTarea, hecho:false});
$scope.writeTarea = '';  //limpa la caja de texto
};


//si vemos esta parte del ejemplo ,  esta function se ejecuta cada vez que selecciono o deselecciono los checkbox

$scope.resto = function(){
var cantidad = 0;
angular.forEach($scope.tareas, function(tarea){
cantidad +=   tarea.hecho ? 1 : 0;	
});
	return cantidad;
}


$scope.eliminar = function(){

	var viejasTareas = $scope.tareas;	
	$scope.tareas = [];

	angular.forEach(viejasTareas, function(tarea){

		if( !tarea.hecho ) $scope.tareas.push(tarea);
		
	});
}

 }]);
