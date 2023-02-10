import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useCustomRouter from "./useCustomRouter";
import { useQueryString } from "./useQueryParam";

export const usePagination = (totalPage: number) => {
  const [firstArr, setFirstArr] = useState<number[]>([]);
  const [lastArr, setLastArr] = useState<number[]>([]);
  const { pushQuery } = useCustomRouter();
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  const { search } = useLocation();
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    const sortValue = new URLSearchParams(search).get("sort");
    if (sortValue) setSort(sortValue);
  }, [search]);

  useEffect(() => {
    const newArr = [...Array(totalPage)].map((_, index) => index + 1);
    if (totalPage <= 4) return setFirstArr(newArr);
    if (totalPage - page > 3) {
      setFirstArr(newArr.slice(page - 1, page + 1));
      setLastArr(newArr.slice(totalPage - 3));
    } else {
      setFirstArr(newArr.slice(totalPage - 4, totalPage));
      setLastArr([]);
    }
  }, [page, totalPage]);

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

  return { page, firstArr, lastArr, nextPage, prevPage, jumpPage };
};
