// Note: This function requires that you consent to location sharing when
// prompted by your browser.

var map;
var overlay;
var floor = 2;



var locationArray = [];
// Check not necessary
// alert("Hello Word! "+locationArray[2]);

var locationNameArray = [];
var markers = [];
var image = 'me.png';


//Tech109 Add
var Tech109 = new google.maps.LatLng(42.0575, -87.6752778);



function initialize_map() {
  var srcImage, swBound, neBound;
  var mapOptions = {
    zoom: 18
  };

  switch (floor) {
    case 0: 
      srcImage = '../Ground_Floor_Map.png';
      swBound = new google.maps.LatLng(42.05702067205062, -87.67693588954927);
      neBound = new google.maps.LatLng(42.05859822275885, -87.67464099140176);
      break;
    case 1: 
      srcImage = '../First_Floor_Map.png';
      swBound = new google.maps.LatLng(42.05701270611957, -87.67687688095094);
      neBound = new google.maps.LatLng(42.05861415422214, -87.6747214576722);
      break;
    case 2: 
      srcImage = '../Second_Floor_Map.png';
      swBound = new google.maps.LatLng(42.05689720000732, -87.6773006699753);
      neBound = new google.maps.LatLng(42.05880533146994, -87.67459807605752);
      break;
    case 3: 
      srcImage = '../Third_Floor_Map.png';
      swBound = new google.maps.LatLng(42.057032620945286, -87.6769948981476);
      neBound = new google.maps.LatLng(42.05858229129155, -87.674683906746);
      break;
    case 4:
      srcImage = '../Fourth_Floor_Map.png';
      swBound = new google.maps.LatLng(42.05705253576474, -87.67690370304109);
      neBound = new google.maps.LatLng(42.05857830842409, -87.67475900859841); 
      break;
  }

  map = new google.maps.Map(document.getElementById('googleMap'),
      mapOptions);

  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  overlay = new google.maps.GroundOverlay(srcImage, bounds);
  overlay.setMap(map);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Here is your current location.'
      });
//      locationArray[0] = pos;
//      alert(pos);
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "I'm Here",
        icon: image
      });
      markers.push(marker);

  //    marker.setTitle(marker.title);
      }, function() {
        handleNoGeolocation(true);
      });
      } else {
    // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
//  alert(locationArray[0]);
  

  var coord;
  var i=0;
  for (coord in locationArray) {
    var marker = new google.maps.Marker({
      position: locationArray[coord],
      map: map,
      title: locationNameArray[coord]
    });
    markers.push(marker);

    marker.setTitle(marker.title);
    attachActivityMessage(marker, i);
    i++;
  }
  clearMarkers();
  
  //overlay.setMap(map);
}

function setAllMap(map){
  for(var i=0; i<markers.length; i++){
    markers[i].setMap(map);
  }
}
function clearMarkers(){
  setAllMap(null);
}

function deleteMarkers(){
  setAllMap(null);
  markers=[];
}
var nameofbathroom;

function attachActivityMessage(marker, num){
  var message = '<a data-toggle="modal" data-target="#details" id = "'+
  locationNameArray[num]+
  '">'+locationNameArray[num]+'</a>';
    var infowindow = new google.maps.InfoWindow({
    content: message    
  });

  google.maps.event.addListener(marker, 'click', function(){

    // $('#details').modal('show');
    infowindow.open(marker.get('map'), marker);
    // alert(locationNameArray[num]);
  });
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: Tech109,
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

function myFunctionQuery_G(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("TechBathroom");
  var query = new Parse.Query(GameScore);
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);

  locationArray = [];
  query.equalTo("gender", gender)&&query.equalTo("floor",0);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');
      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_1(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  locationArray = [];
  var GameScore = Parse.Object.extend("TechBathroom");
  var query = new Parse.Query(GameScore);
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);

  query.equalTo("gender", gender)&&query.equalTo("floor",1);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_2(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("TechBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",2);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_3(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("TechBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  // console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",3);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_4(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("TechBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",4);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_5(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("MuddBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",1);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_6(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("MuddBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",2);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_7(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("MuddBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",3);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_8(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("FranBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",1);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_9(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("FranBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",2);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function myFunctionQuery_10(){
  Parse.initialize("om9ynedsIy67rU9vfQh8IVR2vv0A6WnFz0jgWUrP", "mzPU7M8YQwD83alRhWwGtM9niEiDcSKs4mOKSNbp");
  var GameScore = Parse.Object.extend("FranBathroom");
  var query = new Parse.Query(GameScore);
  locationArray = [];
  var gender = $("input[name='gender']:checked").val();
  
  console.log(gender);
  query.equalTo("gender", gender)&&query.equalTo("floor",3);
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var Tech = new google.maps.LatLng(object.get('latitude'),object.get('longitude'));
        locationArray[i] =  Tech;
        locationNameArray[i] = object.get('name');

      }
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

 //         locationArray = pos;
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: "I'm Here",
           icon: image
         });
         markers.push(marker);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      var i=0;
      for (coord in locationArray) {
        var marker = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord]
      });
      markers.push(marker);
      attachActivityMessage(marker, i);
      i++;
      }

      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
  });
};

function ground() {
    floor = 0;
    initialize_map();
    google.maps.event.trigger(map, 'resize');
  }
  function first() {
    floor = 1;
    console.log();
    initialize_map();
    google.maps.event.trigger(map, 'resize');   
  }
  function second() {
    floor = 2;
    initialize_map();
    google.maps.event.trigger(map, 'resize');
  }
  function third() {
    floor = 3;
    initialize_map();
    google.maps.event.trigger(map, 'resize');
  }
  function fourth() {
    floor = 4;
    initialize_map();
    google.maps.event.trigger(map, 'resize');
  }

google.maps.event.addDomListener(window, 'load', initialize_map);
