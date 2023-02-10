import { usePagination } from "../hooks/usePagination";
import { useQueryString } from "../hooks/useQueryParam";

interface IProps {
  totalPage: number;
}

const Pagination: React.FC<IProps> = ({ totalPage }) => {
  const { firstArr, lastArr, nextPage, prevPage, jumpPage } =
    usePagination(totalPage);

  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  const isActive = (index: number) => {
    if (index === page) return "bg-gray-300 text-white";
    return "";
  };

  return (
    <div className="mt-6 flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex -space-x-px">
          <li>
            <button
              onClick={() => prevPage()}
              className="border border-gray-300 bg-white  py-2 px-3 leading-tight  text-gray-500  hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </button>
          </li>
          <li>
            {firstArr.map((i) => {
              return (
                <button
                  key={i}
                  className={`${isActive(
                    i
                  )} border border-gray-300 bg-white  py-2 px-3 leading-tight  text-gray-500  hover:bg-gray-100 hover:text-gray-700`}
                  onClick={() => jumpPage(i)}
                >
                  {i}
                </button>
              );
            })}

            {lastArr.length === 0 ? (
              ""
            ) : (
              <button className="border border-gray-300 bg-white  py-2 px-3 leading-tight  text-gray-500  hover:bg-gray-100 hover:text-gray-700">
                ...
              </button>
            )}

            {lastArr.map((i) => {
              return (
                <button
                  key={i}
                  className="border border-gray-300 bg-white  py-2 px-3 leading-tight  text-gray-500  hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => jumpPage(i)}
                >
                  {i}
                </button>
              );
            })}
          </li>
          <li>
            <button
              onClick={() => nextPage()}
              className="border border-gray-300 bg-white  py-2 px-3 leading-tight  text-gray-500  hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
