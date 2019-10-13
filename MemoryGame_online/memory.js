// Express const
const express = require('express');
const app = express();

// Server const
const hostname = '192.168.0.101';
const port = 3000;

// EJS engine
app.set('view engine', 'ejs');

// assets load
app.use(express.static(__dirname + '/public'))

//Main page
app.get('/', (req, res) => {
  res.render('main');
});

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
