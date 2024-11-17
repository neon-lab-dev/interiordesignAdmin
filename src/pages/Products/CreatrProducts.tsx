import React, { useState } from "react";
import InputField from "../../components/Shared/inputField";
import Button from "../../components/Shared/button";
import Modal from "../../components/Shared/popupModal";

const CreateProducts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  const isButtonDisabled = !amount;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col justify-center py-7 m-6 bg-primary-20 rounded-[10px]">
      <h1 className="font-normal text-center text-[32px] leading-10 mb-8 text-text-accent">
        Update Product
      </h1>
      <div className="flex">
        <div className="border-r-2 border-dashed h-full px-14 w-[623px] border-border-10 flex flex-col ">
          <InputField
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] h-[44px] mb-7"
          />
          <InputField
            type="textarea"
            placeholder="Enter multiple lines of text here"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] mb-4"
          />
          <InputField
            type="textarea"
            placeholder="Enter multiple lines of text here"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] mb-4"
          />
          <InputField
            type="textarea"
            placeholder="Enter multiple lines of text here"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] mb-4"
          />
          <InputField
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] h-[44px] mb-7"
          />
          <InputField
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] h-[44px] mb-7"
          />
          <InputField
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] h-[44px] mb-7"
          />
          <InputField
            type="select"
            value={selectedOptions}
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Choose options"
            className="w-[513px] h-[44px] mb-7"
            onChange={(newValues) => {
              // Ensure newValues is always an array
              setSelectedOptions(
                Array.isArray(newValues) ? newValues : [newValues]
              );
            }}
          />
          <InputField
            type="select"
            value={selectedOptions}
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Choose options"
            className="w-[513px] h-[44px] mb-7"
            onChange={(newValues) => {
              // Ensure newValues is always an array
              setSelectedOptions(
                Array.isArray(newValues) ? newValues : [newValues]
              );
            }}
          />
          <InputField
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] h-[44px] mb-7"
          />
          <InputField
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(value) => setAmount(value as string)}
            className="w-[513px] h-[44px] mb-7"
          />
          <InputField
            type="select"
            value={selectedOptions}
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Choose options"
            className="w-[513px] h-[44px] mb-7"
            onChange={(newValues) => {
              // Ensure newValues is always an array
              setSelectedOptions(
                Array.isArray(newValues) ? newValues : [newValues]
              );
            }}
          />
          <Button
            text="Create"
            textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
            color="bg-accent-10 w-[513px] h-[44px] h-[44px] mb-5"
            disabled={isButtonDisabled}
          />
          <Button
            text="Verify"
            textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
            color="bg-primary-50 w-[513px] h-[44px]"
            disabled={isButtonDisabled}
            onClick={openModal}
          />
        </div>
        <div className="p-4 w-full flex justify-center">
          <div className="h-[453px] w-[453px] border-[1px] border-border-10 rounded-xl flex justify-center items-center overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="h-full w-full object-contain"
              />
            ) : (
              <label className="flex flex-col items-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="bg-primary-40 p-2 rounded-xl text-white w-[253px] h-[55px] flex justify-center items-center">
                  Choose Image
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
        <div className="w-[656px] flex flex-col gap-4 px-4 py-2 items-center">
          <h1 className="text-text-accent text-[24px] text-center leading-[30px] pl-[33px]">
            Verification Details
          </h1>
          <div className="border-t-2 border-dashed border-border-30 w-[656px] flex flex-col gap-6 py-4 px-2">
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Product Name:
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Description:
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Discounted Price:
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Stock:
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Category:
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Sub Category:
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Size/Type:
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Color:
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Available Color:
            </p>
          </div>
          <Button
            text="close"
            textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
            color="bg-primary-50 w-[285px] h-[44px]"
            onClick={closeModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateProducts;
