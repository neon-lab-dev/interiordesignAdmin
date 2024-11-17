import { useState } from "react";
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
      <Modal isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
        {selectedOrder ? (
          <div className="w-[786px] p-6 bg-primary-20 rounded-lg">
            <div className="flex">
              {/* Order Items Section */}
              <div className="flex flex-col border-r-2 border-dashed border-border-40 gap-2 pr-4 w-[275px] max-h-[510px] overflow-y-auto hide-scrollbar">
                <p className="text-center text-text-accent text-[18px] leading-[21px] pb-4">
                  Order Items
                </p>
                {/* First Item */}
                <div className=" flex flex-col gap-2">
                  <div className="w-[226px] h-[229px] rounded-2xl  bg-primary-30"></div>
                  <p className="text-text-accent text-[14px] leading-[17px] font-normal">
                    Poise Study Chair with Net Back
                  </p>
                  <div className="flex justify-between w-full mt-2">
                    <p className="text-text-accent text-[14px] leading-[17px]  font-normal">
                      Price:{" "}
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        ₹1500{}
                      </span>
                    </p>
                    <p className="text-text-accent text-[14px] leading-[17px]  font-normal">
                      Qty:{" "}
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        1{}
                      </span>
                    </p>
                  </div>
                  <p className="text-text-accent text-[14px] leading-[17px]  font-normal">
                    Product ID:{" "}
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      65e03542ff44552qgfg{}
                    </span>
                  </p>
                </div>
                <div className=" flex flex-col  gap-2">
                  <div className="w-[226px] h-[229px] rounded-2xl  bg-primary-30"></div>
                </div>
              </div>

              {/* Order Information Section */}
              <div className="flex flex-col w-[435px] pl-8 text-white">
                <p className="text-center text-text-accent text-[18px] leading-[21px] pb-4">
                  Order Information
                </p>
                <div className="border-b-2 border-border-40 w-[435px] border-dashed flex flex-col gap-3 pb-4 mb-4">
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Address:{" "}
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      {}Tulsipur 4 Banahari Dang
                    </span>{" "}
                  </p>
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Landmark:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      Purvanchal Campus abc{}
                    </span>
                  </p>
                  <div className="flex justify-between">
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      State:
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        Lumbini{}
                      </span>{" "}
                    </p>
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      City:{" "}
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        Tulsipur{}
                      </span>
                    </p>
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      Country:
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        India{}
                      </span>{" "}
                    </p>
                  </div>
                  <p className="text-[14px] leading-[17px] text-text-accent ">
                    Pin Code:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      {" "}
                      22200{}
                    </span>
                  </p>
                </div>
                <div className="border-b-2 border-border-40 w-[435px] border-dashed flex flex-col gap-3 pb-4 mb-4">
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Items Price:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      ₹1500{}
                    </span>{" "}
                  </p>
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Discount:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      ₹0{}
                    </span>{" "}
                  </p>
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Total Price:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      ₹0{}
                    </span>{" "}
                  </p>
                </div>
                <div className="border-b-2 border-border-40 w-[435px] border-dashed flex flex-col gap-3 pb-4 mb-4">
                  <div className="flex justify-between w-[435px]">
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      User Name:
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        Test 12345{}
                      </span>{" "}
                    </p>
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      Phone No:
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        9545854125{}
                      </span>{" "}
                    </p>
                  </div>

                  <p className="text-[14px] leading-[17px] ">
                    User Email:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      Test.12345@gmail.com{}
                    </span>{" "}
                  </p>
                </div>
                <div className="pb-4 w-[435px]">
                  <p className="text-[14px] leading-[17px] ">
                    Order Status: <span className="text-error">Processing</span>
                  </p>
                </div>
                <select className="w-[435px] bg-primary-30 text-text-accent p-2 rounded-lg h-10 p-2">
                  <option>Choose Status</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

                {/* Process Order Section */}
                <div className="flex w-[435px] items-center gap-4 mt-4">
                  <button className="bg-accent-30 text-white py-2 px-4 h-[50px] rounded-md w-full">
                    Process
                  </button>
                  <button className="bg-primary-50 text-white py-2 px-4 h-[50px] rounded-md w-full">
                    Download Invoice
                  </button>
                </div>
              </div>
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
