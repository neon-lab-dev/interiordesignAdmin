import React, { useState } from "react";
import { ICONS } from "../../../assets";
import DownloadButton from "./DownloadExcelBtn";
import DropdownFilter from "./Dropdown";

interface Column {
  header: string | JSX.Element;
  accessor: string;
  width?: string;
  cellClassName?: string | ((row: any) => string);
  cellRenderer?: (row: any) => JSX.Element;
  icon1?: string;
  icon2?: string;
  onIcon1Click?: () => void;
  onIcon2Click?: () => void;
}

interface TableProps {
  data: Array<Record<string, any>>;
  columns: Column[];
  tableName: string;
  showViewAll?: boolean;
  enablePagination?: boolean;
  rowsPerPage?: number;
  tableHeight?: string;
  tableWidth?: string;
  icons?: {
    i1: string;
    i2: string;
    i3: string;
  };
  searchPlaceholder?: string;
}

const formatDate = (date: Date) => {
  if (!(date instanceof Date)) return date; // Return as is if not a date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  showViewAll,
  enablePagination = false,
  rowsPerPage = 5,
  searchPlaceholder = "Search...", 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<string | null>(null);

  const handleFilterSelect = (selectedOption: string) => {
    setFilter(selectedOption === "All" ? null : selectedOption);
  };

  const filteredData = filter
    ? data.filter(
        (row) => row.orderStatus.toLowerCase() === filter.toLowerCase()
      )
    : data;

  const totalPages = enablePagination
    ? Math.ceil(filteredData.length / rowsPerPage)
    : 1;
  const startIndex = enablePagination ? (currentPage - 1) * rowsPerPage : 0;
  const endIndex = enablePagination
    ? startIndex + rowsPerPage
    : filteredData.length;
  const currentData = enablePagination
    ? filteredData.slice(startIndex, endIndex)
    : filteredData;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col  overflow-hidden bg-primary-20  scrollbar-hide rounded-2xl px-8 py-5">
      <div className="w-full overflow-hidden shadow-tableShadow">
        <div className="w-[100%] flex justify-between items-center h-10 mb-4">
          <div className="p-1 px-5 bg-primary-30 w-[338px] h-[38px] flex gap-2 items-center rounded-full">
            <img
              src={ICONS.search}
              alt="Search Icon"
              className="w-[16px] h-[15px]"
            />
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="border-0 md:block text-white outline-0 bg-transparent placeholder:text-text-accent10 placeholder:text-[14px] placeholder:font-normal"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            {showViewAll && (
              <DropdownFilter
                label={filter ? filter : "All"}
                options={[
                  "All",
                  "Shipped",
                  "Delivered",
                  "Processing",
                  "Cancelled",
                ]}
                onSelect={handleFilterSelect}
              />
            )}
            <DownloadButton data={data} />
          </div>
        </div>

        <div
          className="overflow-y-auto flex-grow"
          style={{ height: "400px", maxHeight: "400px" }}
        >
          <table className="min-w-full text-left border-separate border-spacing-y-1">
            <thead className="sticky top-0 bg-primary-30 min-h-10">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`pl-3 py-3 font-normal text-[14px] text-text-accent whitespace-nowrap ${
                      index === 0 ? "rounded-l-[12px]" : ""
                    } ${
                      index === columns.length - 1 ? "rounded-r-[12px]" : ""
                    }`}
                    style={{ minWidth: col.width }}
                  >
                    <div className="flex items-center justify-between text-[14px] text-neutral-85">
                      {col.header}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b-2 border-border-20 min-h-10"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`pr-4 pl-3 py-4 text-[14px] ${
                        typeof col.cellClassName === "function"
                          ? col.cellClassName(row)
                          : col.cellClassName || ""
                      } ${colIndex === 0 ? "text-[#4186F3]" : ""}`}
                      style={{ width: col.width }}
                    >
                      {col.cellRenderer ? (
                        col.cellRenderer(row)
                      ) : col.accessor === "status" ? (
                        <span
                          className={`${
                            row.status === "Active"
                              ? "text-neutral-90 bg-sucess-10"
                              : "text-red-600 bg-red-100"
                          } px-2 py-1 rounded-xl`}
                        >
                          {row[col.accessor]}
                        </span>
                      ) : typeof row[col.accessor] === "object" &&
                        row[col.accessor] instanceof Date ? (
                        formatDate(row[col.accessor])
                      ) : (
                        row[col.accessor]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {enablePagination && (
        <div className="flex justify-between md:justify-end items-center mt-4">
          <span className="mx-2 font-normal text-[14px] leading-[17px] text-text-accent">
            Showing {data.length==0?"00": String(startIndex + 1).padStart(2, "0")}-{" "}
            {String(Math.min(endIndex, data.length)).padStart(2, "0")} of{" "}
            {data.length}
          </span>
          <div className="bg-primary-30 rounded-lg flex">
            <span
              onClick={handlePrevPage}
              className={`p-2 cursor-pointer border-r-[0.4px] border-border-20 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img src={ICONS.leftArrow} alt="Previous" />
            </span>
            <span
              onClick={handleNextPage}
              className={`p-2 cursor-pointer ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <img src={ICONS.rightArrow} alt="Next" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
