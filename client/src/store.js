import { applyMiddleware, createStore } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";

// Canvas and SidePane reducers
import reducers from "./reducers";

const middleware = applyMiddleware(thunk, logger());
// create store
export default createStore(reducers, middleware);
