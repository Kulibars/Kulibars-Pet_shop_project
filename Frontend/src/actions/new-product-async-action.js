import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";

export const newProductAction = (data) => (dispatch) => {
  const req = request("/products", "POST", data).then(
    ({ message, error, data }) => {
      !error &&
        dispatch({
          type: ACTION_TYPE.ADD_NEW_PRODUCT,
          payload: data,
        });

      return { message, error };
    }
  );
  return req;
};
