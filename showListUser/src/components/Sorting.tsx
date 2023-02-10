import { useEffect } from "react";
import { InputChangedEvent, IUser } from "../types/user.type";

import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../redux/reducers/userSlice";
import { checkBoxListSelector } from "../redux/selector/selectors";
import { checkBoxListSlice } from "../redux/reducers/checkBoxListSlice";
import SortListUser from "../functions/sort.function";

interface IProps {
  userList: IUser[];
}

const Sorting: React.FC<IProps> = ({ userList }) => {
  const { checkBoxList } = useSelector(checkBoxListSelector);
  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChangedEvent) => {
    const { id } = e.target;
    const newCheckBoxList = checkBoxList.map((i) =>
      i.id === id ? { ...i, checked: !i.checked } : i
    );
    // update state checked of the checkbox
    dispatch(checkBoxListSlice.actions.updateCheckBoxList(newCheckBoxList));
  };

  const handleChangeSelector = (e: InputChangedEvent) => {
    const { id, value } = e.target;
    const newCheckBoxList = checkBoxList.map((i) =>
      i.id === id ? { ...i, sortType: value } : i
    );
    // update state checked of the checkbox
    dispatch(checkBoxListSlice.actions.updateCheckBoxList(newCheckBoxList));
  };

  useEffect(() => {
    // Sort data when check box
    const newUserListSorted = SortListUser(userList, checkBoxList);
    // Update the latest data stored on the store
    dispatch(userSlice.actions.createUserList(newUserListSorted));
  }, [userList, checkBoxList]);

  return (
    <div className="mx-2">
      <h1 className="text-[20px] font-bold">Sort By:</h1>
      <div className="flex flex-col gap-2 px-5 border-2 mt-2 p-2">
        <form action="">
          {checkBoxList.map((item) => {
            return (
              <div key={item.id} className="mt-2">
                <label htmlFor={item.id} className="items-center">
                  <input
                    type="checkbox"
                    id={item.id}
                    className="mr-2"
                    name={item.name}
                    checked={item.checked}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {item.name}
                </label>
                <select
                  name={item.name}
                  id={item.id}
                  className="border-2 ml-2"
                  onChange={(e) => handleChangeSelector(e)}
                  defaultValue={item.sortType === "asc" ? "asc" : "desc"}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Decrease</option>
                </select>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default Sorting;
