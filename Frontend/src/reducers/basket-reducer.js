import { ACTION_TYPE } from "../actions";
import { changeProductBasket } from "../utils";

export const initialbasketReducer = {
  productsBasket: [],
};

export const basketReducer = (state = initialbasketReducer, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_PRODUCT_TO_BASKET:
      return {
        ...state,
        productsBasket: [...state.productsBasket, action.payload],
      };

    case ACTION_TYPE.SET_PRODUCTS_TO_BASKET:
      return {
        ...state,
        productsBasket: [...action.payload],
      };

    case ACTION_TYPE.DELETE_PRODUCT_IN_BASKET: {
      return {
        ...state,
        productsBasket: [
          ...state.productsBasket.filter(
            ({ product }) => product.id !== action.payload
          ),
        ],
      };
    }
    case ACTION_TYPE.UPDATE_INPUT: {
      changeProductBasket(state.productsBasket, action.payload, "INPUT");
      return {
        ...state,
        productsBasket: [...state.productsBasket],
      };
    }
    case ACTION_TYPE.UPDATE_INPUT_PLUS: {
      changeProductBasket(state.productsBasket, action.payload, "PLUS");
      return {
        ...state,
        productsBasket: [...state.productsBasket],
      };
    }
    case ACTION_TYPE.UPDATE_INPUT_MINUS: {
      changeProductBasket(state.productsBasket, action.payload, "MINUS");
      return {
        ...state,
        productsBasket: [...state.productsBasket],
      };
    }
    case ACTION_TYPE.CLEAR_BASKET:
      return initialbasketReducer;

    default:
      return state;
  }
};
