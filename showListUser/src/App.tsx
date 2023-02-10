import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./apis/users.api";
import Pagination from "./components/Pagination";
import Sorting from "./components/Sorting";
import UserListTable from "./components/UserListTable";
import SortListUser from "./functions/sort.function";
import { useQueryString } from "./hooks/useQueryParam";
import { userSlice } from "./redux/reducers/userSlice";
import {
  checkBoxListSelector,
  userListSelector,
} from "./redux/selector/selectors";
import { IUser } from "./types/user.type";

const TOTAL_USER_LIST = 100;
const LIMIT_QUALITY_USER_ON_PAGE = 10;

function App() {
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;
  const totalPage = Math.ceil(TOTAL_USER_LIST / LIMIT_QUALITY_USER_ON_PAGE);
  const dispatch = useDispatch();

  // Query Data user
  const {
    data: UserList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(1, 10),
    staleTime: 3 * 60 * 1000, // --> 3p
  });

  const [newSortedList, setNewSortedList] = useState<IUser[]>([]);
  const { users } = useSelector(userListSelector);
  const { checkBoxList } = useSelector(checkBoxListSelector);

  // Add user list to store when query data complete
  useEffect(() => {
    dispatch(userSlice.actions.createUserList(UserList?.data.results));
  }, [UserList]);

  /*
    - Sort user list user when checked box
    - When turning pages, the list is still sorted
  */
  useEffect(() => {
    setNewSortedList(SortListUser(users, checkBoxList));
  }, [users, checkBoxList]);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return "An error has occurred: " + error;

  return (
    <div className="w-full">
      <h1 className="text-[30px] font-bold">User List</h1>

      {/* Sorting */}
      <Sorting userList={UserList?.data.results} />

      {/* User List */}
      <UserListTable userList={newSortedList} />

      {/* Pagination */}
      <Pagination totalPage={totalPage} />
    </div>
  );
}

export default App;
