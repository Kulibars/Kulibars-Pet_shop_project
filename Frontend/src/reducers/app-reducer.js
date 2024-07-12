import { ACTION_TYPE } from "../actions";
import { PAGINATION_LIMIT } from "../constants";

const initialAppState = {
  paginationLimit: PAGINATION_LIMIT.MAIN,
  isLoading: true,
  error: null,
  wasLogout: false,
  currentPage: 1,
  lastPage: 1,
  modal: {
    isOpen: false,
    text: "",
    onConfirm: () => {},
    onCancel: () => {},
  },
  messageWindow: {
    isOpen: false,
    text: "",
  },
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };

    case ACTION_TYPE.SET_LOADING_END:
      return {
        ...state,
        isLoading: false,
      };

    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        wasLogout: !state.wasLogout,
      };

    case ACTION_TYPE.OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload,
          isOpen: true,
        },
      };
    case ACTION_TYPE.CLOSE_MODAL:
      return initialAppState;

    case ACTION_TYPE.OPEN_WINDOW:
      return {
        ...state,
        messageWindow: {
          ...state.messageWindow,
          text: action.payload,
          isOpen: true,
        },
      };
    case ACTION_TYPE.CLOSE_WINDOW:
      return {
        ...state,
        messageWindow: { ...initialAppState.messageWindow },
      };

    case ACTION_TYPE.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ACTION_TYPE.SET_PAGINATION_LIMIT:
      return {
        ...state,
        paginationLimit: action.payload,
      };

    case ACTION_TYPE.SET_LAST_PAGE:
      return {
        ...state,
        lastPage: action.payload,
      };

    case ACTION_TYPE.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};
