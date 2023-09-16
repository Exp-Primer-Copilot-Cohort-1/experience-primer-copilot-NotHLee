// Create web server 
// 1. Load modules
// 2. Create server
// 3. Set up routes
// 4. Start server

// 1. Load modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// 2. Create server
const app = express();
const port = 3000;

// 3. Set up routes
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// 4. Start server
app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});

// GET /comments
app.get('/comments', function(req, res) {
  fs.readFile('./data/comments.json', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    }
    res.json(JSON.parse(data));
  });
});

// POST /comments
app.post('/comments', function(req, res) {
  fs.readFile('./data/comments.json', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./data/comments.json', JSON.stringify(comments), function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Internal server error');
      }
      res.send('Thanks for your comment');
    });
  });
});




