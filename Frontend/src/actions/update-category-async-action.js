import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";

export const updateCategoryAction = (categoryId, resData) => (dispatch) => {
  const req = request(`/categories/${categoryId}`, "PATCH", resData).then(
    ({ message, error, data }) => {
      !error &&
        dispatch({
          type: ACTION_TYPE.UPDATE_CATEGORY,
          payload: { id: categoryId, ...data },
        });

      return { message, error };
    }
  );
  return req;
};
