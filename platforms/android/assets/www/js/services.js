angular.module('app.services', [])

.factory('Data', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var score = [{}];

  var query = new CB.CloudQuery("score");
  query.orderByDesc('score');
    query.find({
    success: function(list){

      var query2 = new CB.CloudQuery("User");
      query2.find({
      success : function(list2){
        //alert(list2.length);
        for (var i = 0; i < list.length; i++) {
          score[i]=list[i];
          score[i].score=list[i].get('score');
          for (var j = 0; j < list2.length; j++) {
            if(list[i].get('user').get("id")==list2[j].get("id")) {
              score[i].username=list2[j].get("username");
            }
          }
        }

      }, error : function(error){
          //error
    }
    });

    },
    error: function(err) {
    //Error in retrieving the data.
    }
    });


     var pregunta = [];

    var query = new CB.CloudQuery("preguntas");
  
    query.find({
    success: function(list){
      //alert(list.length);
      //for (var i = 0; i < list.length; i++) {
      var random = Math.floor((Math.random() * list.length));
      //alert(random);
      pregunta.pregunta=list[random].get('pregunta');
      pregunta.res1=list[random].get('respuesta1');
      pregunta.res2=list[random].get('respuesta2');
      pregunta.res3=list[random].get('respuesta3');
      pregunta.corr=list[random].get('correcta');
      pregunta.cat=list[random].get('categoria');
    //}

    },
    error: function(err) {
    //Error in retrieving the data.
    alert("Error!");
    }
    });


  return {
    all: function() {
      return score;
    },
    all2: function() {
      return pregunta;
    }
  };
});


