import { ACTION_TYPE } from "./action-type";

export const minPriceAction = (minPrice) => ({
  type: ACTION_TYPE.SET_MIN_PRICE,
  payload: minPrice,
});
