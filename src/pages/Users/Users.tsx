import { useEffect, useState } from "react";
import Table from "../../components/Shared/Table/Table";
import axios from "axios";

const columns = [
  { header: "ID", accessor: "_id", width: "250px", cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent" },
  { header: "Name", accessor: "full_name", width: "150px", cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent" },
  { header: "Email", accessor: "email", width: "250px", cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent" },
  { header: "Mobile No", accessor: "phoneNo", width: "150px", cellClassName: "font-normal text-[14px] leading-[17px] text-text-accent" },
];

const Users = () => {
  const [userData, setUserData] = useState<any[]>([]); // State to store the fetched users
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await axios.get("https://interior-design-backend-nine.vercel.app/api/v1/admin/users", {
          withCredentials:true
        });
        console.log(response)
        setUserData(response.data.users)

       } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div>
      <h1 className="font-normal text-[32px] leading-10 mb-8 text-text-accent">
        Total Users
      </h1>
      <Table
        data={userData} // Pass the fetched data to the Table component
        columns={columns}
        tableName="User Information"
        enablePagination={true}
        rowsPerPage={5}
        tableHeight="400px"
        showViewAll={false}
        searchPlaceholder="Search by Name, Phone or ID"

      />
    </div>
  );
};

export default Users;
