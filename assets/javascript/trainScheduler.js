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

  // Employee Info
  // console.log(empName);
  // console.log(empRole);
  // console.log(empStart);
  // console.log(empRate);

  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  //
  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);
  //
  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  start + "</td><td>" + freqMinutes + "</td></tr>");
  // $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  // start + "</td><td>" + freqMinutes + "</td><td>" + nextDepart + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
