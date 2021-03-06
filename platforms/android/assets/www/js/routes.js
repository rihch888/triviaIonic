angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
      .state('login', {
    url: '/login',
    templateUrl: 'templates/menuInicio.html',
    controller: 'loginCtrl'
  }) 
      .state('registro', {
    url: '/registro',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })
      .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })
      .state('menu.inicio', {
    url: '/inicio',
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio.html',
        controller: 'inicioCtrl'
      }
    }
  })
      .state('menu.jugar', {
    url: '/jugar',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/jugar.html',
        controller: 'jugarCtrl'
      }
    }
  })
      .state('menu.preguntas', {
    url: '/preguntas',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/preguntas.html',
        controller: 'preguntasCtrl'
      }
    }
  })
      .state('menu.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'chatCtrl'
      }
    }
  })
      .state('menu.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })
    .state('menu.score', {
    url: '/score',
    views: {
      'menuContent': {
        templateUrl: 'templates/score.html',
        controller: 'scoreCtrl'
      }
    }
  })  

    .state('menu.eventos', {
    url: '/eventos',
    views: {
      'menuContent': {
        templateUrl: 'templates/eventos.html',
        controller: 'eventosCtrl'
      }
    }
  })  
    .state('menu.jugarEvento', {
    url: '/jugarEvento',
    views: {
      'menuContent': {
        templateUrl: 'templates/jugarEvento.html',
        controller: 'jugarEventoCtrl'
      }
    }
  }) 


$urlRouterProvider.otherwise('/login')

  

});