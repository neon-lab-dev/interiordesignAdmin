// DashboardLayout.tsx
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ICONS } from "../assets";
import Header from "../components/Shared/header";

function DashboardLayout() {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="flex h-screen w-screen bg-primary-10">
      {/* Sidebar */}
      <aside className="w-60 h-full py-4 px-6 text-white flex flex-col items-center bg-primary-20">
        {/* Centered Logo */}
        <div className="mb-3">
          <img src={ICONS.logo} className="w-[101px] h-auto" alt="Logo" />
        </div>

        {/* Navigation Links */}
        <nav className="w-full">
          <ul>
            {["home", "about", "services", "contact", "profile"].map(
              (link, index) => (
                <li key={index}>
                  <Link
                    to={link}
                    onClick={() => handleLinkClick(link)}
                    className={`block px-4 py-2 text-text-accent items-center flex h-[50px] rounded-[6px] hover:bg-accent-10 hover:text-white ${
                      activeLink === link ? "bg-accent-10 text-white" : ""
                    }`}
                  >
                    <p className="pl-[54px] capitalize">{link}</p>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header stays at the top */}
        <Header />

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
