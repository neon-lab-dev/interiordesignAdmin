import { ICONS } from "../../assets";
import StatusCard from "../../components/Dashboard/StatusCard";

const Dashboard = () => {
  return (
    <div className="px-6">
      <h1 className="font-normal text-[32px] leading-10 mb-8 text-text-accent">
        Java Sports Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-[22px] w-full ">
        <StatusCard
          iconBg="bg-icons-blue"
          title="Total User"
          value="7265"
          icon={ICONS.users}
        />
        <StatusCard
          iconBg="bg-icons-yellow"
          title="Total Products"
          value="7265"
          icon={ICONS.product}
        />
        <StatusCard
          iconBg="bg-icons-green"
          title="Total Revenue"
          value="7265"
          icon={ICONS.revenue}
        />
        <StatusCard
          iconBg="bg-icons-red"
          title="Cancellation Amount"
          value="7265"
          icon={ICONS.loss}
        />
        <StatusCard
          iconBg="bg-icons-yellow"
          title="Total Orders"
          value="7265"
          icon={ICONS.orders}
        />
        <StatusCard
          iconBg="bg-icons-lightGreen"
          title="Orders deliverd"
          value="7265"
          icon={ICONS.deliverd}
        />
        <StatusCard
          iconBg="bg-icons-orange"
          title="Orders Pending"
          value="7265"
          icon={ICONS.pending}
        />
        <StatusCard
          iconBg="bg-icons-gray"
          title="Orders cancelled"
          value="7265"
          icon={ICONS.cancelled}
        />{" "}
        <StatusCard
          iconBg="bg-icons-blue"
          title="Order Shipped"
          value="7265"
          icon={ICONS.shipped}
        />
      </div>
    </div>
  );
};

export default Dashboard;
