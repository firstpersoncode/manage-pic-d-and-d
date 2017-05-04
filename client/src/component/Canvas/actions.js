import axios from 'axios';

// add image to canvas handler
// send image object to server for updating Canvas state in server
// receive respon from server, showing Canvas state to client-side
export function imageListInCanvas(data) {
  return {
    type: "ADD_IMAGE_TO_CANVAS",
    data
  }
}
export function addImageToCanvas(payload) {
  return (dispatch) => {
    axios.post('http://localhost:8000/canvas-state/image/', payload)
    .then(({ data }) => {
      dispatch(imageListInCanvas(data));
    })
    .catch((err) => {
      console.log(err)
    });
  }
}

// fetch image Canvas state in server and receive image list from server
// to update Canvas reducer with image list from server
export function fetchImagesToCanvas(data) {
  return {
    type: "FETCH_CANVAS_STATE/images",
    data
  }
}
export function imageCanvasState() {
  return (dispatch) => {
    axios.get('http://localhost:8000/canvas-state/image/')
    .then(({ data }) => {
      dispatch(fetchImagesToCanvas(data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

// add txt to Canvas
// send text object to server and update Canvas state in server
// receive respon from server for showing Canvas state to client side
export function textListInCanvas(data) {
  return {
    type: "ADD_TEXT_TO_CANVAS",
    data
  }
}
export function addTextToCanvas(payload) {
  return (dispatch) => {
    axios.post('http://localhost:8000/canvas-state/text/', { item: { ...payload } })
    .then(({ data }) => {
      dispatch(textListInCanvas(data));
    })
    .catch((err) => {
      console.log(err)
    });
  }
}

// fetch text Canvas state in server
export function fetchTextsToCanvas(data) {
  return {
    type: "FETCH_CANVAS_STATE/texts",
    data
  }
}
export function textCanvasState() {
  return (dispatch) => {
    axios.get('http://localhost:8000/canvas-state/text/')
    .then(({ data }) => {
      dispatch(fetchTextsToCanvas(data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

// remove image object from canvas
// send object image's id to server that need to be removed, update Canvas state on server with deleted image object
// receive Canvas state from server for showing Canvas state to client side
export function deletedImageInList(data) {
  return {
    type: "DELETE_CANVAS_STATE/images",
    data
  }
}
export function deleteImage(image) {
  return (dispatch) => {
    axios.delete('http://localhost:8000/canvas-state/image?id='+image.id)
    .then(({ data }) => {
      dispatch(deletedImageInList(data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

// remove text object from canvas
// send object text's id to server that need to be removed, update Canvas state on server with deleted text object
// receive Canvas state from server for showing Canvas state to client side
export function deletedTextInList(data) {
  return {
    type: "DELETE_CANVAS_STATE/texts",
    data
  }
}
export function deleteText(text) {
  return (dispatch) => {
    axios.delete('http://localhost:8000/canvas-state/text?id='+text.id)
    .then(({ data }) => {
      dispatch(deletedTextInList(data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
