import { IAction } from "../actions/types";
import { USER_LOGIN, USER_LOGOUT, USER_ACTIVATE } from "../actions/constants";
import { ReactUser } from "../../server/models/User";

export const nullUser: ReactUser = {
  _id: null,
  username: null,
  email: null,
  avatarURL: null,
  mmr: null,
  bio: null,
  dateCreated: null,
  deleted: null,
  admin: null,
  activated: null,
};

export default (state = nullUser, action: IAction): ReactUser => {
  switch (action.type) {
    case USER_LOGIN: {
      return action.payload;
    }
    case USER_LOGOUT: {
      return nullUser
    }
    case USER_ACTIVATE: {
      return {
        ...state,
        activated: true
      }
    }
    default: {
      return state;
    }
  }
};
