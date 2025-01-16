import { useState, useEffect } from "react";
import Table from "../../components/Shared/Table/Table";
import Modal from "../../components/Shared/popupModal";
import axios from "axios";

interface ShippingInfo {
  landmark: string;
  address: string;
  city: string;
  state: string;
  pinCode: number;
  phoneNo: number;
}
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
  product: string;
  _id: string;
}

interface Order {
  _id: string;
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  userId: string;
  paidAt: string;
  itemsPrice: number;
  totalPrice: number;
  discount: number;
  orderStatus: string;
  razorpay_payment_id: string;
  createdAt: string;
  __v: number;
  deliveredAt?: string; // Optional because it may not exist in some orders
}

interface User {
  name: string;
  phoneNo: string;
  email: string;
}
const Orders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); 
  const [orders, setOrders] = useState<Order[]>([]);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 

  // Fetch data from the API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {

        const response = await axios.get(
          "https://interior-design-backend-nine.vercel.app/api/v1/admin/orders/",
          {
           withCredentials:true}
        );
        // console.log(response);
        setOrders(response.data.orders)
        
       
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch user details when the selected order changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!selectedOrder) return;

      const { userId } = selectedOrder;
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("No token found. User is not logged in.");
          return;
        }

        const response = await fetch(
          `https://interior-design-backend-nine.vercel.app/api/v1/admin/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUserDetails(data.user); // Assuming `data.user` contains user details
          } else {
            console.error("Unexpected response format:", data);
          }
        } else {
          console.error(
            "Failed to fetch user details:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [selectedOrder]);

  const handleViewDetails = (id: string) => {
    const order = orders.find((order) => order._id === id);
    if (order) {
      setSelectedOrder(order);
      setModalOpen(true);
    } else {
      console.error("No order found for ID:", id);
    }
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
    setUserDetails(null); 
    setStatus("");
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const updateOrderStatus = async () => {
    if (!selectedOrder) return;

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found. User is not logged in.");
        return;
      }

      const response = await fetch(
        `https://interior-design-backend-nine.vercel.app/api/v1/admin/order/${selectedOrder._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update the orders state
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === selectedOrder._id
                ? { ...order, orderStatus: status }
                : order
            )
          );
          closeModal(); // Close modal after successful update
          console.log("Order status updated successfully!");
        } else {
          console.error("Unexpected response format:", data);
        }
      } else {
        console.error(
          "Failed to update order status:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const columns = [
    {
      header: "ID",
      accessor: "_id",
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
          onClick={() => handleViewDetails(row._id)}
        >
          View Details
        </button>
      ),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <h1 className="font-normal text-[32px] leading-10 mb-8 text-text-accent">
        Total Orders
      </h1>
      <Table
        data={orders}
        columns={columns}
        tableName="Order Table"
        showViewAll={true}
        enablePagination={true}
        rowsPerPage={4}
        tableWidth="100%"
        tableHeight="400px"
        searchPlaceholder="Search by order id or Total price"
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
                {selectedOrder.orderItems.map((item, index) => (
                  <div className=" flex flex-col gap-2" key={index}>
                    <div className="w-full  rounded-2xl  bg-primary-30">
                      <img className="rounded-2xl" src={item.image} alt={item.name} />
                    </div>
                    <p className="text-text-accent text-[14px] leading-[17px] font-normal">
                      {item.name}
                    </p>
                    <div className="flex justify-between w-full mt-2">
                      <p className="text-text-accent text-[14px] leading-[17px]  font-normal">
                        Price:
                        <span className="text-[12px] leading-[15px] text-text-tertiary">
                          ₹{item.price}
                        </span>
                      </p>
                      <p className="text-text-accent text-[14px] leading-[17px]  font-normal">
                        Qty:
                        <span className="text-[12px] leading-[15px] text-text-tertiary">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                    <p className="text-text-accent text-[14px] leading-[17px]  font-normal">
                      Product ID:{" "}
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        {item.product}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Information Section */}
              <div className="flex flex-col w-[435px] pl-8 text-white">
                <p className="text-center text-text-accent text-[18px] leading-[21px] pb-4">
                  Order Information
                </p>
                <div className="border-b-2 border-border-40 w-[435px] border-dashed flex flex-col gap-3 pb-4 mb-4">
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Address:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                    {selectedOrder.shippingInfo.address}
                    </span>{" "}
                  </p>
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Landmark:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                    {selectedOrder.shippingInfo.landmark}
                    </span>
                  </p>
                  <div className="flex justify-between">
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      State:
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                      {selectedOrder.shippingInfo.state}
                      </span>{" "}
                    </p>
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      City:{" "}
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                      {selectedOrder.shippingInfo.city}
                      </span>
                    </p>
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      Country:
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                        India
                      </span>{" "}
                    </p>
                  </div>
                  <p className="text-[14px] leading-[17px] text-text-accent ">
                    Pin Code:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                    
                    {selectedOrder.shippingInfo.pinCode}
                    </span>
                  </p>
                </div>
                <div className="border-b-2 border-border-40 w-[435px] border-dashed flex flex-col gap-3 pb-4 mb-4">
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Items Price:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                    ₹{selectedOrder.itemsPrice}
                    </span>{" "}
                  </p>
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Discount:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      ₹{selectedOrder.discount}
                    </span>{" "}
                  </p>
                  <p className="text-[14px] leading-[17px] text-text-accent">
                    Total Price:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                      ₹ {selectedOrder.totalPrice}
                    </span>{" "}
                  </p>
                </div>
                <div className="border-b-2 border-border-40 w-[435px] border-dashed flex flex-col gap-3 pb-4 mb-4">
                  <div className="flex justify-between w-[435px]">
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      User Name:
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                      {userDetails?.name || "N/A"}
                      </span>
                    </p>
                    <p className="text-[14px] leading-[17px] text-text-accent">
                      Phone No:
                      <span className="text-[12px] leading-[15px] text-text-tertiary">
                      {userDetails?.phoneNo || "N/A"}
                      </span>{" "}
                    </p>
                  </div>

                  <p className="text-[14px] leading-[17px] ">
                    User Email:
                    <span className="text-[12px] leading-[15px] text-text-tertiary">
                    {userDetails?.email || "N/A"}
                    </span>{" "}
                  </p>
                </div>
                <div className="pb-4 w-[435px]">
  <p className="text-[14px] leading-[17px]">
    Order Status: 
    <span className="text-error">
      {status ? status : selectedOrder.orderStatus}
    </span>
  </p>
</div>
                <select
                className="w-[435px] bg-primary-30 text-text-accent p-2 rounded-lg h-10 p-2"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="" disabled>
                  Choose Status
                </option>
                <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
              </select>

                {/* Process Order Section */}
                <div className="flex w-[435px] items-center gap-4 mt-4">
                  <button className="bg-accent-30 text-white py-2 px-4 h-[50px] rounded-md w-full" onClick={updateOrderStatus}
                  disabled={!status}>
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
