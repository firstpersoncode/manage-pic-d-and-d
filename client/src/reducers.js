import { combineReducers } from 'redux';

import SidePaneState from "./component/SidePane/reducer";
import CanvasState from "./component/Canvas/reducer";

// combie Canvas and SidePane reducer
export default combineReducers({
  SidePaneState,
  CanvasState
});
