type TStatusCardProps = {
  iconBg: string;
  title: string;
  value: string | number;
  icon: string | undefined;
};

const StatusCard: React.FC<TStatusCardProps> = ({
  iconBg,
  title,
  value,
  icon,
}) => {
  return (
    <div className={`p-4 rounded-2xl font-Inter flex  justify-between bg-primary-20 w-full h-[127px] shadow-statusCard`} >
      <div>
        <p className="text-text-muted text-base text-right leading-[18px] ">
          {title}
        </p>
        <h1 className="text-text-accent text-[28px] leadind-[34px] font-semibold leading-9 mt-2 ">
          {value}
        </h1>
      </div>
      <div className={`size-[60px] rounded-[23px] bg-opacity-10 flex justify-center items-center ${iconBg}`}>
        <img src={icon} alt="" className="size-6" />
      </div>
    </div>
  );
};

export default StatusCard;
