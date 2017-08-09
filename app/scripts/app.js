'use strict';

/**
 * @ngdoc overview
 * @name testAngularJsApp
 * @description
 * # testAngularJsApp
 *
 * Main module of the application.
 */
angular
  .module('testAngularJsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //en yeoman es solo poner est alinea y ya las rutas  van bien
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl()',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/usuarios', {
        templateUrl: 'views/TablaUsuarios.html',
        controller: 'UserCtrl'
       
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'UseCreationUpdateCtrl'
      })
      .when('/add/:id', {
        templateUrl: 'views/add.html',
        controller: 'UseCreationUpdateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    
  }]);
