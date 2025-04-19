import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADMIN, ADMIN_PAYLOAD, adminPayload } from "./admin.payload";

export interface ADMIN_SLICE {
  data: {
    status: boolean;
    data: {
      current_page: number;
      data: ADMIN[];
      last_page: number;
      per_page: number;
      total: number;
    };
  };
  admin: null | ADMIN;
  pagingParams: ADMIN_PAYLOAD["pagingParams"];
}

const initialState: ADMIN_SLICE = {
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
  admin: null,
  pagingParams: adminPayload.pagingParams,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    index: (state, action: any) => {
      console.log("action", action.payload);

      state.data.data.data = action.payload.data;
      state.data.data = {
        ...state.data.data,
        current_page: action.payload.current_page,
        last_page: action.payload.last_page,
        per_page: action.payload.per_page,
        total: action.payload.total,
      };
    },
    update: (state, action: PayloadAction<ADMIN>) => {
      state.admin = action.payload;
    },
    show: (state, action: PayloadAction<ADMIN>) => {
      state.admin = action.payload;
    },
    setPaginate: (
      state,
      action: PayloadAction<ADMIN_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
    },
  },
});

export const { index, update, show, setPaginate } = adminSlice.actions;
export default adminSlice.reducer;
