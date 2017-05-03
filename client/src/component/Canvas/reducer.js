import Immutable from 'immutee';

const initialState = {
  images: [],
  texts: []
};

export default function(state = initialState, action) {
  const immutable = Immutable(state);
  switch (action.type) {

    // add image to canvas, merge data from server to image list
    case "ADD_IMAGE_TO_CANVAS": {
      return immutable.merge('images', [action.data]).done();
      break;
    }

    // add text to canvas
    case "ADD_TEXT_TO_CANVAS": {
      return immutable.merge('texts', [action.data]).done();
      break;
    }

    // fetch canvas state in server for image
    case "FETCH_CANVAS_STATE/images": {
      return immutable.set('images', action.data).done();
      break;
    }

    // fetch canvas state in server for text
    case "FETCH_CANVAS_STATE/texts": {
      return immutable.set('texts', action.data).done();
      break;
    }

    // delete image, update image list with Canvas state from server
    case "DELETE_CANVAS_STATE/images": {
      return immutable.set('images', action.data).done();
      break;
    }

    // delete text
    case "DELETE_CANVAS_STATE/texts": {
      return immutable.set('texts', action.data).done();
      break;
    }

    default:
      return state;
  }
}
