import Immutable from 'immutee';

const initialState = { // initial state
  images: []
};

export default function(state = initialState, action) {
  const immutable = Immutable(state); // immutable state
  switch (action.type) {
    case 'FETCH_IMAGE_ASSETS': {
      return immutable.set('images', action.data).done(); // update image list with data from server
      break;
    }

    // after upload image, server will respon with single data object that we upload
    // will be used for updating images array
    case 'UPLOAD_IMAGE_ASSETS': {
      return immutable.merge('images', [action.data.file]).done(); // merge to image list
      break;
    }

    case "DELETE_IMAGE_ASSETS": {
      return immutable.set('images', action.data).done();
      break;
    }
    default:
      return state;
  }
}
