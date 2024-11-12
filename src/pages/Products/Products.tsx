import React from "react";
import Table from "../../components/Shared/Table/Table"; // Adjust the path as needed
import Button from "../../components/Shared/button";
import { ICONS } from "../../assets";

// Example product data
const productData = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/50", // Replace with actual image URLs
    category: "Electronics",
    discount: "10%",
    price: "$100",
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    category: "Clothing",
    discount: "15%",
    price: "$50",
    stock: "Out of Stock",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    category: "Clothing",
    discount: "15%",
    price: "$50",
    stock: "Out of Stock",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    category: "Clothing",
    discount: "15%",
    price: "$50",
    stock: "Out of Stock",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    category: "Clothing",
    discount: "15%",
    price: "$50",
    stock: "Out of Stock",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    category: "Clothing",
    discount: "15%",
    price: "$50",
    stock: "Out of Stock",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    category: "Clothing",
    discount: "15%",
    price: "$50",
    stock: "Out of Stock",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    category: "Clothing",
    discount: "15%",
    price: "$50",
    stock: "Out of Stock",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    category: "Clothing",
    discount: "15%",
    price: "$50",
    stock: "Out of Stock",
  },
  // Add more products as needed
];

// Function to handle viewing a product
const handleViewProduct = (productId: number) => {
  alert(`View product with ID: ${productId}`);
  // Add logic to open a modal or navigate to a product detail page
};

// Function to handle deleting a product
const handleDeleteProduct = (productId: number) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    // Add logic to delete the product
    alert(`Product with ID: ${productId} deleted`);
  }
};

// Define table columns
const columns = [
  {
    header: "ID",
    accessor: "id",
    width: "20%",
    cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
  },
  {
    header: "Name",
    accessor: "name",
    width: "20%",
    cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
  },
  {
    header: "Image",
    accessor: "image",
    width: "10%",

    cellRenderer: (row: any) => (
      <img src={row.image} alt={row.name} className="w-20 h-24 object-cover" />
    ),
  },
  {
    header: "Category",
    accessor: "category",
    width: "15%",
    cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
  },
  {
    header: "Discount",
    accessor: "discount",
    width: "10%",
    cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
  },
  {
    header: "Price",
    accessor: "price",
    width: "10%",
    cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
  },
  {
    header: "Stock",
    accessor: "stock",
    width: "10%",
    cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
  },
  {
    header: "Action",
    accessor: "action",
    width: "15%",
    cellRenderer: (row: any) => (
      <div className="flex gap-2">
         <button
          className="px-3 py-1 text-accent-40 border-accent-40 bg-transparent rounded-[4px] font-normal text-[14px] leading-[17px]"
          onClick={() => handleViewProduct(row.id)}
        >
          View
        </button>
        <button
          onClick={() => handleDeleteProduct(row.id)}
          className="px-2 py-1 bg-primary-30 text-white rounded w-9"
        >
         <img src={ICONS.deleteIcon} className="w-6 h-6"/>
        </button>
      </div>
    ),
  },
];

const Products = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-normal text-[32px] leading-10 mb-8 text-text-accent">
          All Products ({productData.length})
        </h1>
        <Button
          text="Create Product"
          imgSrc={ICONS.createProducts}
          color="bg-accent-20 h-[50px]"
          iconClassName="text-white h-[28px] w-[28px]" // Optional: Customize icon style
          textClass="text-base text-white font-semibold" // Optional: Customize text style
          onClick={() => console.log("Button clicked")} // Optional: Define an onClick handler
        />
      </div>
      <Table
        data={productData}
        columns={columns}
        tableName="Product List"
        enablePagination={true}
        rowsPerPage={5}
        showViewAll={false}
        tableHeight="500px"
        tableWidth="100%"
      />
    </div>
  );
};

export default Products;
