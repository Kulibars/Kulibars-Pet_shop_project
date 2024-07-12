import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
  userReducer,
  categoriesReducer,
  productsReduser,
  basketReducer,
  appReducer,
  searchReducer,
} from "./reducers";

const reducer = combineReducers({
  search: searchReducer,
  app: appReducer,
  basket: basketReducer,
  categories: categoriesReducer,
  products: productsReduser,
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
