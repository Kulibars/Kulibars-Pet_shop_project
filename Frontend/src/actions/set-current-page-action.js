import { ACTION_TYPE } from "./action-type";

export const setCurrentPageAction = (currentPage) => ({
  type: ACTION_TYPE.SET_CURRENT_PAGE,
  payload: currentPage,
});
