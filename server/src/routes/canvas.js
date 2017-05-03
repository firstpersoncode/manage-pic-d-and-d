// CANVAS STATE API
const url = require('url');
const express = require('express');
const { canvasStateImage, canvasStateText } = require('../fakeDB/canvasState'); // initial state

const router = express.Router();

// for mutating initial state "canvasStateImage" / "canvasStateText"
let newStateImage = [];
let newStateText = [];

// endpoint for add image to canvas
router.post( '/image', ( req, res ) => {
  const newItem = req.body; // grab new image object from client
  newStateImage = canvasStateImage.concat([], newStateImage, newItem); // copy state and concat with new one from prev state
  res.status(200).send(newItem);
});

// endpoint for fetch image object on canvas
router.get('/image', ( req, res ) => {
  res.status(200).send(newStateImage)
});

// endpoint for deleting image in canvas
router.delete('/image', ( req, res ) => {
  // query string url
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;

  // return new state without image object that match with its id that coming from client
  const deleteImage = newStateImage.filter((obj) => {
    return obj.id !== parseInt(query.id);
  });

  newStateImage = deleteImage; // copy new state
  res.status(200).send(newStateImage)
});


// endpoint for add text to canvas
router.post( '/text', ( req, res ) => {
  const newItem = req.body.item; // grab new text object from client
  newStateText = canvasStateText.concat([], newStateText, newItem); // copy state and concat with new one from prev state
  res.status(200).send(newItem)
});

// fetch text on canvas
router.get('/text', ( req, res ) => {
  res.status(200).send(newStateText)
});

// endpoint for deleting text in canvas
router.delete('/text', ( req, res ) => {
  // query string url
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;

  // return new state without text object that match with its id
  const deletedText = newStateText.filter((obj) => {
    return obj.id !== parseInt(query.id);
  });

  newStateText = deletedText; // copy state
  res.status(200).send(newStateText);
});

module.exports = router;
