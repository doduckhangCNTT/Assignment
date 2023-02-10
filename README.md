# Documentation guide

## The problem here consists of 3 main components:

- `Sorting page`: Used to handle the sorting of users, display the sorting interface
- `UserListTable page`: Displays a list of users
- `Page Pagination`: Used to handle the pagination process, display the pagination interface

## Storage and query problems:

- The data query is handled by calling the Api, through the `Tanstack` library
- Store data, state via `Redux-toolkit`

## Details of each element in the page:

> - Need to store the list of users on the store because the list is used in many different components
> - It is necessary to store the state of the sort on the store, because to perform the selection of the sort request, this time the request processing is done on the `App.ts file`.

```jsx
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
  reducers: {...},
});
```

### `Main page (App.ts)`:

> - Perform data query, display sorted list of users every time you choose to sort
> - Always update the latest status for the user list
> - Split layout for the whole page

```tsx
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
```

### `UserListTable.ts component`:

> - Display the list of users to the interface
> - User list is transmitted from the main page (App.ts)

```jsx
const UserListTable: React.FC<IProps> = ({ userList }) => {
  // UI user list
};
```

### `Pagination ingredients`:

- Used to switch pages
- Perform the following tasks:

  - Move forward, backward through the button (Next, Prev)
  - Move to specified page

- How to do:

  - Here use 1 customHook **`usePagination()`** to perform the above tasks.

  ```jsx
  const { firstArr, lastArr, nextPage, prevPage, jumpPage } =
    usePagination(totalPage);
  ```

  ==> In that reactHook get the current path then `increment` or `decrement` the page number via the "page" parameter.

  ```jsx
  function nextPage() {
    const newPage = Math.min(page + 1, totalPage);
    pushQuery(newPage, sort);
  }

  function prevPage() {
    const newPage = Math.max(page - 1, 1);
    pushQuery(newPage, sort);
  }

  function jumpPage(page: number) {
    const newPage = Math.max(1, page);
    pushQuery(newPage, sort);
  }
  ```

  Then move to the page you want to go to, when the url is changed (specifically, the "page" parameter changes)

  ```jsx
  const { pushQuery } = useCustomRouter();

  pushQuery(newPage, sort);
  ```

  ```jsx
    const useCustomRouter = () => {
      const navigate = useNavigate();
      const { pathname, search } = useLocation();

      const pushQuery = (page: number, sort?: string, time?: TTime) => {
        const query = {} as PageSortType;
        if (page) query.page = page;
        if (sort) query.sort = sort;
        if (time?.requestTime && time.timeNumber)
          query.time = String(time.timeNumber).concat(" ", `${time.requestTime}`);

        const newQuery = new URLSearchParams(query as any).toString();
        navigate(`${pathname}?${newQuery}`);
      };

      return { pathname, search, pushQuery };
    };
  ```

  -> Request a new query to be able to get the data of that page (this operation is done). do it on the App.ts file) -> back to the UserListTable.ts file -> Display the interface

### `Component Sorting.ts`

> - Make selections in checkboxes, select operations
> - When the checkBox is selected, handle the checked state change on the `"checkBoxList" store`
> - When selecting the sort type for the user list, take the value in the Select tag and change the sortType on the CheckBoxList store (`sortType` has only 2 values **"asc" | "desc"**)
> - When selecting sorted values, the list will be done through the "SortedList()" function, the value after being sorted will be stored on the store --> Data is displayed

```jsx
useEffect(() => {
  // Sort data when check box
  const newUserListSorted = SortListUser(userList, checkBoxList);
  // Update the latest data stored on the store
  dispatch(userSlice.actions.createUserList(newUserListSorted));
}, [userList, checkBoxList]);
```

> - `SortedList()`: Through the library "Loadash" to implement a more understandable way of doing the sorting

```jsx

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
      // Handle sort list user by "fullname = title + first + last"
      ...
      },
      // Handle sort list user by  "username"
      ...
    ],
    arrSortType
  );

  return newSortList;
}
```
