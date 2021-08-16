import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleWare from "redux-saga";
import { persistStore } from "redux-persist";

// import rootReducer from "./rootReducer";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleWare();
export const middleWares = [thunk, sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);

//----
export const persist = persistStore(store);

export default { store, persist };
