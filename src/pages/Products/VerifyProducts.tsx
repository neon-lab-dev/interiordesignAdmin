/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "../../components/Shared/button";

type TVerifyProductsProps = {
  closeModal: () => void;
  previewData: {
    name: string;
    description: string;
    specification: string;
    color: string;
    sizes: {
      size: string;
      basePrice: string;
      discountedPercent: string;
      stock: string;
    }[];
    category: string[];
    sub_category: string[];
    Availablecolor: string[];
    images: string[];
  };
};

const VerifyProducts:React.FC<TVerifyProductsProps> = ({ closeModal, previewData }) => {
  return (
    <div>
      <div className="w-[656px] flex flex-col gap-4 px-4 py-2 items-center">
        <h1 className="text-text-accent text-[24px] text-center leading-[30px] pl-[33px]">
          Verification Details
        </h1>
        <div className="border-t-2 border-dashed border-border-30 w-[656px] flex flex-col gap-6 py-4 px-2">
          <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
            Product Name: {previewData.name}
          </p>
          <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
            Description: {previewData.description}
          </p>
          <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
            Specification: {previewData.specification}
          </p>
          <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
            Color: {previewData.color}
          </p>
          <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
            Sizes
          </p>
          <div className="grid grid-cols-2 gap-3">
            {previewData?.sizes?.map((size: any, index: number) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-primary-30 flex flex-col gap-3 text-[#C8C8C8]"
              >
                <p>
                  <strong>Size:</strong> {size.size}
                </p>
                <p>
                  <strong>Base Price:</strong> {size.basePrice}
                </p>
                <p>
                  <strong>Discount:</strong> {size.discountedPercent}%
                </p>
                <p>
                  <strong>Stock:</strong> {size.stock}
                </p>
              </div>
            ))}
          </div>
          <div className="text-[18px] leading-[22px] font-normal text-text-accent">
            <p className="border-b pb-3 mb-2 w-fit">Category:{" "}</p>
            {previewData?.category?.map((category:string) => (
              <p>{category}</p>
            ))}
          </div>

          <div className="text-[18px] leading-[22px]  font-normal text-text-accent ">
            <p className="border-b pb-3 mb-2 w-fit">Sub Category: </p>
            
            {previewData?.sub_category?.map((subCategory:string) => (
              <p>{subCategory}</p>
            ))}
          </div>

          <div className="text-[18px] leading-[22px]  font-normal text-text-accent ">
            <p className="border-b pb-3 mb-2 w-fit">Available Colors: </p>
            
            {previewData?.Availablecolor?.map((color : string) => (
              <p>{color}</p>
            ))}
          </div>

           {/* Showing image previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-5">
          {previewData?.images.length > 0 &&
            previewData?.images.map((previewUrl:any) => (
              <div key={previewUrl} className="p-2 rounded-md border">
                <img
                  src={previewUrl}
                  alt="image"
                  className="h-full w-full object-cover object-center rounded-md"
                />
              </div>
            ))}
        </div>
         
        </div>
        <Button
          text="close"
          textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
          color="bg-primary-50 w-[285px] h-[44px]"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default VerifyProducts;
