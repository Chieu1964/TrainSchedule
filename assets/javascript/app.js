// ==== Initialize Firebase ==========

var config = {
  apiKey: "AIzaSyDREdcnRdZnDQfRCdhDHO9vu58yeF4pYeg",
  authDomain: "my-awesome-project-ebe75.firebaseapp.com",
  databaseURL: "https://my-awesome-project-ebe75.firebaseio.com",
  projectId: "my-awesome-project-ebe75",
  storageBucket: "my-awesome-project-ebe75.appspot.com",
  messagingSenderId: "746031761716"
};
firebase.initializeApp(config);

var database = firebase.database();

//==== Button for adding train ====

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  //=== Graps train input ===

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  //=== Create local "temporary" object for holding train data

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstT: firstTrain,
    frequency: trainFrequency
  };

  //=== Upload train data to the database ====
  database.ref().push(newTrain);

  //=== logs everything to console ===

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstT);
  console.log(newTrain.frequency);

  alert("New train successefully added");

  //==== Clears all the data in the text-boxes (reset the form) =====

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

});

// === DATABASE DOES NOT WORK - NEED TO FIX ====

//==== Create Firebase for adding train to the database and a row in HTML for user adding a train ===

database.ref().on("child_added", function (snapshot) {

  //=== Store everyting into a variable
  var trainN = snapshot.val().name;
  var trainD = snapshot.val().destination;
  var trainT = snapshot.val().firstT;
  var trainF = snapshot.val().frequency;

  console.log(trainT)

  //=== Train info===

  console.log(trainN);
  console.log(trainD);
  console.log(trainT);
  console.log(trainF);

  // ============================================
  // Moment math for next arrival and minutes away
  // ==============================================

  // First Time Train from user

  console.log(moment);
  console.log(moment(trainT, "HH:mm"));
  console.log("trainT is ", trainT);

  var firstTimeConverted = moment($("#first-train-input"), "HH:mm").format("X");

  console.log(" User Train Time Input " + firstTimeConverted);

  // Current Time
  var currentTime = moment().format("X");
  console.log("CURRENT TIME: " + currentTime);

  // Difference between current time and the first train time

  var diffTime = moment().diff(moment(firstTimeConverted, 'minuttes'));
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemain = diffTime % trainF;
  console.log(tRemain);

  // Minute Until the next train
  var tMinutesTillTrain = trainF - tRemain;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
  console.log("Next Train: " + nextTrain);

  //adding newRow to train schedule
  var newRow = $("<tr>").append(
    $("<td>").text(trainN),
    $("<td>").text(trainD),
    $("<td>").text(trainF),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  //==== Append the new row to the table ===
  $("#train-table").append(newRow);
})
