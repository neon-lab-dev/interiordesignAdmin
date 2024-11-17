import React, { useState } from "react";
import { ICONS } from "../../assets";
import Table from "../../components/Shared/Table/Table";
import Modal from "../../components/Shared/popupModal";
import Button from "../../components/Shared/button";
import InputField from "../../components/Shared/inputField";

interface Coupon {
  id: number;
  code: string;
  amount: number;
}

const couponColumns = [
  {
    header: "ID",
    accessor: "id",
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
          onClick={() => handleDeleteCoupon(row.id)}
          className="px-2 py-1 bg-primary-30 text-white rounded w-9"
        >
          <img src={ICONS.deleteIcon} className="w-6 h-6" alt="Delete" />
        </button>
      </div>
    ),
  },
];

const couponData: Coupon[] = [
  { id: 1, code: "WELCOME10", amount: 10 },
  { id: 2, code: "SUMMER20", amount: 20 },
  { id: 3, code: "FALL15", amount: 15 },
  { id: 4, code: "WINTER25", amount: 25 },
];

const handleDeleteCoupon = (productId: number) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    alert(`Product with ID: ${productId} deleted`);
  }
};

const Coupons: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

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

      <Table
        data={couponData}
        columns={couponColumns}
        tableName="Coupons"
        enablePagination={true}
        rowsPerPage={5}
        showViewAll={false}
        tableHeight="400px"
        tableWidth="100%"
      />

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
                  className="w-[324px] h-[44px]"
                />
                <InputField
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={(val: string | string[]) =>
                    setAmount(val as string)
                  }
                  className="w-[324px] h-[44px]"
                />
                <Button
                  text="Create"
                  textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
                  color="bg-accent-30 w-[324px] h-[44px]"
                  disabled={isButtonDisabled}
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
                  onClick={closeVerifyModal}
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
