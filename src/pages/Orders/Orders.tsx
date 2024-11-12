import React, { useState } from "react";
import Table from "../../components/Shared/Table/Table";
import Modal from "../../components/Shared/popupModal";

interface Order {
  id: string;
  totalPrice: string;
  orderStatus: string;
}

const Orders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // explicitly set type to allow null

  const handleViewDetails = (id: string) => {
    // Find the order using the ID
    const order = tableData.find((order) => order.id === id);

    // Check if the order is found (it's not undefined)
    if (order) {
      setSelectedOrder(order); // Set the order to selectedOrder if found
      setModalOpen(true); // Open the modal
    } else {
      setSelectedOrder(null); // If no order found, set to null
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null); // Close the modal and reset the selectedOrder
  };

  const tableData = [
    { id: "001", totalPrice: "$120.00", orderStatus: "Delivered" },
    { id: "002", totalPrice: "$85.00", orderStatus: "Shipped" },
    { id: "003", totalPrice: "$45.50", orderStatus: "Processing" },
    { id: "004", totalPrice: "$60.75", orderStatus: "Cancelled" },
    // ...additional data
  ];

  const columns = [
    {
      header: "ID",
      accessor: "id",
      width: "180px",
      cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
    },
    {
      header: "Total Price",
      accessor: "totalPrice",
      width: "150px",
      cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
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
          className="px-3 py-1 text-accent-40 border-accent-40 bg-transparent rounded-[4px] font-normal text-[14px] leading-[17px]"
          onClick={() => handleViewDetails(row.id)}
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="">
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
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedOrder ? (
  <div>
    <div className="flex">
      <div className="flex-[0.3]"> {/* Make this column smaller */}
        <p className="text-center text-text-accent text-[18px] leading-[21px]">Order Item</p>
        <div className=" border-r-2 border-dashed border-border-40">kdjfv</div>
      </div>
      <div className="flex-[0.7]"> {/* Make this column larger */}
      <p className="text-center text-text-accent text-[18px] leading-[21px]">Order Information</p>
      <div className="">fddfv</div>
      </div>
    </div>
    <div className="flex">
      
     
    </div>
  </div>
) : (
  <p>No order found.</p>
)}

        
      </Modal>
    </div>
  );
};

export default Orders;
