import { useEffect, useState } from "react";
import { ICONS } from "../../assets";

const Header = () => {
  const [user, setUser] = useState(""); // Initially empty

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("No token found. User is not logged in.");
          return;
        }
    
        const response = await fetch("https://interior-design-backend-nine.vercel.app/api/v1/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",  // Use 'credentials' instead of 'withCredentials'
        });
    
        console.log("API Response Status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("API Response Data:", data);
          setUser(data.user.full_name); // Access the full name correctly
        } else {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    
      

    fetchUser(); // Fetch user data on mount
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="flex justify-end mb-4 py-4 bg-primary-20">
      
      <div className="flex w-fit mx-7">
        <div>
          <img src={ICONS.avatar} alt="avatar" className="w-11 h-11 mr-4 bg-white rounded-full" />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px] leading-[17px] font-bold text-text-accent">
            {user ? user : "Guest"} {/* Display user name or fallback to 'Guest' */}
          </p>
          <p className="text-[12px] leading-[14px] font-bold text-text-muted">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
