import { ACTION_TYPE } from "./action-type";

export const updateInputMinusAction = (id, currentPrice) => {
  return {
    type: ACTION_TYPE.UPDATE_INPUT_MINUS,
    payload: { id, currentPrice },
  };
};
