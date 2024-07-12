import { ACTION_TYPE } from "./action-type";

export const setProductAction = (data) => ({
  type: ACTION_TYPE.SET_PRODUCT,
  payload: data,
});
