angular.module('app.controllers', [])
  

/** Controlador encargado de procesar las todos */
.controller("loginCtrl", function($scope, $state, $firebaseAuth) {
  $scope.data = {};
  

  var auth = $firebaseAuth();
  $scope.loginEmail = function(){
    var email=$scope.data.username;
    var password=$scope.data.password;
    //alert($scope.data.password);
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser){
        //alert(firebaseUser.email);
         $state.go('chat');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Usuario o contraseña incorrecta");
        // ...
      });
  }
  
  

  
})

.controller("chatCtrl", function($scope, $firebaseArray, Auth) {
  //alert(Auth.user);
  $scope.data = {
        
    }
    
      var ref = firebase.database().ref().child("messages");
      // create a synchronized array
      $scope.messages = $firebaseArray(ref);
      
      // add new items to the array
      // the message is automatically added to our Firebase database!
      $scope.addMessage = function() {
        $scope.messages.$add({
          text: $scope.data.message,
          email: 'rihch888@gmail.com',
          name: 'Ricardo'
          //email: $ionicUser.details.email,
          //name: $ionicUser.details.name
        });
        $scope.data.message = '';
      }
})
