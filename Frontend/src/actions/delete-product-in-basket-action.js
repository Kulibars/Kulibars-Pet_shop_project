import { ACTION_TYPE } from "./action-type";

export const DeleteProductInBasketAction = (id) => ({
  type: ACTION_TYPE.DELETE_PRODUCT_IN_BASKET,
  payload: id,
});
