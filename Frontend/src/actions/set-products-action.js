import { ACTION_TYPE } from "./action-type";

export const setProductsAction = (products) => ({
  type: ACTION_TYPE.SET_ALL_PRODUCTS,
  payload: products,
});
