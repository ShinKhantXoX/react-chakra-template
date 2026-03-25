import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  USER,
  USER_PAYLOAD,
  userPayload,
  type UserIndexPayload,
} from "./user.payload";

export interface USER_SLICE {
  data: {
    status: boolean;
    data: UserIndexPayload;
  };
  user: null | USER;
  pagingParams: USER_PAYLOAD["pagingParams"];
}

const initialState: USER_SLICE = {
  data: {
    status: false,
    data: {
      current_page: 0,
      data: [],
      last_page: 0,
      per_page: 0,
      total: 0,
    },
  },
  user: null,
  pagingParams: userPayload.pagingParams,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    index: (state, action: PayloadAction<UserIndexPayload>) => {
      state.data.data.data = action.payload.data;
      state.data.data = {
        ...state.data.data,
        current_page: action.payload.current_page,
        last_page: action.payload.last_page,
        per_page: action.payload.per_page,
        total: action.payload.total,
      };
    },
    update: (state, action: PayloadAction<USER>) => {
      state.user = action.payload;
    },
    show: (state, action: PayloadAction<USER>) => {
      state.user = action.payload;
    },
    setPaginate: (
      state,
      action: PayloadAction<USER_PAYLOAD["pagingParams"]>,
    ) => {
      state.pagingParams = action.payload;
    },
  },
});

export const { index, update, show, setPaginate } = userSlice.actions;
export default userSlice.reducer;
