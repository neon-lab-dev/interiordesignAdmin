import React, { useState } from "react";
import InputField from "../../components/Shared/inputField";
import Button from "../../components/Shared/button";
import Modal from "../../components/Shared/popupModal";
import axios from "axios";

const CreateProducts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productKeyFeature, setProductKeyFeature] = useState<string>("");
  const [productSpecification, setProductSpecification] = useState<string>("");
  const [sizes, setSizes] = useState([
    { size: "", basePrice: "", discountedPercent: "", stock: "" },
  ]);
  const [color ,setColor]=useState<string>("")
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleSizeChange = (index: number, field: string, value: string) => {
    const updatedSizes:any = [...sizes];
    updatedSizes[index][field] = value;
    setSizes(updatedSizes);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const name=e.target.name.value;
  //   const description=e.target.description.value;
  //   console.log(description)
  //   // setIsSubmitting(true);
  //   // const formData = new FormData();
  //   // formData.append("name", productName);

  //   // // Append features & specifications as comma-separated strings
  //   // formData.append("description", Array.isArray(productDescription) ? productDescription.join(" ") : productDescription);
  //   // formData.append("keyFeatures", Array.isArray(productKeyFeature) ? productKeyFeature.join(" ") : productKeyFeature);
  //   // formData.append("specifications", Array.isArray(productSpecification) ? productSpecification.join(" ") : productSpecification);

  //   // // Append sizes
  //   // sizes.forEach((size, index) => {
  //   //   formData.append(`sizes[${index}][size]`, size.size);
  //   //   formData.append(`sizes[${index}][basePrice]`, size.basePrice);
  //   //   formData.append(`sizes[${index}][discountedPercent]`, size.discountedPercent);
  //   //   formData.append(`sizes[${index}][stock]`, size.stock);
  //   // });

  //   // // Append categories, subcategories, and colors
  //   // categories.forEach((category, index) => formData.append(`category[${index}]`, category));
  //   // subCategories.forEach((subcategory, index) => formData.append(`subCategory[${index}]`, subcategory));
  //   // availableColors.forEach((color, index) => formData.append(`availableColors[${index}]`, color));

  //   // // Append images
  //   // selectedFiles.forEach((file) => formData.append("images", file));

  //   // try {
  //   //   const response = await axios.post(
  //   //     "https://interior-design-backend-nine.vercel.app/api/v1/createproduct",
  //   //     formData,
  //   //     { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true,  }
        
  //   //   );
  //   //   console.log("Product created successfully:", response.data);
  //   //   alert("Product created successfully!");
  //   // } catch (error) {
  //   //   console.error("Error creating product:", error);
  //   //   alert("Failed to create product.");
  //   // } finally {
  //   //   setIsSubmitting(false);
  //   // }
  // };

  const handleCreateProduct=(e)=>{
    e.preventDefault();
    const name=e.target.name.value;
    const description=e.target.description.value;
    const keyFeatures=e.target.keyFeatures.value;
    const specification=e.target.specification.value;const basePrice=e.target.basePrice.value;
    const discountedPercent=e.target.discountedPercent.value;
    const stock=e.target.stock.value;
    const category=e.target.category.value;
    
    const sub_category=e.target.sub_category.value;
    
    const size=e.target.size.value;
    const color=e.target.color.value;
    const Availablecolor=e.target.Availablecolor.value;
    const images=e.target.files[0]

    const formData = new FormData();
formData.append("name",e.target.name.value);
    console.log(formData.get("name"));

  }
  const isButtonDisabled = !productName;

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
      <form className="flex" onSubmit={handleCreateProduct}>
        <div className="border-r-2 border-dashed h-full px-14 w-[623px] border-border-10 flex flex-col ">
          <InputField
            type="text"
            placeholder="Product Name"
            value={productName}
            name="name"
            onChange={(value) => setProductName(value as string)}
            className="w-[513px] h-[44px] mb-7"
          />
          <InputField
            type="textarea"
            placeholder="Product Description"
            value={productDescription}
            name="description"
            onChange={(value) => setProductDescription(value as string)}
            className="w-[513px] mb-4"
          />
          <InputField
            type="textarea"
            placeholder="Product Key FeatureS"
            value={productKeyFeature}
            name="keyFeatures"
            onChange={(value) => setProductKeyFeature(value as string)}
            className="w-[513px] mb-4"
          />
          <InputField
            type="textarea"
            placeholder="Product Specification"
            value={productSpecification}
            name="specification"
            onChange={(value) => setProductSpecification(value as string)}
            className="w-[513px] mb-4"
          />

          {/* Dynamic sizes */}
          {sizes.map((size, index) => (
            <div key={index}>
              <InputField
                type="text"
                placeholder="Base Price"
                value={size.basePrice}
                name="basePrice"
                onChange={(value) =>
                  handleSizeChange(index, "basePrice", value as string)
                }
                className="w-[513PX] mb-4"
              />
              <InputField
                type="text"
                placeholder="Discounted Percent"
                value={size.discountedPercent}
                name="discountedPercent"
                onChange={(value) =>
                  handleSizeChange(index, "discountedPercent", value as string)
                }
                className="w-[513PX] mb-4"
              />
              <InputField
                type="text"
                placeholder="Stock"
                value={size.stock}
                name="stock"
                onChange={(value) =>
                  handleSizeChange(index, "stock", value as string)
                }
                className="w-[513PX] mb-4"
              />
            </div>
          ))}

          <InputField
            type="select"
            value={categories}
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Categories"
            name="category"
            className="w-[513px] h-[44px] mb-7"
            onChange={(newValues) => {
              // Ensure newValues is always an array
              setCategories(
                Array.isArray(newValues) ? newValues : [newValues]
              );
            }}
          />
          <InputField
            type="select"
            value={subCategories}
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Sub Categories"
            name="sub_category"
            className="w-[513px] h-[44px] mb-7"
            onChange={(newValues) => {
              // Ensure newValues is always an array
              setSubCategories(
                Array.isArray(newValues) ? newValues : [newValues]
              );
            }}
          />
          {sizes.map((size, index) => (
            <div key={index}>
              <InputField
                type="text"
                placeholder={`Size ${index + 1}`}
                value={size.size}
                name="size"
                onChange={(value) =>
                  handleSizeChange(index, "size", value as string)
                }
                className="w-[513PX] mb-4"
              />
            </div>
          ))}
          <InputField
            type="text"
            placeholder="Color"
            name="color"
            value={color}
            onChange={(value) => setColor(value as string)}
            className="w-[513px] h-[44px] mb-7"
          />
          <InputField
            type="select"
            value={availableColors}
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Available Colors"
            name="Availablecolor"
            className="w-[513px] h-[44px] mb-7"
            onChange={(newValues) => {
              // Ensure newValues is always an array
              setAvailableColors(
                Array.isArray(newValues) ? newValues : [newValues]
              );
            }}
          />
          <Button
          type="submit"
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
                multiple
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
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
        <div className="w-[656px] flex flex-col gap-4 px-4 py-2 items-center">
          <h1 className="text-text-accent text-[24px] text-center leading-[30px] pl-[33px]">
            Verification Details
          </h1>
          <div className="border-t-2 border-dashed border-border-30 w-[656px] flex flex-col gap-6 py-4 px-2">
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Product Name:{productName}
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Description:{productDescription}
            </p>
            <p className="text-[18px] leading-[22px]  font-normal text-text-accent ">
              Discounted Price:{}
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
