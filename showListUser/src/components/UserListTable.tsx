import React from "react";
import { IUser } from "../types/user.type";

interface IProps {
  userList: IUser[];
}

const UserListTable: React.FC<IProps> = ({ userList }) => {
  return (
    <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              #
            </th>
            <th scope="col" className="py-3 px-6">
              Thumbnail
            </th>
            <th scope="col" className="py-3 px-6">
              Full Name
            </th>
            <th scope="col" className="py-3 px-6">
              User Name
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user: IUser, index: number) => (
            <tr
              key={user.login.uuid}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="py-4 px-6">{index + 1}</td>
              <td className="py-4 px-6">
                <img
                  src={user.picture.thumbnail}
                  alt="user"
                  className="h-5 w-5"
                />
              </td>
              <th
                scope="row"
                className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
              >
                {user.name.title + " " + user.name.first + " " + user.name.last}
              </th>
              <td className="py-4 px-6">{user.login.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListTable;
