import axios from 'axios';


// handler for uploading image to server
export function uploadImage(data) {
  return { // dispatch reducer for update state
    type: 'UPLOAD_IMAGE_ASSETS',
    data,
  }
}
export function uploadImageRequest(file) {
  // data to pass to server
  let form = new FormData();
  form.append('upload', file);


  // send data to server
  return (dispatch) => {
    axios.post('http://localhost:8000/uploads/', form)
     .then(({ data }) => {
       dispatch(uploadImage(data));
       console.log(form)
     })
     .catch((error) => {
       console.log(error);
     });
  }
}

// fetch images from server
export function imageList(data) {
  return { // dispatch and update reducer's state
    type: 'FETCH_IMAGE_ASSETS',
    data,
  }
}
export function fetchImages() {
 return (dispatch) => {
   axios.get('http://localhost:8000/images/')
    .then(({ data }) => {
      dispatch(imageList(data))
    })
    .catch((error) => {
      console.log(error)
    });
 }
}

// delete images from server
export function imageListDeleted(data) {
  return { // dispatch and update reducer's state
    type: 'DELETE_IMAGE_ASSETS',
    data,
  }
}
export function deleteImageList(image) {
 return (dispatch) => {
   axios.delete('http://localhost:8000/images?delete='+image)
    .then(({ data }) => {
      dispatch(imageListDeleted(data))
    })
    .catch((error) => {
      console.log(error)
    });
 }
}
