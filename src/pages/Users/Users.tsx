import { useEffect, useState } from "react";
import Table from "../../components/Shared/Table/Table";

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
        const token = localStorage.getItem("adminToken"); // Get token from localStorage (or cookies if needed)
        if (!token) {
          console.error("No token found. User is not logged in.");
          return;
        }

        const response = await fetch("https://interior-design-backend-nine.vercel.app/api/v1/admin/users", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies are included if the backend uses them for session management
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.users); // Set the fetched data
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
