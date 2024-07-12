import { ACTION_TYPE } from "./action-type";

export const setCurrentCategoriyAction = (id) => ({
  type: ACTION_TYPE.SET_CURRENT_CATEGORY,
  payload: id,
});
