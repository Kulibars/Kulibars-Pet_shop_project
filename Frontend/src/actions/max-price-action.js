import { ACTION_TYPE } from "./action-type";

export const maxPriceAction = (maxPrice) => ({
  type: ACTION_TYPE.SET_MAX_PRICE,
  payload: maxPrice,
});
