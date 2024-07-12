import { ACTION_TYPE } from "./action-type";

export const openModalAction = (modalParams) => ({
  type: ACTION_TYPE.OPEN_MODAL,
  payload: { ...modalParams },
});
