import { orderBy } from "lodash";
import { UserConst } from "../consts/user.const";
import { ICheckBoxList, IUser } from "../types/user.type";

type IType = boolean | "asc" | "desc";

function SortListUser(
  sortedList: IUser[],
  checkBoxList: ICheckBoxList[]
): IUser[] {
  const arrSortType = checkBoxList.map<boolean | "asc" | "desc">((c): IType => {
    return c.sortType == "asc" ? "asc" : "desc";
  });

  const newSortList = orderBy(
    sortedList,
    [
      // Sort list user by "fullname = title + first + last"
      (d: IUser) => {
        let fullName = "";
        checkBoxList.forEach((checkBoxItem) => {
          if (checkBoxItem.id === UserConst.FullName) {
            fullName = checkBoxItem.checked
              ? d.name.title + d.name.first + d.name.last
              : "";
          }
        });
        return fullName;
      },
      // Sort list user by  "username"
      (c: IUser) => {
        // return checkBoxList[1].checked ? c.login.username : "";
        let userName = "";
        checkBoxList.forEach((checkBoxItem) => {
          if (checkBoxItem.id === UserConst.UserName) {
            userName = checkBoxItem.checked ? c.login.username : "";
          }
        });
        return userName;
      },
    ],
    arrSortType
  );

  return newSortList;
}

export default SortListUser;
