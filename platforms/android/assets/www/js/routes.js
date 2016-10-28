angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
      .state('registro', {
    url: '/registro',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })  
      .state('menuSesion', {
    url: '/menuSesion',
    templateUrl: 'templates/menuSesion.html',
    controller: 'menuSesionCtrl'
  })
      .state('preguntas', {
    url: '/preguntas',
    templateUrl: 'templates/preguntas.html',
    controller: 'preguntasCtrl'
  })  
      .state('score', {
    url: '/score',
    templateUrl: 'templates/score.html',
    controller: 'scoreCtrl'
  })  

$urlRouterProvider.otherwise('/login')

  

});