import { ACTION_TYPE } from "./action-type";

export const openMessageWindowAction = (text) => ({
  type: ACTION_TYPE.OPEN_WINDOW,
  payload: text,
});
