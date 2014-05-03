 $(window).on('load resize', function () {
     $('body').css({
         "padding-top": $(".navbar").height() + 30 + "px"
     });
 });
 var getid;
 var scoreshow;

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
     console.log(checkselect);
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
         myFunctionQuery_5();
     if (checkselect.indexOf("mudd.f2") >= 0)
         myFunctionQuery_6();
     if (checkselect.indexOf("mudd.f3") >= 0)
         myFunctionQuery_7();

     if (checkselect.indexOf("frances.f1") >= 0)
         myFunctionQuery_8();
     if (checkselect.indexOf("frances.f2") >= 0)
         myFunctionQuery_9();
     if (checkselect.indexOf("frances.f3") >= 0)
         myFunctionQuery_10();

 };

 function roundHalf(num) {
     num = Math.round(num * 2) / 2;
     return num;
 }

 $(document).ready(function () {

     initialize();

     $(":radio").change(function(){
        countChecked();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
     });

     $("#view-list").on('click', function () {
         console.log("list");
         $('#list').show();
         $('#googleMap').hide();
     });
     $("#view-map").on('click', function () {
         console.log("map");
         $('#googleMap').show();
         $('#list').hide();
     })

     $("#details").on('show.bs.modal', function (e) {

         var invoker = $(e.relatedTarget);
         getid = invoker.prop('id');
         console.log(getid);

         var to_query='TechBathroom';
            if(getid[0]==='f'){to_query='FranBathroom'};
            if(getid[0]==='m'){to_query='MuddBathroom'};
         Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
         var GameScore = Parse.Object.extend(to_query);
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

 function redraw(obj,building) {
     var scorestar = obj.get('overall');
     if (scorestar > 0)
         scorestar = roundHalf(scorestar / obj.get('number'));
     // console.log(scorestar);
     var gender = obj.get('gender');
     var color;
     if(gender === 'M') color = ' style = "background: radial-gradient(#cfd8fc, rgba(255,0,0,0))" ';
     else color = ' style = "background: radial-gradient(#fccfcf, rgba(255,0,0,0))" ';

     var to_append = '<tr '+ color +' class = "' + obj.get('gender') + ' ' +
         building + ' ' + 'f' + obj.get('floor') + '" ' + 'data-toggle = "modal" data-target="#details" ' + 'id = "' + obj.get('name') + '">' +
         '<td class="col-xs-2" style = "font-family: \'Architects Daughter\', cursive;">' + obj.get('name') + '</td>' +
         '<td ><div id = "' + obj.get('name') + '-" value = "' + scorestar + '"></div></td>'
         +'<td >'+obj.get('number')+' review</td></tr>';


     $('tbody').append(to_append);
     $('tbody').find('#' + obj.get('name') + '-').raty({
         half: true,
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


     query1.equalTo("gender", "M") && query1.descending("waittime");
     query2.equalTo("gender", "F") && query2.descending("waittime");
     query1.find({
         success: function (results) {
             console.log("Successfully retrieved Male" + results.length + " scores from tech");
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
                 redraw(object,'tech');

             }
         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         }
     });
     //======
     query2.find({
         success: function (results) {
             console.log("Successfully retrieved Famle" + results.length + " scores from tech");
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
                 redraw(object,'tech');


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

     //==frances
     Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
     var GameScore = Parse.Object.extend("FranBathroom");
     var query1 = new Parse.Query(GameScore);
     var query2 = new Parse.Query(GameScore);


     query1.equalTo("gender", "M") && query1.descending("waittime");
     query2.equalTo("gender", "F") && query2.descending("waittime");
     query1.find({
         success: function (results) {
             console.log("Successfully retrieved Male" + results.length + " scores from Frances");
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
                 redraw(object,'frances');

             }
         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         }
     });
     //======
     query2.find({
         success: function (results) {
             console.log("Successfully retrieved Famle" + results.length + " scores. from Frances");
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
                 redraw(object,'frances');


             }
         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         }
     });

     //==Mudd
     Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
     var GameScore = Parse.Object.extend("MuddBathroom");
     var query1 = new Parse.Query(GameScore);
     var query2 = new Parse.Query(GameScore);


     query1.equalTo("gender", "M") && query1.descending("waittime");
     query2.equalTo("gender", "F") && query2.descending("waittime");
     query1.find({
         success: function (results) {
             console.log("Successfully retrieved Male" + results.length + " scores. from Mudd");
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
                 redraw(object,'mudd');

             }
         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         }
     });
     //======
     query2.find({
         success: function (results) {
             console.log("Successfully retrieved Famle" + results.length + " scores from Mudd.");
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
                 redraw(object,'mudd');


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

 var newscore;

 function myFunctionChange() {
    console.log(getid[0]);
    //----
    var to_query='TechBathroom';
    if(getid[0]==='f'){to_query='FranBathroom'};
    if(getid[0]==='m'){to_query='MuddBathroom'};

     Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
     var GameScore = Parse.Object.extend(to_query);
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

function sendMail() {
    console.log(getid);
    var bld;
    var room;
    if(getid[0]=='f') {bld = 'Frances';room = getid.substring(1);}
        else if (getid[0]=='m') {bld = 'Mudd';room = getid.substring(1);}
            else {bld = 'Tech';room = getid;};

    var link = "mailto:xiaoyangtan2013@u.northwestern.edu"
             + "?cc=duboda507@gmail.com;"+"CraigOlson2015@u.northwestern.edu;"+"LiangGe1.2013@u.northwestern.edu;"+"SamaKadakia2014@u.northwestern.edu;"
             + "&subject=" + escape("Error report for "+bld+' '+room)
             + "&body="+escape('I\'d like to inform you of a mistake on bathroom '+room+' of '+bld+'\n'
                +'The correct lagtitude is \n'+'The correct longtitude is \n');
    ;

    window.location.href = link;
}
