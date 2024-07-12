import { ACTION_TYPE } from "../actions";
import { changeState } from "../utils/change-state";

export const initialCategoriesReducer = {
  allCategories: [],
  currentCategory: { forAnimal: "", name: "" },
};

export const categoriesReducer = (state = initialCategoriesReducer, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_CATEGORIES:
      return { ...state, allCategories: [...action.payload] };
    case ACTION_TYPE.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: {
          ...state.allCategories.find(({ id }) => id === action.payload),
        },
      };
    case ACTION_TYPE.CLEAR_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: { ...initialCategoriesReducer.currentCategory },
      };
    case ACTION_TYPE.CANCEL_EDIT_CATEGORY:
      return {
        ...state,
        currentCategory: {},
      };

    case ACTION_TYPE.DELETE_CATEGORY:
      return {
        ...state,
        allCategories: [
          ...state.allCategories.filter(({ id }) => id !== action.payload),
        ],
      };
    case ACTION_TYPE.UPDATE_CATEGORY:
      return {
        ...state,
        allCategories: [
          ...changeState(state.allCategories, action.payload, "UPDATE"),
        ],
      };
    case ACTION_TYPE.ADD_NEW_CATEGORY:
      return {
        ...state,
        allCategories: [...state.allCategories, action.payload],
      };

    default:
      return state;
  }
};
