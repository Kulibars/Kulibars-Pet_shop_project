import { ACTION_TYPE } from "./action-type";

export const setCurrentCategoriyNameAction = (name) => ({
  type: ACTION_TYPE.SET_CATEGORY_NAME,
  payload: name,
});
