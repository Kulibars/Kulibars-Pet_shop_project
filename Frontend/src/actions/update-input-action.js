import { ACTION_TYPE } from "./action-type";

export const updateInputAction = (id, quantity) => {
  return {
    type: ACTION_TYPE.UPDATE_INPUT,
    payload: { id, quantity },
  };
};
