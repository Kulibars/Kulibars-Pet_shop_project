import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";

export const deleteProductAsyncAction = (productId) => (dispatch) => {
  const deleteProductMessage = request(`/products/${productId}`, "DELETE").then(
    ({ message }) => {
      dispatch({
        type: ACTION_TYPE.DELETE_PRODUCT,
        payload: productId,
      });
      return message;
    }
  );

  return deleteProductMessage;
};
