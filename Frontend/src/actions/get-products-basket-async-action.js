import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";
export const GetProductToBasketAction = (productId) => (dispatch) =>
  request(`/products/${productId}`).then(({ data }) => {
    dispatch({
      type: ACTION_TYPE.GET_PRODUCT_TO_BASKET,
      payload: { product: data, quantityInBasket: 1 },
    });
  });
