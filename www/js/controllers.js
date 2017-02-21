angular.module('app.controllers', [])
  
.controller('menuCtrl', function($scope, $state, $ionicPopup, Auth, Data, $ionicLoading) {
  $scope.data = {};
  $scope.show = function() {
    $ionicLoading.show({
        template: 'Cargando...<br><br><ion-spinner icon="bubbles"></ion-spinner>',
    }).then(function(){
        //console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
      $ionicLoading.hide().then(function(){
          //console.log("The loading indicator is now hidden");
      });
  }
  $scope.data.users = Data;
  $scope.show();
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
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.data.firebaseUser.displayname = childKey;
            $scope.hide();
          });
          }, 1);
        
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

.controller("eventosCtrl", function($scope, Auth, Data, $firebaseArray, $localStorage, $location) {
  $scope.eventos = {};
  $scope.data = {};
  var refEv = Data.child("eventos");
  var refSc = Data.child("Score");
  $localStorage.evento="";
  /*refEv.orderByKey().on("child_added", function(snapshot) {
      //TODOS LOS EVENTOS
      $localStorage.evento=snapshot.key; 
      

    }); */
    var accesoUsuario = 0;
    Auth.$onAuthStateChanged(function(firebaseUser) { 
        Data.child("users").child(firebaseUser.uid).once('value', function (snapshot) { //DATOS DE USUARIO LOGEADO
          var key = snapshot.key;
          var accEv = snapshot.child("accesoEvento").val();
          //alert(accEv);
          if(accEv==1){
            accesoUsuario=1;
            //alert("acceso usuario");
          }else{
            accesoUsuario=0;
          } 
            
          // IMPORTANTE: Cuando se acabe el evento, cambiar "jugar" a ""
        });

      });

    $scope.ruta = function(obj){
        if (obj.estado==0) {
          //alert("Activo");
          
        if(accesoUsuario==1){ // acceso usuario activado
          $location.url("/menu/jugar");
          $localStorage.evento=obj;
        }else{
          $location.url("/menu/score");
          $localStorage.evento=obj;
        }



          
        }else{
          //alert("Inactivo");
          //alert($location.url());
          $location.url("/menu/score");
          $localStorage.evento=obj;
        }
      }

    
    setTimeout(function () {
      $scope.$apply(function () {
        $scope.eventos = $firebaseArray(refEv);
      });
    }, 1000);
    
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

.controller("perfilCtrl", function($scope, Auth, Data, $ionicHistory, $cordovaCamera, $cordovaFile) {
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

  
  /*function dataURItoBlob(dataURI) {
    'use strict'
    var byteString, 
        mimestring 

    if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
        byteString = atob(dataURI.split(',')[1])
    } else {
        byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], {type: 'image/jpeg'});
} */


  $scope.upload = function() {
    //alert("entra");
    
    var options = {
      quality : 75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JEPG,
      popoverOptions: CameraPopoverOptions,
      mediaType: Camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      
    }
    $cordovaCamera.getPicture(options).then(function(imageData){
      Auth.$onAuthStateChanged(function(firebaseUser) {
      var image = document.getElementById('profile-image');
      image.src = imageData;
      var directorioFuente = imageData.substring(0, imageData.lastIndexOf('/') + 1),
      archivoFuente = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.length);
      //nombreParaGuardar = new Date().valueOf() + archivoFuente;

      //alert(directorioFuente);
      //alert(archivoFuente);
      //alert(nombreParaGuardar);
      //alert(imageData);
      //var blob = new Blob([imageData], {type: 'image/jpeg'});
      //alert(blob);
      //var blob = null;

      /*$cordovaFile.readAsArrayBuffer(directorioFuente, archivoFuente).then(function (success) {
            //var blob = new Blob([new Uint8Array(success)], {type: 'image/jpeg'});
            alert("exito!");
            //enviarFirebase(blob, nombreParaGuardar);
        }, function (error) {
          alert("error: "+error);
            console.error(error);
        }); */
        
        /*window.resolveLocalFileSystemURL(imageData, function (fileEntry) {
             fileEntry.file(function (file) {
                 var reader = new FileReader();
                 reader.onloadend = function () {
                          // This blob object can be saved to firebase
                          var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
                          alert("si");               
                          //sendToFirebase(blob);
                 };
                 reader.readAsArrayBuffer(file);
              });
          }, function (error) {
              errorCallback(error);
          }); */


      /*$cordovaFile.readAsArrayBuffer(directorioFuente, archivoFuente)
        .then(function (success) {
            var blob = new Blob([success], {type: 'image/jpeg'});
            alert(success);
            //enviarFirebase(blob, nombreParaGuardar);
        }, function (error) {
          alert("error"+error);
            console.error(error);
        });*/
      
      // ---------------------------------------------------------------------------
      //var dataURL = imageData.toDataURL('image/jpeg', 0.5);
      //var blob = dataURItoBlob(dataURL);
      //var blob = dataURItoBlob(imageData);
      //var storageRef = firebase.storage().ref().child("photos/photo.jpg").put(imageData[0]);
      
      //alert("alerta exito!");
      
      //Data.child("users").child(firebaseUser.uid).update({
        //displayName: "Ricardo 888"
      //  avatar: imageData
      //}); 
      
      //alert("alerta 3: "+firebaseUser.uid);
      });
    }, function(error){
      alert("error");
      console.error("ERROR: "+error);
    });
    
    }
})

.controller("inicioCtrl", function($scope, Auth, Data, $localStorage) {
  $scope.data = {};
  Auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.data.firebaseUser = firebaseUser;
      //$scope.data.firebaseUser.displayname=firebaseUser.displayName;
      //alert($scope.data.firebaseUser.email);
      console.log(firebaseUser.displayName);

      
      Data.child("users").child(firebaseUser.uid).once('value', function (snapshot) {
        
        
        //setTimeout(function () {
          $scope.$apply(function () {
            $scope.data.name = snapshot.child("displayName").val(); 
            
          });
          //}, 1);
      });

    });
  $localStorage.score=0;
  $localStorage.op=5;
  $localStorage.evento="";
})

