import { ACTION_TYPE } from "./action-type";

export const updateInputPlusAction = (id, currentPrice) => {
  return {
    type: ACTION_TYPE.UPDATE_INPUT_PLUS,
    payload: { id, currentPrice },
  };
};
