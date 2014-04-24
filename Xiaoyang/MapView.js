 $(window).on('load resize', function () {
     $('body').css({
         "padding-top": $(".navbar").height() + 30 + "px"
     });
 });
var getid;
var scoreshow;
 $(document).ready(function () {

     initialize();
     var countChecked = function () {
         // console.log("c");
         var checked = $('input:checked');
         var checkedID = [];
         var checkselect = '';
         // console.log("checkedID");
         checked.each(function () {
             checkedID.push(this.id);
         });

         console.log(checkedID);

         $.each(checkedID, function (index, value) {
             checkselect = checkselect + '.' + value;
         });
         console.log(checkselect);

         var rows = $('table.table.table-striped tr');
         console.log(rows);

         var shows = rows.filter(checkselect);
         console.log(shows);
         shows.show('slow');
         rows.not(shows).hide();

         if(checkselect.indexOf("tech.f0")>=0)
             myFunctionQuery_G();
         if(checkselect.indexOf("tech.f1")>=0)
             myFunctionQuery_1();
         if(checkselect.indexOf("tech.f2")>=0)
             myFunctionQuery_2();
         if(checkselect.indexOf("tech.f3")>=0)
             myFunctionQuery_3();
         if(checkselect.indexOf("tech.f4")>=0)
             myFunctionQuery_4();
         
     };

     $(":radio").change(countChecked);

     $("#view-list").on('click', function () {
         console.log("list");
         $('#list').show();
         $('#map').hide();
     });
     $("#view-map").on('click', function () {
         console.log("map");
         $('#map').show();
         $('#list').hide();
     })

     $("#details").on('show.bs.modal',function(e){

        var invoker = $(e.relatedTarget);
        getid = invoker.prop('id');      


Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("TechBathroom");
  var query = new Parse.Query(GameScore);
  query.equalTo("name",getid);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved Male" + results.length + " scores.");
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
       scoreshow = object.get("overall");      
        if (scoreshow>0)
          scoreshow = Math.round(scoreshow/object.get("number"));

      }
        $(".starraty").raty({
          readOnly: true,
          score : scoreshow

        })      
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
  });
  //======
  









        console.log(getid);
        console.log($(".modal-body"));
     })
 //    $("#details").on('hide.bs.modal',function(e){


 //    }

     // console.log($('tbody').children().length);

     // $('tbody').children().each(function(){
     //     $(this).attr({
     //         data-toggle : "modal",
     //         data-target : "#details"
     //     });
     // });



 });

function redraw(obj){
    var scorestar = obj.get('overall');
    if (scorestar>0)
      scorestar = Math.round(scorestar/obj.get('number'));
    // console.log(scorestar);

    var to_append = '<tr class = "'+ obj.get('gender') + ' ' +
                    'tech' + ' '+ 'f'+obj.get('floor')+'" '
                    +'data-toggle = "modal" data-target="#details" '+'id = "'+obj.get('name')+'">'+
                        '<td>'+obj.get('name')+'</td>'+
                        '<td><div id = "'+obj.get('name')+'-" value = "'+scorestar+'"></div></td></tr>';


  $('tbody').append(to_append);
  $('tbody').find('#'+obj.get('name')+'-').raty({
    half : true,
    readOnly: true,
    score: scorestar
  })

}


var overall;



function initialize() {

//======
Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("TechBathroom");
  var query1 = new Parse.Query(GameScore);
  var query2 = new Parse.Query(GameScore);


  query1.equalTo("gender","M")&&query1.descending("waittime");
  query2.equalTo("gender","F")&&query2.descending("waittime");
  query1.find({
    success: function(results) {
      console.log("Successfully retrieved Male" + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var number2 = object.get('number');
        var over = object.get('overall');
        if (over>0){
          var ave = over/number2;
          object.set("waittime",ave);
          object.save();
        }
        // console.log(object.get('gender'));
        redraw(object);

      }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
  });
  //======
  query2.find({
    success: function(results) {
      console.log("Successfully retrieved Famle" + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var number2 = object.get('number');
        var over = object.get('overall');
        if (over>0){
          var ave = over/number2;
          object.set("waittime",ave);
          object.save();
        }        
        // console.log(object.get('gender'));
        redraw(object);


      }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
  });



























    
    $('#list').hide();

     $('.raty').raty({
        click : function(score){
            overall = score;
//            alert(overall)
        }

     });
}
var newscore;
function myFunctionChange(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("TechBathroom");
  var query = new Parse.Query(GameScore);
  query.equalTo("name",getid);
  query.find({
    success: function(results) {
//      alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var number1;
        var review;
        number1 = object.get('number');
        review = object.get('overall');
        number1 = number1+1;
        review = review + overall;
        object.set("number", number1);
        object.set("overall", review);
        var arv = Math.round(review/number1);
        object.set("waittime",arv);
        object.save();
//        alert(object.get('number'));
        newscore = Math.round(object.get('overall')/object.get('number'));
        $('tbody').find('#'+object.get('name')+'-').raty({
          half : true,
          readOnly: true,
          score: newscore
        })
     $('.raty').raty({
        click : function(score){
            overall = score;
//            alert(overall)
        }

     });  
      }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
  });

};

function query_bath(){

}
