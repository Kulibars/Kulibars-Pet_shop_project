import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";

export const newCategoryAction =
  ({ forAnimal, name, description }) =>
  (dispatch) => {
    const req = request("/categories", "POST", {
      forAnimal,
      name,
      description,
    }).then(({ data, message, error }) => {
      !error && dispatch({ type: ACTION_TYPE.ADD_NEW_CATEGORY, payload: data });

      return { message, error };
    });
    return req;
  };
