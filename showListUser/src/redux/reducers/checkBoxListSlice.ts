import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckBoxList } from "../../types/user.type";
import { UserConst } from "../../consts/user.const";

const initialState: ICheckBoxList[] = [
  {
    name: "Full Name",
    id: UserConst.FullName,
    checked: false,
    sortType: "asc",
    propertyName: "name",
  },
  {
    name: "User Name",
    id: UserConst.UserName,
    checked: false,
    sortType: "asc",
    propertyName: "username",
  },
];

export const checkBoxListSlice = createSlice({
  name: "checkBoxList",
  initialState,
  reducers: {
    updateCheckBoxList: (state, action: PayloadAction<ICheckBoxList[]>) => {
      return action.payload;
    },
  },
});
