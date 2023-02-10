import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user.type";

const initialState: IUser[] = [];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUserList: (state, action: PayloadAction<IUser[]>) => {
      return action.payload;
    },
  },
});
