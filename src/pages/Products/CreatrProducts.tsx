/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "../../components/Shared/button";
import Modal from "../../components/Shared/popupModal";
import { useForm } from "react-hook-form";
import InputField2 from "../../components/Shared/InputField2";
import InputField from "../../components/Shared/InputField";
import VerifyProducts from "./VerifyProducts";
import UploadImage from "./UploadImage";

const CreateProducts: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [sizes, setSizes] = useState<
    {
      size: string;
      basePrice: string;
      discountedPercent: string;
      stock: string;
    }[]
  >([]);

  const [currentSize, setCurrentSize] = useState({
    size: "",
    basePrice: "",
    discountedPercent: "",
    stock: "",
  });

  const handleAddSize = () => {
    const { size, basePrice, discountedPercent, stock } = currentSize;
    if (!size || !basePrice || !discountedPercent || !stock) {
      alert("All size fields are required.");
      return;
    }
    setSizes([...sizes, currentSize]);
    setCurrentSize({
      size: "",
      basePrice: "",
      discountedPercent: "",
      stock: "",
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSize((prev) => ({ ...prev, [name]: value }));
  };

  const [categories, setCategories] = useState<File[]>([]);
  const [subCategories, setSubCategories] = useState<File[]>([]);
  const [availableColors, setAvailableColors] = useState<File[]>([]);

  const handleAddProduct = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("keyFeatures", data.keyFeatures);
    formData.append("specification", data.specification);
    formData.append("color", data.color);
    formData.append("category", JSON.stringify(categories));
    formData.append("sub_category", JSON.stringify(subCategories));
    formData.append("Availablecolor", JSON.stringify(availableColors));
    formData.append("sizes", JSON.stringify(sizes));

    // images
    for (const image of imageFiles) {
      formData.append("images", image);
    }

    // consoling values
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  // upload image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFiles((prev) => [...prev, file]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  // remove selected image
  const removeImage = (url: string) => {
    setImagePreviews((prev) => prev.filter((preview) => preview !== url));
  };

  // for data preview showing
  const [previewData, setPreviewData] = useState<any>(null);
  const openModal = (data: any) => {
    const productData = {
      name: data.name,
      description: data.description,
      keyFeatures: data.keyFeatures,
      specification: data.specification,
      category: categories,
      sub_category: subCategories,
      Availablecolor: availableColors,
      color: data.color,
      sizes: sizes,
      images: imagePreviews,
    };
    setPreviewData(productData);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col justify-center py-7 m-6 bg-primary-20 rounded-[10px]">
      <h1 className="font-normal text-center text-[32px] leading-10 mb-8 text-text-accent">
        Update Product
      </h1>
      <form className="flex" onSubmit={handleSubmit(handleAddProduct)}>
        <div className="border-r-2 border-dashed h-full  border-border-10 flex flex-col pr-10">
          <div className="flex flex-col gap-5 mb-5">
            <InputField2
              id="name"
              name="name"
              placeholder="Product Name"
              required={true}
              error={errors.name}
              register={register("name", {
                required: "Product name is required",
              })}
            />

            <div className="flex flex-col gap-2">
              <textarea
                rows={5}
                id="description"
                placeholder="Product description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="p-4 rounded-xl bg-primary-30 w-full text-text-accent"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <textarea
                rows={5}
                id="keyFeatures"
                placeholder="Product Key Features"
                {...register("keyFeatures", {
                  required: "Features are required",
                })}
                className="p-4 rounded-xl bg-primary-30 w-full text-text-accent"
              />
              {errors.keyFeatures && (
                <p className="text-red-500 text-sm">
                  {errors.keyFeatures.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <textarea
                rows={5}
                id="specification"
                placeholder="Product Specification"
                {...register("specification", {
                  required: "Specification is required",
                })}
                className="p-4 rounded-xl bg-primary-30 w-full text-text-accent"
              />
              {errors.specification && (
                <p className="text-red-500 text-sm">
                  {errors.specification.message as string}
                </p>
              )}
            </div>

            {/* Size Fields */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <InputField2
                id="size"
                name="size"
                placeholder="Size"
                value={currentSize.size}
                onChange={handleSizeChange}
              />
              <InputField2
                id="basePrice"
                name="basePrice"
                placeholder="Base Price"
                value={currentSize.basePrice}
                onChange={handleSizeChange}
              />
              <InputField2
                id="discountedPercent"
                name="discountedPercent"
                placeholder="Discounted Percent"
                value={currentSize.discountedPercent}
                onChange={handleSizeChange}
              />
              <InputField2
                id="stock"
                name="stock"
                placeholder="Stock"
                value={currentSize.stock}
                onChange={handleSizeChange}
              />
            </div>
            <button
              onClick={handleAddSize}
              className="py-3 sm:py-4 flex justify-center items-center gap-2 bg-accent-10"
            >
              Add Size
            </button>

            {/* Show the added sizes */}
            <div className="grid grid-cols-2 gap-3">
              {sizes.map((size, index) => (
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
          </div>

          <div className="mb-5">
            <InputField2
              id="color"
              name="color"
              placeholder="Color"
              required={true}
              error={errors.color}
              register={register("color", {
                required: "Color is required",
              })}
            />
          </div>
          <InputField
            type="select"
            value={categories}
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Categories"
            name="category"
            className="w-[513px] h-[44px] mb-7"
            onChange={(newValues) => {
              setCategories(Array.isArray(newValues) ? newValues : [newValues]);
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
              setSubCategories(
                Array.isArray(newValues) ? newValues : [newValues]
              );
            }}
          />

          <InputField
            type="select"
            value={availableColors}
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Available Colors"
            name="Availablecolor"
            className="w-[513px] h-[44px] mb-7"
            onChange={(newValues) => {
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
          />
          <Button
            text="Verify"
            textClass="text-[18px] leading-[21.6px] text-white font-verdana font-normal text-center"
            color="bg-primary-50 w-[513px] h-[44px]"
            onClick={handleSubmit(openModal)}
          />
        </div>
        <UploadImage
          removeImage={removeImage}
          handleImageChange={handleImageChange}
          imagePreviews={imagePreviews}
        />
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
        <VerifyProducts closeModal={closeModal} previewData={previewData} />
      </Modal>
    </div>
  );
};

export default CreateProducts;
