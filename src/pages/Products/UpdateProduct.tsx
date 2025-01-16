/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Shared/button";
import InputField2 from "../../components/Shared/InputField2";
import InputField from "../../components/Shared/inputField";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const UpdateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  // Fetch product details on component load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://interior-design-backend-nine.vercel.app/api/v1/product/${productId}`,
          { withCredentials: true }
        );
        if (response.data && response.data.product) {
          setProduct(response.data.product);
          const existingImages = response.data.product.images || [];
          setImagePreviews(existingImages);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Handle input changes for main product fields
  const handleFieldChange = (field: string, value: string | number) => {
    setProduct((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle size input changes
  const handleSizeChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedSizes = [...product.sizes];
    updatedSizes[index][field] = value;
    setProduct((prev: any) => ({
      ...prev,
      sizes: updatedSizes,
    }));
  };

  // Update product details
  const updateProductDetails = async () => {
    try {
      const formData = new FormData();

      // Add the main product details
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("keyFeatures", product.keyFeatures);
      formData.append("specification", product.specification);
      formData.append("category", product.category);
      formData.append("color", product.color);

      // Add sizes data (note: each size is indexed as sizes[0], sizes[1], etc.)
      product.sizes.forEach((size: any, index: number) => {
        formData.append(`sizes[${index}][_id]`, size._id);
        formData.append(`sizes[${index}][size]`, size.size);
        formData.append(`sizes[${index}][side]`, size.side);
        formData.append(`sizes[${index}][basePrice]`, size.basePrice);
        formData.append(
          `sizes[${index}][discountedPercent]`,
          size.discountedPercent
        );
        formData.append(`sizes[${index}][stock]`, size.stock);
      });
      // Add image files if any
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
      await axios.put(
        `https://interior-design-backend-nine.vercel.app/api/v1/product/${productId}`,
        formData,
        { withCredentials: true }
      );
      alert("Product updated successfully!");
      console.log(formData);
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  if (!product) {
    return <LoadingSpinner/>;
  }
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
  const removeImage = (url: string) => {
    setImagePreviews((prev) => prev.filter((preview) => preview !== url));
  };

  return (
    <div className="flex flex-col justify-center p-5 m-6 bg-primary-20 rounded-[10px]">
      <h1>Update Product</h1>

      {/* Main Product Details */}
      <div className="flex w-full p-10 justify-center">
        <div className="border-r-2 border-dashed h-full  border-border-10 flex-1 flex-col pr-10">
          <div className="flex flex-col w-[513px] gap-5 mb-5">
            <div className="flex flex-col gap-5 mb-5">
              <InputField2
                id="name"
                name="name"
                placeholder="Name"
                value={product.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange("name", e.target.value)
                }
              />
              <InputField2
                id="description"
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange("description", e.target.value)
                }
              />
              <InputField2
                id="keyFeatures"
                name="keyFeatures"
                placeholder="Key Features"
                value={product.keyFeatures}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange("keyFeatures", e.target.value)
                }
              />
              <InputField2
                id="specification"
                name="specification"
                placeholder="Specification"
                value={product.specification}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange("specification", e.target.value)
                }
              />
             <InputField
  type="select"
  value={product.category}
  options={["Bed sheet", "Chairs", "Tables"]}
  placeholder="Categories"
  name="category"
  className="w-[513px] h-[44px] mb-7"
  onChange={(newValue: string) =>
    handleFieldChange("category", newValue)
  }
  isMulti={false}
/>

              
            </div>
            <InputField2
              id="color"
              name="color"
              placeholder="Color"
              value={product.color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFieldChange("color", e.target.value)
              }
            />
          </div>

          {/* Sizes Section */}
          <div >
            <h3>Sizes</h3>
            {product.sizes.map((size: any, index: number) => (
              <div key={index} className="flex flex-col gap-5  p-2 mb-2">
                <InputField2
                  id={`size-${index}`}
                  name={`size-${index}`}
                  placeholder="Size"
                  value={size.size}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSizeChange(index, "size", e.target.value)
                  }
                />
                <InputField2
                  id={`basePrice-${index}`}
                  name={`basePrice-${index}`}
                  placeholder="Base Price"
                  value={size.basePrice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSizeChange(
                      index,
                      "basePrice",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <InputField2
                  id={`discountedPercent-${index}`}
                  name={`discountedPercent-${index}`}
                  placeholder="Discount Percent"
                  value={size.discountedPercent}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSizeChange(
                      index,
                      "discountedPercent",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <InputField2
                  id={`stock-${index}`}
                  name={`stock-${index}`}
                  placeholder="Stock"
                  value={size.stock}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSizeChange(index, "stock", parseInt(e.target.value))
                  }
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            text="Update Product"
            onClick={updateProductDetails}
            color="bg-accent-10 w-[513px] h-[44px] h-[44px] mb-5"
          />
        </div>
        <UploadImage
          removeImage={removeImage}
          handleImageChange={handleImageChange}
          imagePreviews={imagePreviews}
        />
      </div>
    </div>
  );
};

export default UpdateProduct;
