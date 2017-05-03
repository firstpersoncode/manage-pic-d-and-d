const path = require('path');
const fs = require('fs');
const url = require('url');
const express = require('express');
const junk = require( 'junk' );

const router = express.Router();

router.get('/', ( req, res ) => {

  let file_path = req.protocol + '://' + req.get('host') + '/images/';
  let files = fs.readdirSync( path.resolve(__dirname, '../../public/images/') );
  files = files
          .filter( junk.not ) // remove .DS_STORE etc
          .map( f => file_path + f ); // map with url path
  res.json( files );
});


// delete image handler
router.delete('/', ( req, res ) => {
  // query string url
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;


  let file_path = req.protocol + '://' + req.get('host') + '/images/';
  let files = fs.readdirSync( path.resolve(__dirname, '../../public/images/') );
  const mapFiles = files
          .filter( junk.not ) // remove .DS_STORE etc
          .map( f => file_path + f ); // map with url path

  const deletedImage = mapFiles.filter((obj) => {
    return obj !== query.delete;
  });


  // return image file name match with query string from client
  const removeFromServer = files.filter((f) => {
    return f === query.delete.substring(query.delete.indexOf('images') + 7);
  })

  // delete image
  fs.unlink(path.resolve(__dirname, '../../public/images/'+removeFromServer[0]), (err) => {
    if (err) {
      throw err
    }
    res.json( deletedImage );
  })
});

module.exports = router;
