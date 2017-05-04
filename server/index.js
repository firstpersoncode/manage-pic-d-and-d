const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// routes
const uploads = require('./src/routes/upload');
const images = require('./src/routes/image');
const canvasState = require('./src/routes/canvas');
const index = require('./src/routes/index');


// public path
app.use(express.static(path.join(__dirname, 'public')));

// configs
app.use('*', cors());
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// copy necessary files to public folder from build folder
writeBundle(path.resolve(__dirname, './public/javascripts/bundle.js'), path.resolve(__dirname, '../build/bundle.js'));
writeBundle(path.resolve(__dirname, './public/stylesheets/bootstrap.css'), path.resolve(__dirname, '../build/bootstrap.css'));


// app source routing
app.use('/uploads', uploads);
app.use('/images', images);
app.use('/canvas-state', canvasState);

// main route
app.get('/', index);


const server = app.listen( 8000, () => {
  console.log( 'server started. listening to 8000' );
});

// helper for copy file to public folder from build folder
function writeBundle(savPath, srcPath) {
  fs.readFile(srcPath, 'utf8', (err, data) => {
      if (err) throw err;
      fs.writeFile(savPath, data, (err) => {
          if (err) throw err;
          console.log('complete write vendor');
      });
  });
}

module.exports = server;
