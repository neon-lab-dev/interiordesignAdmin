import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { ICONS } from "../assets";
import Header from "../components/Shared/header";
import axios from "axios";

function DashboardLayout() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set active link based on the current path
    const path = location.pathname.split("/")[1]; // Get the main section of the path
    setActiveLink(path || "dashboard");
  }, [location]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const handleLogout = async () => {
    try {
      // Make the logout API request
      await axios.get("https://interior-design-backend-nine.vercel.app/api/v1/logout", {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      localStorage.removeItem("isLoggedIn");
      // Redirect to the login page after logout
      navigate("/login");
    } catch (error: any) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center bg-primary-10">
      {/* Sidebar */}
      <aside className="w-60 h-full py-4 px-6 text-white flex flex-col items-center bg-primary-20">
        {/* Centered Logo */}
        <div className="">
            <img src={ICONS.logo} className="w-[101px] h-auto" alt="Logo" />
          </div>
        <div className="w-60 px-4 ">
         

          {/* Navigation Links */}
          <nav className="w-full p-7 border-b-[0.6px] border-border-50">
            <ul>
              {[
                { name: "dashboard", path: "dashboard" },
                { name: "products", path: "products" },
                { name: "orders", path: "orders" },
                { name: "users", path: "users" },
                { name: "coupons", path: "coupons" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.name)}
                    className={`block px-4 py-2 text-text-accent items-center justify-center flex h-[50px] rounded-[6px] hover:bg-accent-10 hover:text-white ${
                      activeLink === link.name ? "bg-accent-10 text-white" : ""
                    }`}
                  >
                    <p className="text-center capitalize">{link.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="w-60 px-4">
          <nav className="w-full h-full p-7 border-b-[0.6px] border-border-50">
            <ul>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-text-accent items-center justify-center flex h-[50px] border-0 bg-transparent active:outline-none hover:outline-0 "
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header stays at the top */}
        <Header />
        <div className="flex-1 px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
