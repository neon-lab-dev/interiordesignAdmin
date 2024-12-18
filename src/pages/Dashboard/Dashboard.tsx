import { useEffect, useState } from "react";
import { ICONS } from "../../assets";
import StatusCard from "../../components/Dashboard/StatusCard";

const Dashboard = () => {
  // State to store fetched data
  const [dashboardData, setDashboardData] = useState<any>(null);

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get the token from localStorage or cookies
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        // Make the authenticated API request
        const response = await fetch("https://interior-design-backend-nine.vercel.app/api/v1/admin/dashboard", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies are included with the request
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data); // Set the fetched data to state
        } else {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // If data is still loading, show a loading state
  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6">
      <h1 className="font-normal text-[32px] leading-10 mb-8 text-text-accent">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-[22px] w-full ">
        <StatusCard
          iconBg="bg-icons-blue"
          title="Total User"
          value={dashboardData.userCount}
          icon={ICONS.users}
        />
        <StatusCard
          iconBg="bg-icons-yellow"
          title="Total Products"
          value={dashboardData.productsCount}
          icon={ICONS.product}
        />
        <StatusCard
          iconBg="bg-icons-green"
          title="Total Revenue"
          value={dashboardData.totalOrdersAmount}
          icon={ICONS.revenue}
        />
        <StatusCard
          iconBg="bg-icons-red"
          title="Cancellation Amount"
          value={dashboardData.totalOrdersAmountCancelled}
          icon={ICONS.loss}
        />
        <StatusCard
          iconBg="bg-icons-yellow"
          title="Total Orders"
          value={dashboardData.TotalOrders}
          icon={ICONS.orders}
        />
        <StatusCard
          iconBg="bg-icons-lightGreen"
          title="Orders Delivered"
          value={dashboardData.orderDelivered}
          icon={ICONS.deliverd}
        />
        <StatusCard
          iconBg="bg-icons-orange"
          title="Orders Pending"
          value={dashboardData.ordersPlaced}
          icon={ICONS.pending}
        />
        <StatusCard
          iconBg="bg-icons-gray"
          title="Orders Cancelled"
          value={dashboardData.orderCancelled}
          icon={ICONS.cancelled}
        />
        <StatusCard
          iconBg="bg-icons-blue"
          title="Order Shipped"
          value={dashboardData.orderShipped}
          icon={ICONS.shipped}
        />
      </div>
    </div>
  );
};

export default Dashboard;
