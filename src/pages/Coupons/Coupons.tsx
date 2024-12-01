import React, { useState, useEffect } from "react";
import { ICONS } from "../../assets";
import Table from "../../components/Shared/Table/Table";
import Modal from "../../components/Shared/popupModal";
import Button from "../../components/Shared/button";
import InputField from "../../components/Shared/InputField";
import axios from "axios";
import { findAllInRenderedTree } from "react-dom/test-utils";

interface Coupon {
  _id: number;
  code: string;
  amount: number;
}

const Coupons: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [couponsData, setCouponsData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const couponColumns = [
    {
      header: "ID",
      accessor: "_id",
      width: "30%",
      cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
    },
    {
      header: "Coupon Code",
      accessor: "code",
      width: "35%",
      cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
    },
    {
      header: "Amount",
      accessor: "amount",
      width: "20%",
      cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
    },
    {
      header: "Action",
      accessor: "action",
      width: "5%",
      cellRenderer: (row: Coupon) => (
        <div className="flex">
          <button
            onClick={() => handleDeleteCoupon(row._id)} // Use the correct field `_id`
            className="px-2 py-1 bg-primary-30 text-white rounded w-9"
          >
            <img src={ICONS.deleteIcon} className="w-6 h-6" alt="Delete" />
          </button>
        </div>
      ),
    },
  ];
  
  
  const handleDeleteCoupon = async (couponId: number) => {
    console.log(couponId)
      try {
        const response = await axios.delete(
          `https://interior-design-backend-nine.vercel.app/api/v1/coupon/${couponId}`,
          {
            withCredentials: true, // Ensure cookies are included if required
          }
        );

        if (response.status === 200) {
          setIsDelete(true)
        } else {
          alert(`Failed to delete coupon: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    
  };
  const createCoupon = async () => {
    try {
      // Configure Axios to send cookies
      const response = await axios.post(
        "https://interior-design-backend-nine.vercel.app/api/v1/coupon/new",
        {
          code: couponCode,
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // This enables cookies
        }
      );

      console.log(response.status);
      if (response.data.success === true) {
      } else {
        setError("coupon failed: " + response.data.message);
      }
    } catch (error: any) {
      console.error("Error details:", error);
      if (error.response) {
        // The server responded with a status code other than 2xx
        console.log("Response error:", error.response);
        setError("coupon failed: " + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("Network error, please try again.");
      } else {
        // Something happened while setting up the request
        setError("An error occurred: " + error.message);
      }
    }
    setIsVerifyModalOpen(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Get token from localStorage (or cookies if needed)
        if (!token) {
          console.error("No token found. User is not logged in.");
          return;
        }

        const response = await fetch(
          "https://interior-design-backend-nine.vercel.app/api/v1/coupon/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include", // Ensure cookies are included if the backend uses them for session management
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.coupons)) {
            setCouponsData(data.coupons);
          }
        } else {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchProductsData(); // Call the function to fetch user data
  }, [isVerifyModalOpen, isModalOpen,isDelete]); // Empty dependency array ensures the effect runs only once when the component mounts

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openVerifyModal = () => {
    setIsVerifyModalOpen(true);
    setIsModalOpen(false);
  };
  const closeVerifyModal = () => setIsVerifyModalOpen(false);

  const isButtonDisabled = !couponCode || !amount;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-normal text-[32px] leading-10 mb-8 text-text-accent">
          All Coupons
        </h1>
        <Button
          text="Create Coupon"
          imgSrc={ICONS.createProducts}
          color="bg-accent-20 h-[50px]"
          iconClassName="text-white h-[28px] w-[28px]"
          textClass="text-base text-white font-semibold"
          onClick={openModal}
        />
      </div>

      {/* Loading or error state */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Render table only if data is available */}
      {!loading && !error && (
        <Table
          data={couponsData}
          columns={couponColumns}
          tableName="Coupons"
          enablePagination={true}
          rowsPerPage={5}
          showViewAll={false}
          tableHeight="400px"
          tableWidth="100%"
          searchPlaceholder="Search Coupon"
        />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} showCloseButton={true}>
        <div className="w-[763px]">
          <div className="flex p-6">
            <div className="flex pr-[33px] items-center justify-center border-r-2 border-dashed border-border-40">
              <img
                src={ICONS.couponImg}
                className="h-[293px] w-[293px]"
                alt="Coupon"
              />
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-text-accent text-[24px] leading-[30px] pl-[33px]">
                Create New Coupon
              </h1>
              <div className="flex flex-col justify-center items-center px-[33px] gap-3">
                <InputField
                  type="text"
                  placeholder="Enter new Coupon code"
                  value={couponCode}
                  onChange={(val: string | string[]) =>
                    setCouponCode(val as string)
                  }
                  className="w-[324px] h-[44px] mb-3"
                />
                <InputField
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={(val: number) => setAmount(val as number)}
                  className="w-[324px] h-[44px] mb-3"
                />
                <Button
                  text="Create"
                  textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
                  color="bg-accent-30 w-[324px] h-[44px]"
                  disabled={isButtonDisabled}
                  onClick={createCoupon}
                />
                <Button
                  text="Verify"
                  textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
                  color="bg-primary-50 w-[324px] h-[44px]"
                  onClick={openVerifyModal}
                  disabled={isButtonDisabled}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isVerifyModalOpen}
        onClose={closeVerifyModal}
        showCloseButton={true}
      >
        <div className="w-[763px]">
          <div className="flex p-6">
            <div className="flex pr-[33px] items-center justify-center border-r-2 border-dashed border-border-40">
              <img
                src={ICONS.couponImg}
                className="h-[293px] w-[293px]"
                alt="Coupon"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-text-accent text-[24px] leading-[30px] pl-[33px]">
                Verify the Coupon
              </h1>
              <div className="flex flex-col px-[33px] gap-5">
                <p className="text-text-accent text-[18px] leading-[22px]">
                  Coupon Code: {couponCode}
                </p>
                <p className="text-text-accent text-[18px] leading-[22px]">
                  Amount: {amount}
                </p>
                <Button
                  text="Close"
                  textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
                  color="bg-primary-50 w-[324px] h-[44px]"
                  onClick={createCoupon}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Coupons;
