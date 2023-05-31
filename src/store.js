import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
const initState = {};
const midWare = [thunk];



const persistConfig = {
  key: "main-root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initState,
  composeWithDevTools(applyMiddleware(...midWare))
);
const persistor = persistStore(store);

export { persistor };
export default store;

