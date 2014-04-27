 $(window).on('load resize', function () {
     $('body').css({
         "padding-top": $(".navbar").height() + 30 + "px"
     });
 });
 var getid;
 var scoreshow;
 var overall;
 var newscore;

 var current_building;

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

     var rows = $('table.table tr');
     console.log(rows);

     var shows = rows.filter(checkselect);
     console.log(shows);
     shows.show('slow');
     rows.not(shows).hide();
     $('table.table').find($('#head')).show();

     if (checkselect.indexOf("tech.f0") >= 0)
         myFunctionQuery_G();
     if (checkselect.indexOf("tech.f1") >= 0)
         myFunctionQuery_1();
     if (checkselect.indexOf("tech.f2") >= 0)
         myFunctionQuery_2();
     if (checkselect.indexOf("tech.f3") >= 0)
         myFunctionQuery_3();
     if (checkselect.indexOf("tech.f4") >= 0)
         myFunctionQuery_4();
     if (checkselect.indexOf("mudd.f1") >= 0)
         alert("you can you up!mf1");
     if (checkselect.indexOf("mudd.f2") >= 0)
         alert("you can you up!mf2");
     if (checkselect.indexOf("mudd.f3") >= 0)
         alert("you can you up!mf3");
     if (checkselect.indexOf("francis.f1") >= 0)
         alert("you can you up!ff1");
     if (checkselect.indexOf("francis.f2") >= 0)
         alert("you can you up!ff2");
     if (checkselect.indexOf("francis.f3") >= 0)
         alert("you can you up!ff3");

 };

 function roundHalf(num) {
     num = Math.round(num * 2) / 2;
     return num;
 }

 $(document).ready(function () {

     initialize();

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

     $("#details").on('show.bs.modal', function (e) {

         var invoker = $(e.relatedTarget);
         getid = invoker.prop('id');
         console.log(getid);


         Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
         var GameScore = Parse.Object.extend("TechBathroom");
         var query = new Parse.Query(GameScore);
         query.equalTo("name", getid);
         query.find({
             success: function (results) {
                 console.log("Successfully retrieved Male" + results.length + " scores.");
                 for (var i = 0; i < results.length; i++) {
                     var object = results[i];
                     scoreshow = object.get("overall");
                     if (scoreshow > 0)
                         scoreshow = roundHalf(scoreshow / object.get("number"));

                 }
                 $(".starraty").raty({
                     readOnly: true,
                     score: scoreshow

                 })
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         });
         //======




         // console.log(getid);
         // console.log($(".modal-body"));
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

 function redraw(obj) {
     var scorestar = obj.get('overall');
     if (scorestar > 0)
         scorestar = roundHalf(scorestar / obj.get('number'));
     // console.log(scorestar);
     var gender = obj.get('gender');
     var color;
     if(gender === 'M') color = ' style = "background: radial-gradient(#cfd8fc, rgba(255,0,0,0))" ';
     else color = ' style = "background: radial-gradient(#fccfcf, rgba(255,0,0,0))" ';

     var to_append = '<tr '+ color +' class = "' + obj.get('gender') + ' ' +
         'tech' + ' ' + 'f' + obj.get('floor') + '" ' + 'data-toggle = "modal" data-target="#details" ' + 'id = "' + obj.get('name') + '">' +
         '<td>' + obj.get('name') + '</td>' +
         '<td><div id = "' + obj.get('name') + '-" value = "' + scorestar + '"></div></td></tr>';


     $('tbody').append(to_append);
     $('tbody').find('#' + obj.get('name') + '-').raty({
         half: true,
         readOnly: true,
         score: scorestar
     })

 }






 function initialize() {

     //======
     Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
     var GameScore = Parse.Object.extend("TechBathroom");
     var query1 = new Parse.Query(GameScore);
     var query2 = new Parse.Query(GameScore);


     query1.equalTo("gender", "M") && query1.descending("waittime");
     query2.equalTo("gender", "F") && query2.descending("waittime");
     query1.find({
         success: function (results) {
             console.log("Successfully retrieved Male" + results.length + " scores.");
             // Do something with the returned Parse.Object values
             for (var i = 0; i < results.length; i++) {
                 var object = results[i];
                 var number2 = object.get('number');
                 var over = object.get('overall');
                 if (over > 0) {
                     var ave = over / number2;
                     object.set("waittime", ave);
                     object.save();
                 }
                 // console.log(object.get('gender'));
                 redraw(object);

             }
         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         }
     });
     //======
     query2.find({
         success: function (results) {
             console.log("Successfully retrieved Famle" + results.length + " scores.");
             // Do something with the returned Parse.Object values
             for (var i = 0; i < results.length; i++) {
                 var object = results[i];
                 var number2 = object.get('number');
                 var over = object.get('overall');
                 if (over > 0) {
                     var ave = over / number2;
                     object.set("waittime", ave);
                     object.save();
                 }
                 // console.log(object.get('gender'));
                 redraw(object);


             }
         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         }
     });

     $('#list').hide();

     $('.raty').raty({
         click: function (score) {
             overall = score;
             //            alert(overall)
         }

     });
 }

 

 function myFunctionChange() {
     Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
     var GameScore = Parse.Object.extend("TechBathroom");
     var query = new Parse.Query(GameScore);
     query.equalTo("name", getid);
     query.find({
         success: function (results) {
             //      alert("Successfully retrieved " + results.length + " scores.");
             // Do something with the returned Parse.Object values
             for (var i = 0; i < results.length; i++) {
                 var object = results[i];
                 var number1;
                 var review;
                 number1 = object.get('number');
                 review = object.get('overall');
                 number1 = number1 + 1;
                 review = review + overall;
                 object.set("number", number1);
                 object.set("overall", review);
                 var arv = Math.round(review / number1);
                 object.set("waittime", arv);
                 object.save();
                 //        alert(object.get('number'));
                 newscore = roundHalf(object.get('overall') / object.get('number'));
                 $('tbody').find('#' + object.get('name') + '-').raty({
                     half: true,
                     readOnly: true,
                     score: newscore
                 })
                 $('.raty').raty({
                     click: function (score) {
                         overall = score;
                         //            alert(overall)
                     }

                 });
             }
         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         }
     });

 };