.controller("jugarCtrl", function($scope, Auth, Data, $localStorage, $state) {
  $scope.data = {};
  //$localStorage.clear();
  
  //alert($localStorage.evento);
  //query para sacar todos los datos del evento $localStorage.evento
  if($localStorage.evento) {
    var idEvento = $localStorage.evento.$id;
    Data.child("eventos").child(idEvento).once('value', function (snapshot) {
    $scope.data.evento=snapshot.child("nombre").val();
  });
  }else{
  }
  
  

  $scope.random = function() {
    //alert("entra 1");
    Data.child("preguntas").once('value', function (snapshot) {
      //alert("entra 2");
      var i = 0;
      var rand = Math.floor(Math.random() * snapshot.numChildren());
      snapshot.forEach(function(snapshot) {
        //alert("entra 3");
        //alert(snapshot.val().categoria);
        //alert(i);
        if (i == rand) {
          
          //alert(snapshot.val().pregunta);
          //alert(snapshot.val().categoria);
          
          $localStorage.pregunta=snapshot.val().pregunta;
          $localStorage.res1=snapshot.val().res1;
          $localStorage.res2=snapshot.val().res2;
          $localStorage.res3=snapshot.val().res3;
          $localStorage.correcta=snapshot.val().correcta;
          $localStorage.archivo=snapshot.val().archivo;
          $localStorage.categoria=snapshot.val().categoria;
          //alert(i+" rand: "+snapshot.val().pregunta);
          setTimeout(function () {
          $scope.$apply(function () {
            $scope.data.categoria=snapshot.val().categoria;
          });
          }, 50);
        }
        i++;
      });
    });
    
    $scope.play=true;
  }

  $scope.jugar = function() {
    setTimeout(function () {
      $scope.$apply(function () {
        $scope.data.categoria="";
      });
    }, 200);
    $scope.play=false;

    $state.go('menu.preguntas');
  }
  
})



