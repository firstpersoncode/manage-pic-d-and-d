const express = require('express');
const path = require('path');
const multer = require( 'multer' );

const router = express.Router();

// define file name and destination to save
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../public/images'))
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split( '.' );
    ext = ext[ext.length - 1];
    cb(null, 'uploads-' + Date.now() + '.' + ext);
  }
});

// define what file type to accept
let filter = ( req, file, cb ) => {
  if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ) {
    cb( null, true );
  } else {
    cb( 'Failed: format not supported' );
  }
}

// set multer config
let upload = multer( {
  storage: storage,
  fileFilter: filter
}).single( 'upload' );


router.post('/', ( req, res ) => {

  upload( req, res, err => {
    if ( err ) {
      console.log( err )
      res.status(400).json( {message: err} );
    } else {
      res.status(200).json( {
        file: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
      } )
    }
  });
});

module.exports = router;
