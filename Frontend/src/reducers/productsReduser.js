import { ACTION_TYPE } from "../actions";
import { changeState } from "../utils/change-state";

export const initialProductsReducer = {
  allProducts: [],
  product: null,
};

export const productsReduser = (state = initialProductsReducer, action) => {
  switch (action.type) {
    case ACTION_TYPE.CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        product: initialProductsReducer.product,
      };

    case ACTION_TYPE.SET_ALL_PRODUCTS:
      return { ...state, allProducts: [...action.payload] };
    case ACTION_TYPE.SET_SEARCH_PRODUCTS:
      return { ...state, searchProducts: [...action.payload] };

    case ACTION_TYPE.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case ACTION_TYPE.DELETE_PRODUCT:
      return {
        ...state,
        allProducts: [
          ...changeState(state.allProducts, action.payload, "DELETE"),
        ],
      };
    case ACTION_TYPE.UPDATE_PRODUCT:
      return {
        ...state,
        allProducts: [
          ...changeState(state.allProducts, action.payload, "UPDATE"),
        ],
      };
    case ACTION_TYPE.ADD_NEW_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
      };

    default:
      return state;
  }
};
