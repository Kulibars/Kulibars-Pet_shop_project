import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";
export const getProductsCategoriesAction = () => (dispatch) =>
  request("/categories").then((categories) =>
    dispatch({
      type: ACTION_TYPE.GET_CATEGORIES,
      payload: categories.data,
    })
  );
