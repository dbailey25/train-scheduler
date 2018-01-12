/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyC1WZ6sJxzFCFwQuHGwDeUkwXBqdP-3Ptw",
  authDomain: "train-scheduler-2ae71.firebaseapp.com",
  databaseURL: "https://train-scheduler-2ae71.firebaseio.com",
  projectId: "train-scheduler-2ae71",
  storageBucket: "train-scheduler-2ae71.appspot.com",
  messagingSenderId: "549099619985"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // var timeNow = moment().format('X');
  // var timeNowConv = moment(timeNow).format('X');
// console.log('timeNow', timeNow);
// console.log('timeNowConv', timeNowConv);
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var start = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
  var freqMinutes = $("#frequency-input").val().trim();
  // var freqSeconds = freqMinutes * 60;

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    start: start,
    frequency: freqMinutes
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var start = childSnapshot.val().start;
  var freqMinutes = childSnapshot.val().frequency;
// };

  // Assumptions
      // var tFrequency = 3;

      // Time is 3:30 AM
      // var firstTime = "03:30";

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(start, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % freqMinutes;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = freqMinutes - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));



  // for (var i = 1; i < 5; i++) {
  //   var nextDeparture = freqMinutes * i;
  //   var departureTime = moment().add(nextDeparture, 'minutes').format("HH:mm");
  //   console.log(departureTime);


  // Add each train's data into the table
  $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  freqMinutes + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  // $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  // start + "</td><td>" + freqMinutes + "</td><td>" + nextDepart + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
