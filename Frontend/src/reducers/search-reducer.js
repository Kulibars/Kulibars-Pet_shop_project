import { ACTION_TYPE } from "../actions";

const initialSearchReducer = {
  searchPhrase: "",
  minPrice: 0,
  maxPrice: Infinity,
  sortPriceOrder: "desc",
};

export const searchReducer = (state = initialSearchReducer, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_SEARCH_PHRASE:
      return {
        ...state,
        searchPhrase: action.payload,
      };

    case ACTION_TYPE.SET_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload,
      };

    case ACTION_TYPE.SET_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload,
      };

    case ACTION_TYPE.SET_SORT_PRISE_ORDER:
      return {
        ...state,
        sortPriceOrder: action.payload,
      };

    case ACTION_TYPE.CLEAR_SEARCH:
      return initialSearchReducer;

    default:
      return state;
  }
};
