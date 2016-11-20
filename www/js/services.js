angular.module('app.services', [])

.factory("Auth", function( $firebaseAuth ) {
	return $firebaseAuth();
})

.factory("Data", function( $firebaseArray ) {
	var ref = firebase.database().ref();
  	return ref;
})