import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";

export const updateProductAction = (productId, data) => (dispatch) => {
  const req = request(`/products/${productId}`, "PATCH", data).then(
    ({ message, error, data }) => {
      !error &&
        dispatch({
          type: ACTION_TYPE.UPDATE_PRODUCT,
          payload: data,
        });

      return { message, error };
    }
  );

  return req;
};
