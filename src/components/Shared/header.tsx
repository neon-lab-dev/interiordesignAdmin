import { useEffect, useState } from "react";
import { ICONS } from "../../assets";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(""); // Initially empty

  useEffect(() => {
    const fetchUser = async () => {
      try {
    
        const response = await axios.get("https://interior-design-backend-nine.vercel.app/api/v1/me", {
          withCredentials:true
        });
        setUser(response.data.user.full_name)
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
