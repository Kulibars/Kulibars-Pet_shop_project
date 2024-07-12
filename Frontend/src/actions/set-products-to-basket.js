import { ACTION_TYPE } from "./action-type";

export const setProductsToBasketAction = (Products) => ({
  type: ACTION_TYPE.SET_PRODUCTS_TO_BASKET,
  payload: Products,
});
