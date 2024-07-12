import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";

export const saveCategoryAsyncAction = (categoryId, data) => (dispatch) => {
  const saveCategoryMessage = categoryId
    ? request(`/categories/${categoryId}`, "PATCH", data).then(
        ({ message, error }) => {
          dispatch({
            type: ACTION_TYPE.UPDATE_CATEGORY,
            payload: { id: categoryId, ...data },
          });
          return { message, error };
        }
      )
    : request("/categories", "POST", data).then(({ data, message, error }) => {
        dispatch({ type: ACTION_TYPE.ADD_NEW_CATEGORY, payload: data });
        return { message, error };
      });

  return saveCategoryMessage;
};
