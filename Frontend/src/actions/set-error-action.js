import { ACTION_TYPE } from "./action-type";

export const setErrorAction = (error) => ({
  type: ACTION_TYPE.SET_ERROR,
  payload: error,
});
