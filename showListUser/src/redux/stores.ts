import { configureStore } from "@reduxjs/toolkit";
import { checkBoxListSlice } from "./reducers/checkBoxListSlice";
import { userSlice } from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    checkBoxList: checkBoxListSlice.reducer,
  },
});

export default store;
