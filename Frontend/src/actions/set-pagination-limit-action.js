import { ACTION_TYPE } from "./action-type";

export const setPaginationLimitAction = (PaginationLimit) => ({
  type: ACTION_TYPE.SET_PAGINATION_LIMIT,
  payload: PaginationLimit,
});
