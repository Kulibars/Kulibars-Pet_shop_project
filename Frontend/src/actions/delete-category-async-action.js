import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";

export const deleteCategoryAsyncAction = (id) => (dispatch) => {
  const deleteCategoryMessage = request(`/categories/${id}`, "DELETE").then(
    ({ message }) => {
      dispatch({
        type: ACTION_TYPE.DELETE_CATEGORY,
        payload: id,
      });

      return message;
    }
  );

  return deleteCategoryMessage;
};
