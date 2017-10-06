 
        'use strict';

        /**
        * @ngdoc function
        * @name testAngularJsApp.directive:directivefile
        * @description
        * # directivefile
        * directive of the testAngularJsApp
        */



   angular.module('testAngularJsApp').directive('uploaderModel', ["$parse", function($parse){

  return {

  restrict: 'A',
  link: function(scope, iElement, iAttrs){

  iElement.on("change", function(e){

  $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);

  });


  }

  };

   }])
