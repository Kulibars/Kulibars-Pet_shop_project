import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";

export const saveProductAsyncAction = (productId, data) => (dispatch) => {
  const saveProductMessage = productId
    ? request(`/products/${productId}`, "PATCH", data).then(
        ({ message, error, data }) => {
          dispatch({
            type: ACTION_TYPE.UPDATE_PRODUCT,
            payload: data,
          });

          return { message, error };
        }
      )
    : request("/products", "POST", data).then(({ message, error, data }) => {
        dispatch({
          type: ACTION_TYPE.ADD_NEW_PRODUCT,
          payload: data,
        });

        return { message, error };
      });

  return saveProductMessage;
};
