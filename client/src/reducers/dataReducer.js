import {SET_USER} from "../actions/types";

const initialState = {
  user:{}
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_USER:
      console.log("REDUCER: ", action.payload);
      return state;

    default:
      return state;
  }
};
