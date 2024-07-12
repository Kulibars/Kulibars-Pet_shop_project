import { ACTION_TYPE } from "./action-type";

export const sortPriceOrderAction = (sortPriceOrder) => ({
  type: ACTION_TYPE.SET_SORT_PRISE_ORDER,
  payload: sortPriceOrder,
});
