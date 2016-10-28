angular.module('app.controllers', [])
  
.controller('menuInicioCtrl', function($scope, $state) {
	$scope.irRegistro = function(){
		$state.go('registro');
  	}

	$scope.irLogin = function(){
		$state.go('login');
	}
})

.controller('registroCtrl', function($scope, $state) {
	$scope.data = {};

	$scope.registrar = function(){
		var user = new CB.CloudUser();
		user.set('username', $scope.data.username);
		user.set('password', $scope.data.password);
		user.set('email', $scope.data.username);
		user.signUp({
				success: function(user) {
				//Registration successfull
				alert("Registro exitoso!!");
				$state.go('login');
			},
				error: function(err) {
				//Error in user registration.
				alert("Error!");
			}
		});
  }
}) 

.controller('loginCtrl', function($scope, $state) {
	$scope.data = {};
	$scope.loginEmail = function(){
		var user = new CB.CloudUser();
		user.set('username', $scope.data.username);
		user.set('password', $scope.data.password);
		user.logIn({
		success: function(user) {
			$state.go('menuSesion');
			//Login successfull
		},
		error: function(err) {
			//Error occured in user registration.
			alert("Usuario o contrasena incorrecta");
		}
	});

  }
  $scope.irRegistro = function(){
		$state.go('registro');
  	}
})

.controller('menuSesionCtrl', function($scope, $state) {
	$scope.data = {};
	$scope.irPreguntas = function(){
		$state.go('preguntas');
  	}
	$scope.irScore = function(){
		$state.go('score');
  	}
  
})

.controller('preguntasCtrl', function($scope, $state, $interval, Data) {
	$scope.counter = 10;
	var increaseCounter = function () {
    	$scope.counter = $scope.counter - 1;
    }
    var myInterval = $interval(increaseCounter, 1000, 10);
    myInterval.then(function () { 
    	//alert("Tu tiempo se acabó."); 
    });
    $scope.preguntas = Data.all2();
    $scope.btn1 = function() {

    	if($scope.preguntas.res1==$scope.preguntas.corr){
    		alert("Correcto!");
    	}else{
    		alert("Incorrecto!");
    	}
    }
    $scope.btn2 = function() {

    	if($scope.preguntas.res2==$scope.preguntas.corr){
    		alert("Correcto!");
    	}else{
    		alert("Incorrecto!");
    	}
    }
    $scope.btn3 = function() {

    	if($scope.preguntas.res3==$scope.preguntas.corr){
    		alert("Correcto!");
    	}else{
    		alert("Incorrecto!");
    	}
    }
})

.controller('scoreCtrl', function($scope, $state, Data) {
	//$scope.verScore = function(){
		$scope.scores = Data.all();
		
  	//}
})