.controller("preguntasCtrl", function($scope, Auth, Data, $ionicLoading, $localStorage, $ionicPopup, $state, $ionicHistory,  $interval, $timeout) {
  $scope.data = {};
  $scope.data.score = $localStorage.score;
  $scope.data.op = $localStorage.op;
  //alert($localStorage.evento.$id);
  if($localStorage.evento!="") {
    var idEvento = $localStorage.evento.$id;
    Data.child("eventos").child(idEvento).once('value', function (snapshot) {
    $scope.data.evento=snapshot.child("nombre").val();
  });
  }else{
  }
  $scope.showPopupTime = function () {
      var myPopup2 = $ionicPopup.show({
      template: '<center><img width="40%" ng-src="img/timer1.png" ></center>',
      title: 'Se acabó el tiempo para contestar!',
      subTitle: '',
      scope: $scope,
      buttons: [
        
        {
          text: '<b>Aceptar</b>',
          type: 'button-assertive',
          onTap: function(e) {
            //alert(e);
          if (e) {
            $localStorage.op=$localStorage.op-1;
            if ($localStorage.op==0) {
              $scope.showPopupLose();
            } else {
              $state.go("menu.jugar");
            } 
            
          }
        }
        }
      ]
    });
    }

 
   // q29 s15
  var time = null;
  $scope.counter = 100;
  $scope.startTimer = function() {
     var countUp = function() {
        
        $scope.counter-= 1;
        time = $timeout(countUp, 150);
        //console.log($q.counter);
        if ($scope.counter==0) { 
          //alert("funciona!"+$q.counter);
          
          $timeout.cancel(time);
          //$scope.counter = 100;
          $scope.showPopupTime();
        }
      }
      countUp();
    }



     
    
  
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

      $scope.data.pregunta=$localStorage.pregunta;
      $scope.data.res1=$localStorage.res1;
      $scope.data.res2=$localStorage.res2;
      $scope.data.res3=$localStorage.res3;
      $scope.data.correcta=$localStorage.correcta;
      $scope.data.categoria=$localStorage.categoria;
      //$scope.data.archivo=snapshot.val().archivo;
      if($localStorage.archivo!="") {
      var fileName = $localStorage.archivo;
      var storageRef = firebase.storage().ref().child("archivos_preguntas").child(fileName);
      storageRef.getDownloadURL().then(function(url) {
        //alert(url);

        $scope.data.archivo=url;
        console.log("URL: "+$scope.data.archivo);
        $scope.hide();
        $scope.startTimer();
      });
      }else{
        $scope.hide();
        $scope.startTimer();
      }

      $scope.showPopupLose = function () {
      var myPopup1 = $ionicPopup.show({
      template: '<center><img width="40%" ng-src="img/sad1.png" ></center>',
      title: 'Perdiste todas tus oportunidades!',
      subTitle: 'Tu score es de: '+$localStorage.score,
      scope: $scope,
      buttons: [
        
        {
          text: '<b>Aceptar</b>',
          type: 'button-positive',
          onTap: function(e) {
            //alert(e);
          if (e) {
            
              Auth.$onAuthStateChanged(function(firebaseUser) {
                
              if($localStorage.evento!=""){
                var updates = {};
                updates['/users/' + firebaseUser.uid+ '/accesoEvento'] = 0;
                Data.update(updates);
              }

                //alert(firebaseUser.uid);
                var displayName = firebaseUser.displayname;
                var email = firebaseUser.email;
                Data.child("Score").push().set({
                    name: displayName,
                    email: email,
                    score: $localStorage.score,
                    evento: $localStorage.evento.$id
                }, function(error) {
                  if(error) {
                    alert(error);
                  }else{
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                   

                    $localStorage.score=0;
                    $localStorage.op=5;
                    $localStorage.evento="";
                    
                    $scope.data.score=0;
                    $scope.data.op=5;
                    $state.go("menu.inicio");
                  }
                });
            });
            
          }
        }
        }
      ]
    });
    }

      $scope.showPopupCorrecto = function () {
      var myPopup1 = $ionicPopup.show({
      template: '<center><img width="40%" ng-src="img/success1.png" ></center>',
      title: 'Correcto!',
      subTitle: '',
      scope: $scope,
      buttons: [
        
        {
          text: '<b>Aceptar</b>',
          type: 'button-balanced',
          onTap: function(e) {
            //alert(e);
          if(e) {

            //var new_value =  parseInt(localStorage.getItem('num')) + 1
            $localStorage.score=$localStorage.score+1;
            

            //setTimeout(function () {
              //$scope.$apply(function () {
                //$scope.data.score=$localStorage.score;
                $state.go("menu.jugar");
                //alert($localStorage.score);
              //});
              //}, 1000);

          }
        }
        }
      ]
    });
    }
    $scope.showPopupIncorrecto = function () {
      var myPopup1 = $ionicPopup.show({
      template: '<center><img width="40%" ng-src="img/wrong1.png" ></center>',
      title: 'Incorrecto!',
      subTitle: '',
      scope: $scope,
      buttons: [
        
        {
          text: '<b>Aceptar</b>',
          type: 'button-assertive',
          onTap: function(e) {
            //alert(e);
          if (e) {
            $localStorage.op=$localStorage.op-1;
            if ($localStorage.op==0) {
              $scope.showPopupLose();
            } else {
              $state.go("menu.jugar");
            }
            
          }
        }
        }
      ]
    });
    }

    $scope.salir = function(){
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '',
      title: '¿Seguro que deseas salir del juego?',
      subTitle: 'Tu score es de: '+$localStorage.score,
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Si</b>',
          type: 'button-assertive',
          onTap: function(e) {
            //alert(e);
          if(e) {
            Auth.$onAuthStateChanged(function(firebaseUser) {
              //alert(firebaseUser.uid);
              
              var displayName = firebaseUser.displayname;
              var email = firebaseUser.email;
              
              Data.child("Score").push().set({
                    name: displayName,
                    email: email,
                    score: $localStorage.score,
                }, function(error) {
                  if(error) {
                    alert(error);
                  }else{
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                    $localStorage.score=0;
                    $localStorage.op=5;
                    $scope.data.score=0;
                    $scope.data.op=5;
                    $state.go("menu.inicio");
                  }
                });
              
              
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
    

$scope.btn1 = function() {
  //alert();
  $timeout.cancel(time);
  if ($scope.data.res1==$scope.data.correcta) {

    $scope.showPopupCorrecto();
    //$scope.data.score = $scope.data.score + 1;
  }else{
    $scope.showPopupIncorrecto();
    
  }
  
}
$scope.btn2 = function() {
  $timeout.cancel(time);
  if ($scope.data.res2==$scope.data.correcta) {
    $scope.showPopupCorrecto();
    
    //$scope.data.score = $scope.data.score + 1;
  }else{
    $scope.showPopupIncorrecto();
    
  }
}
$scope.btn3 = function() {
  $timeout.cancel(time);
  if ($scope.data.res3==$scope.data.correcta) {
    $scope.showPopupCorrecto();
    
    //$scope.data.score = $scope.data.score + 1;
  }else{
    $scope.showPopupIncorrecto();
    
  }
}



})

.controller("scoreCtrl", function($scope, Auth, Data, $firebaseArray, $localStorage) {
  $scope.scores = {};
  var refScore = Data.child("Score");

  $scope.data.idEvento=$localStorage.evento.$id;
  $scope.data.nombreEvento=$localStorage.evento.nombre;
  //alert($localStorage.evento.nombre);

  if ($localStorage.evento!="") {
    var arr = [];
    var query = Data.child("Score").orderByChild('evento').equalTo($localStorage.evento.$id);
    query.on('value', function (snapshot){
      
      snapshot.forEach(function(child) {
        arr.push(child.val());
      });
      //console.log(arr);
      for (var i = 1; i < arr.length; i++) {
        for (var j = 0; j < (arr.length-i); j++) {
          //console.log(arr[j+1].score);
          if(arr[j].score>arr[j+1].score){
             var aux=arr[j];
             arr[j]=arr[j+1];
             arr[j+1]=aux;
          }
        }
      }
      //console.log(arr);
    });

    setTimeout(function () {
      $scope.$apply(function () {
        $scope.scores = arr;
      });
    }, 1000);
    

  }else{
    //hacer query para todos los scores que no tienen "evento"
  //var query = Data.child("Score").orderByChild('score');
  //$scope.scores = $firebaseArray(query);
  var arr = [];
    var query = Data.child("Score").orderByChild('evento').equalTo("");
    query.on('value', function (snapshot){
      
      snapshot.forEach(function(child) {
        arr.push(child.val());
      });
      //console.log(arr);
      for (var i = 1; i < arr.length; i++) {
        for (var j = 0; j < (arr.length-i); j++) {
          //console.log(arr[j+1].score);
          if(arr[j].score>arr[j+1].score){
             var aux=arr[j];
             arr[j]=arr[j+1];
             arr[j+1]=aux;
          }
        }
      }
      //console.log(arr);
    });

    setTimeout(function () {
      $scope.$apply(function () {
        $scope.scores = arr;
      });
    }, 1000);
  }
  
  
  //alert($firebaseArray(refScore).$keyAt(0));
  /*Data.child("users").child($scope.scores.user).once('value', function (snapshot) {
    var childKey = snapshot.child("displayName").val(); 
    var childKey2 = snapshot.child("email").val();
    $scope.scores.userName = childKey;
  }); */
})

