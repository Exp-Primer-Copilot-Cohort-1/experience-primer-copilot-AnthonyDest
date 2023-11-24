// Create web server
// Run: node comments.js
// http://localhost:3000

// Require modules
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Use middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set up database and collection
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var db;
var collection;

// Connect to database
MongoClient.connect('mongodb://localhost:27017/comments', function(err, database) {
  if (err) throw err;
  db = database;
  collection = db.collection('comments');
});

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/comments', function(req, res) {
  collection.find().toArray(function(err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

app.post('/comments', function(req, res) {
  collection.insert(req.body, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.delete('/comments', function(req, res) {
  collection.remove({}, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
