const express = require("express");
const app = express();
const { db } = require("./firebase.js");
const multer = require('multer');
const upload = multer(); 
const port = 5002; // Setting Port

// For parsing application/x-www-form-urlencoded, body, etc
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));
app.use(express.json());

// Setting view engine to ejs
app.set('view engine', 'ejs');

// Dashboard
app.get("/", async (req, res) => {
  // Preparing data counter
  var totalData = 0;
  
  // Preparing data wrapper
  let docsData = [];
  
  // Query all data
  const collection = db.collection("movies");
  const documents = await collection.get();

  // Insert data to data wrapper
  documents.forEach(doc => {
    docsData[doc.id] = doc.data();
    
    // Count data
    totalData += 1;
  });

  // Render the view and pass the data to it
  res.status(200).render("index", {title: "Dashboard", data: docsData, total: totalData});
});

// Retrieving Datas
app.get("/datas", async (req, res) => {
  // Preparing data wrapper
  let arr = [];

  // Query all data
  const collection = db.collection("movies");
  const documents = await collection.get();

  // Formatting and insert data to data wrapper
  documents.forEach(doc => {
    var datum = {
      'id': doc.id,
      'author': doc.data().author,
      'title': doc.data().title,
    };
    arr.push(datum)
  });
  
  // Show retrieved data in data wrapper (experimental)
  // console.log(arr);

  // Render the view and pass the data to it
  res.status(200).render("datas", {title: "Movie List", documents: arr});
});

// Delete data
app.delete("/data/:ID", (req, res) => {
  // Initialize delete
  console.log("[Deleting data...]");

  // Selecting collection, finding document, and deleting the data
  var del = db.collection('movies').doc(req.params.ID).delete();
  if(del){

    // Redirecting to data table
    console.log("[Data deleted! Redirecting...]");
    res.redirect('/datas')
  }
})

// Add Data
app.get("/add", async (req, res) => {
  // Render the view
  res.status(200).render("add", {title: "Add Movie", id: ''});
});

// Storing data
app.post("/store", async (req, res) => {
  // Getting data
  console.log(req.body, "\n[Saving data...]");

  // Formatting data
  const data = {
    author: req.body.author,
    title: req.body.title,
  }

  // Insert into Firestore
  const save = await db.collection('movies').doc(req.body.assignedID).set(data);
  if(save){
    // Prompt message of succeeded storage
    console.log("[Data saved! Redirecting...]");

    // Redirect to datalist
    res.redirect('/datas'); 
  }
})

// Edit Data
app.get("/data/edit/:ID", async (req, res) => {
  // Getting id
  var id = req.params.ID;
  
  // Render the view and pass the id
  res.status(200).render("add", {title: "Edit Movie", id: id});
});

// Setting the app to listen on assigned port
app.listen(port, () => console.log(`Server has started on port: ${port}\nhttp://localhost:${port}\n`));
