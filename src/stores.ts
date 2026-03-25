import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/admin.slice";
import userSlice from "./modules/user/user.slice";

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    admin: adminSlice,
    user: userSlice,
  },
});

// Infer the RootState type from the store itself
export type AppRootState = ReturnType<typeof stores.getState>;

// Infer AppDispatch from the store
export type AppDispatch = typeof stores.dispatch;
