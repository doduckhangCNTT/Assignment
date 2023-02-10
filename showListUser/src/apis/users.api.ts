import axios from "axios";

export const getUsers = async (
  page: number | string,
  limit: number | string
) => {
  const res = await axios.get(
    `https://randomuser.me/api/?page=${page}&results=${limit}`
  );
  return res;
};
