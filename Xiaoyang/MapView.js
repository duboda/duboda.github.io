 $(window).on('load resize', function () {
     $('body').css({
         "padding-top": $(".navbar").height() + 30 + "px"
     });
 });
var getid;
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

         if(checkselect.indexOf("tech-g")>=0)
             myFunctionQuery_G();
         if(checkselect.indexOf("tech-f1")>=0)
             myFunctionQuery_1();
         if(checkselect.indexOf("tech-f2")>=0)
             myFunctionQuery_2();
         if(checkselect.indexOf("tech-f3")>=0)
             myFunctionQuery_3();
         if(checkselect.indexOf("tech-f4")>=0)
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
        console.log(getid);
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
var overall;

 function initialize() {
    $('#list').hide();
     var column_stars = $("#stars").index();
     $('tbody').children().each(function () {
         $(this).find('td').eq(column_stars).raty({
             readOnly: true,
             score: 3
         });

     })
     $('.raty').raty({
        click : function(score){
            overall = score;
            alert(overall)
        }

     });
}

function myFunctionChange(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("TechBathroom");
  var query = new Parse.Query(GameScore);
  query.equalTo("name",getid);
  query.find({
    success: function(results) {
      alert("Successfully retrieved " + results.length + " scores.");
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
        object.save();
        alert(object.get('number'));
      }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
  });

};