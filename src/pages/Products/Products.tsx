/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Table from "../../components/Shared/Table/Table"; // Adjust the path as needed
import Button from "../../components/Shared/button";
import { ICONS } from "../../assets";
import { useNavigate ,useLocation} from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productData, setProductData] = useState<any[]>([]); // State to hold the product data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error] = useState<string>(""); // Error state
  const [reload,setReload]=useState<boolean>(false)

  // Function to handle viewing a product
    const handleEditProduct = (productId: string) => {
      navigate(`/products/update-product/${productId}`);
    };


  // Function to handle deleting a product
  const handleDeleteProduct = async (productId: string) => {  
    try {  
      const response = await axios.delete(
        `https://interior-design-backend-nine.vercel.app/api/v1/product/${productId}`, {
          withCredentials : true
        }
      );
      console.log(response);
      if(response?.data?.success){
        setReload(true);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };
  

  // Define table columns
  const columns = [
    {
      header: "ID",
      accessor: "_id",
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
      accessor: "images", // Assuming 'images' is an array
      width: "10%",
      cellRenderer: (row: any) => (
        <img
          src={row.images?.[0]?.url || "placeholder.jpg"}
          alt={row.name}
          className="w-20 h-24 object-cover"
        />
      ),
    },
    {
      header: "Category",
      accessor: "category",
      width: "15%",
      cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
    },
    {
      header: "Discount Price",
      accessor: "sizes",
      width: "10%",
      cellRenderer: (row: any) =>
        row.sizes?.[0]?.basePrice -
          (row.sizes?.[0]?.basePrice * row.sizes?.[0]?.discountedPercent) /
            100 || "N/A",
      cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent",
    },
    {
      header: "Stock",
      accessor: "sizes",
      width: "10%",
      cellRenderer: (row: any) => row.sizes?.[0]?.stock || "N/A", // Adjust based on the actual structure
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
            onClick={() => handleEditProduct(row._id)}
          >
            View
          </button>
          <button
            onClick={() => handleDeleteProduct(row._id)}
            className="px-2 py-1 bg-primary-30 text-white rounded w-9"
          >
            <img src={ICONS.deleteIcon} className="w-6 h-6" />
          </button>
        </div>
      ),
    },
  ];

  // Fetch product data from API
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get(
          "https://interior-design-backend-nine.vercel.app/api/v1/admin/product",
          {
           withCredentials:true}
        );
        console.log(response);
        setProductData(response.data.products)
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchProductsData(); // Call the function to fetch user data
  }, [reload,location.pathname]); // Empty dependency array ensures the effect runs only once when the component mounts

  // Handle the "Create Product" button click
  const handleCreateProduct = () => {
    navigate("/products/create-product");
  };

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
          iconClassName="text-white h-[28px] w-[28px]"
          textClass="text-base text-white font-semibold"
          onClick={handleCreateProduct}
        />
      </div>

      {/* Loading or error state */}
      {loading && <LoadingSpinner/>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Render table only if data is available */}
      {!loading && !error && (
        <Table
          data={productData}
          columns={columns}
          tableName="Product List"
          enablePagination={true}
          rowsPerPage={5}
          showViewAll={false}
          tableHeight="500px"
          tableWidth="100%"
          searchPlaceholder="Search Products"
        />
      )}
    </div>
  );
};

export default Products;
