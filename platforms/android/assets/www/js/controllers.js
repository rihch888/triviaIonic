angular.module('app.controllers', [])
  
.controller('menuCtrl', function($scope, $state, $ionicPopup, Auth, Data) {
  $scope.data = {};
  $scope.data.users = Data;
  Auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.data.firebaseUser = firebaseUser;
      //$scope.data.firebaseUser.displayname=firebaseUser.displayName;
      //alert($scope.data.firebaseUser.email);
      console.log(firebaseUser.displayName);
      
      Data.child("users").child(firebaseUser.uid).once('value', function (snapshot) {
        var key = snapshot.key;
        var childKey = snapshot.child("displayName").val(); 
        var childKey2 = snapshot.child("email").val(); 
        //alert(childKey+" : "+childKey2);
        $scope.data.firebaseUser.displayname = childKey;
        //alert($scope.data.firebaseUser.displayname);
      });

    });
  $scope.logOut = function(){


    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '',
      title: '¿Seguro que deseas cerrar sesión?',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Si</b>',
          type: 'button-assertive',
          onTap: function(e) {
            //alert(e);
          if(e) {
            //alert("Cerre sesión");
            firebase.auth().signOut().then(function() {
              $state.go('login');
              // Sign-out successful.
            }, function(error) {
              // An error happened.
            }); 
          }
        }
        }
      ]
    });
    
  
    /*firebase.auth().signOut().then(function() {
      $state.go('menu.login');
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    }); */
  }
})



.controller("loginCtrl", function($scope, $state, Auth, $ionicLoading, $ionicPopup) {
  $scope.data = {};
  $scope.show = function() {
    $ionicLoading.show({
        template: 'Iniciando Sesión...<br><br><ion-spinner icon="bubbles"></ion-spinner>',
    }).then(function(){
        console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
      $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
      });
  }
  $scope.showPopup = function() {


  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<center><a href="">¿Olvidaste tu contraseña?</a></center>',
    title: 'Correo electrónico o contraseña incorrectos',
    subTitle: 'Por favor vuelve a ingresar tus datos',
    scope: $scope,
    buttons: [
      
      {
        text: '<b>Aceptar</b>',
        type: 'button-positive',

      }
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
    $scope.data.password="";
  });
}
  //var auth = $firebaseAuth();
  $scope.loginEmail = function(){

    var email=$scope.data.username;
    var password=$scope.data.password;
    //alert($scope.data.password);
    $scope.show();
      Auth.$signInWithEmailAndPassword(email, password).then(function(firebaseUser){
        //alert(firebaseUser.email);
        $scope.hide();
        $state.go('menu.inicio');

      }).catch(function(error) {
        // Handle Errors here.
        $scope.hide();
        var errorCode = error.code;
        var errorMessage = error.message;
        $scope.showPopup();
        
        $scope.data.password = "";
        //alert("Usuario o contraseña incorrecta");
        // ...
      });
  }

  //$scope.loginFacebook = function(){
    /*var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    provider.addScope('user_birthday');
    provider.addScope('user_friends'); */

    /*var credential = new firebase.auth.FacebookAuthProvider.credential("");
    //var credential = firebase.auth.TwitterAuthProvider.credential(token, secret);
    firebase.auth().signInWithCredential(credential).then (function(result) {
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      alert(token);
      console.log(token);
    }); */
    //alert("Entra 1");
    /*$cordovaOauth.facebook("1120308468038109", ["email", "public_profile"]).then(function(result) {
        //console.log("Response Object -> " + JSON.stringify(result));
        alert("Entra Facebook");
        //$state.go('menu.inicio');
        //alert("Response Object -> " + JSON.stringify(result));
    }, function(error) {
        //console.log("Error -> " + error);
        //alert("Error");
        alert("Error -> " + error);
    }); */
   
    /*firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //alert(token);
      console.log(token);
      $state.go('menu.inicio');
      // ...
    }).catch(function(error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    }); */
   //}

  $scope.irRegistro = function(){
    $state.go('registro');
  }
})

.controller("registroCtrl", function($scope, $state, Auth, Data) {
  $scope.data = {};
  $scope.registrar = function() {
    var displayname = $scope.data.displayname;
    var email = $scope.data.username;
    var password = $scope.data.password;
     Auth.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {

          Data.child("users").child(firebaseUser.uid).set({
                email: email,
                displayName: displayname
            });
          //alert("Usuario creado uid: "+ firebaseUser.uid);
         $state.go('login');
        }).catch(function(error) {
          //$scope.error = error;
          alert(error);
        });

  }
  })

