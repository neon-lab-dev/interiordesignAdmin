import React from "react";
import Table from "../../components/Table/Table";

const Orders = () => {
  const handleViewDetails = (id: string) => {
    console.log(`View details for order ID: ${id}`);
    // Add navigation or modal display logic here
  };
  const tableData = [
    {
      id: "001",
      totalPrice: "$120.00",
      orderStatus: "Delivered",
    },
    {
      id: "002",
      totalPrice: "$85.00",
      orderStatus: "Shipped",
    },
    {
      id: "003",
      totalPrice: "$45.50",
      orderStatus: "Processing",
    },
    {
      id: "004",
      totalPrice: "$60.75",
      orderStatus: "cancelled",
    },
    {
        id: "001",
        totalPrice: "$120.00",
        orderStatus: "Delivered",
      },
      {
        id: "002",
        totalPrice: "$85.00",
        orderStatus: "Shipped",
      },
      {
        id: "003",
        totalPrice: "$45.50",
        orderStatus: "Processing",
      },
      {
        id: "004",
        totalPrice: "$60.75",
        orderStatus: "cancelled",
      },
      {
        id: "001",
        totalPrice: "$120.00",
        orderStatus: "Delivered",
      },
      {
        id: "002",
        totalPrice: "$85.00",
        orderStatus: "Shipped",
      },
      {
        id: "003",
        totalPrice: "$45.50",
        orderStatus: "Processing",
      },
      {
        id: "004",
        totalPrice: "$60.75",
        orderStatus: "cancelled",
      },
      {
        id: "001",
        totalPrice: "$120.00",
        orderStatus: "Delivered",
      },
      {
        id: "002",
        totalPrice: "$85.00",
        orderStatus: "Shipped",
      },
      {
        id: "003",
        totalPrice: "$45.50",
        orderStatus: "Processing",
      },
      {
        id: "004",
        totalPrice: "$60.75",
        orderStatus: "cancelled",
      },
      {
        id: "001",
        totalPrice: "$120.00",
        orderStatus: "Delivered",
      },
      {
        id: "002",
        totalPrice: "$85.00",
        orderStatus: "Shipped",
      },
      {
        id: "003",
        totalPrice: "$45.50",
        orderStatus: "Processing",
      },
  ];

  const columns = [
    {
      header: "ID",
      accessor: "id",
      width: "180px",
      cellClassName:"font-normal text-[14px] leading-[17px] text-text-accent"
    },
    {
      header: "Total Price",
      accessor: "totalPrice",
      width: "150px",
      cellClassName:"font-normal text-[14px] leading-[17px] text-text-accent"
    },
    {
        header: "Order Status",
        accessor: "orderStatus",
        width: "150px",
        cellRenderer: (row: any) => (
          <span
            className={`px-2 py-1 rounded-[4px] text-center items-center text-white w-[83px] inline-block ${
              row.orderStatus === "Delivered"
                ? "bg-success"
                : row.orderStatus === "Processing"
                ? "bg-accent-20"
                : row.orderStatus === "Shipped"
                ? "bg-process"
                : "bg-error"
            }`}
          >
            {row.orderStatus}
          </span>
        ),
      },
      
    {
      header: "Action",
      accessor: "action",
      width: "50px",
      cellRenderer: (row: any) => (
        <button
          className="px-3 py-1 text-accent-40 border-accent-40  bg-transparent rounded-[4px] font-normal text-[14px] leading-[17px]"
          onClick={() => handleViewDetails(row.id)}
        >
          View Details
        </button>
      ),
    },
  ];
  

  return (
    <div className="px-6">
      <h1 className="font-normal text-[32px] leading-10 mb-8 text-text-accent">
        Total Orders
      </h1>
      <Table
        data={tableData}
        columns={columns}
        tableName="Order Table"
        showViewAll={true}
        enablePagination={true}
        rowsPerPage={4}
        tableWidth="100%"
        tableHeight="400px"
        bg_i1="bg-blue-500"
        bg_i2="bg-red-500"
        bg_i3="bg-green-500"
      />
    </div>
  );
};

export default Orders;