.controller("chatCtrl", function($scope, $firebaseArray, Auth, Data) {
  //alert(Auth.user);
    $scope.data = {};
    $scope.auth = Auth;


    // any time auth state changes, add the user data to scope
    Auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.data.firebaseUser = firebaseUser;

      $scope.data.firebaseUser.displayname = firebaseUser.displayName;
      Data.child("users").child(firebaseUser.uid).once('value', function (snapshot) {
        var key = snapshot.key;
        var childKey = snapshot.child("displayName").val(); 
        var childKey2 = snapshot.child("email").val(); 
        //alert(childKey+" : "+childKey2);
        $scope.data.firebaseUser.displayname = childKey;
      });

    });
      var refMsg = Data.child("messages");
      // create a synchronized array
      $scope.messages = $firebaseArray(refMsg);
      
      // add new items to the array
      // the message is automatically added to our Firebase database!
      $scope.addMessage = function() {
        $scope.messages.$add({
          text: $scope.data.message,
          email: $scope.data.firebaseUser.email,
          name: $scope.data.firebaseUser.displayname
          //email: $ionicUser.details.email,
          //name: $ionicUser.details.name
        });
        $scope.data.message = '';
      }
})

.controller("perfilCtrl", function($scope, Auth, Data, $cordovaFile) {
  $scope.data = {};
  $scope.data.users = Data;
  Auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.data.firebaseUser = firebaseUser;
      //$scope.data.firebaseUser.displayname=firebaseUser.displayName;
      //alert($scope.data.firebaseUser.email);
      console.log(firebaseUser.displayName);
      
      Data.child("users").child(firebaseUser.uid).once('value', function (snapshot) {
        var key = snapshot.key;
        var childKey = snapshot.child("displayName").val(); 
        var childKey2 = snapshot.child("email").val(); 
        //alert(childKey+" : "+childKey2);
        $scope.data.firebaseUser.displayname = childKey;
        //alert($scope.data.firebaseUser.displayname);
      });

    });

  $scope.upload = function() {
    alert("entra");
    
    
    
    }
})

.controller("inicioCtrl", function($scope, Auth, Data) {

})

.controller("preguntasCtrl", function($scope, Auth, Data, $ionicLoading) {
  $scope.data = {};
  $scope.data.score = 0;
  $scope.show = function() {
    $ionicLoading.show({
        template: 'Cargando...<br><br><ion-spinner icon="bubbles"></ion-spinner>',
    }).then(function(){
        console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
      $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
      });
  };
  $scope.show();
  Data.child("preguntas").once('value', function (snapshot) {
  var i = 0;
  var rand = Math.floor(Math.random() * snapshot.numChildren());
  snapshot.forEach(function(snapshot) {
    if (i == rand) {
      //alert(snapshot.val().pregunta+" - "+snapshot.val().res1+" - "+snapshot.val().res2+" - "+snapshot.val().res3+" - "+snapshot.val().correcta+" - "+snapshot.val().categoria);
      $scope.data.pregunta=snapshot.val().pregunta;
      $scope.data.res1=snapshot.val().res1;
      $scope.data.res2=snapshot.val().res2;
      $scope.data.res3=snapshot.val().res3;
      $scope.data.correcta=snapshot.val().correcta;
      $scope.data.categoria=snapshot.val().categoria;
      //$scope.data.archivo=snapshot.val().archivo;
      var fileName = snapshot.val().archivo;
      var storageRef = firebase.storage().ref().child("archivos_preguntas").child(fileName);
      storageRef.getDownloadURL().then(function(url) {
        //alert(url);

        $scope.data.archivo=url;
        console.log("URL: "+$scope.data.archivo);
        $scope.hide();
      });
    }
    i++;
  });
})

$scope.btn1 = function() {
  if ($scope.data.res1==$scope.data.correcta) {
    alert("Correcto!");
    $scope.data.score = $scope.data.score + 1;
  }else{
    alert("Incorrecto!");
  }
}
$scope.btn2 = function() {
  if ($scope.data.res2==$scope.data.correcta) {
    alert("Correcto!");
    $scope.data.score = $scope.data.score + 1;
  }else{
    alert("Incorrecto!");
  }
}
$scope.btn3 = function() {
  if ($scope.data.res3==$scope.data.correcta) {
    alert("Correcto!");
    $scope.data.score = $scope.data.score + 1;
  }else{
    alert("Incorrecto!");
  }
}

$scope.salir = function() {
  Auth.$onAuthStateChanged(function(firebaseUser) {
      //alert(firebaseUser.uid);
      var displayName = firebaseUser.displayname;
      var email = firebaseUser.email;
      
      Data.child("Score").push().set({
            name: displayName,
            email: email,
            score: $scope.data.score
        });
      alert(user);
    });
  }

})

.controller("scoreCtrl", function($scope, Auth, Data, $firebaseArray) {
  $scope.scores = {};
  var refScore = Data.child("Score");
  $scope.scores = $firebaseArray(refScore);
  var array = {};
  Data.child("Score").once('value', function (snapshot) {
    var num = snapshot.numChildren();
    //alert(num);
    
    snapshot.forEach(function(snapshot) {
      
        //alert(snapshot.val().user+" : "+snapshot.val().score);
        //array.user = snapshot.val().user;
    });

    
  });
  
  //alert($firebaseArray(refScore).$keyAt(0));
  /*Data.child("users").child($scope.scores.user).once('value', function (snapshot) {
    var childKey = snapshot.child("displayName").val(); 
    var childKey2 = snapshot.child("email").val();
    $scope.scores.userName = childKey;
  }); */
})
