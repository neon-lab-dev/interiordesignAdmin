import Table from "../../components/Shared/Table/Table";

const columns = [
  { header: "ID", accessor: "id", width: "250px", cellClassName:"font-normal text-[14px] leading-[17px] text-text-accent"},
  { header: "Name", accessor: "name", width: "150px",cellClassName:"font-normal text-[14px] leading-[17px] text-text-accent" },
  { header: "Email", accessor: "email", width: "250px",cellClassName:"font-normal text-[14px] leading-[17px] text-text-accent" },
  { header: "Mobile No", accessor: "mobile", width: "150px",cellClassName:"font-normal text-[14px] leading-[17px] text-text-accent" },
  {
    header: "DOB",
    accessor: "dob",
    width: "150px",
    cellRenderer: (row: any) => (
      <span>{new Date(row.dob).toISOString().split("T")[0]}</span>
    ),
    cellClassName:"font-normal text-[14px] leading-[17px] text-text-accent"
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    mobile: "1234567890",
    dob: new Date("1990-05-15"),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    mobile: "0987654321",
    dob: new Date("1985-10-25"),
  },
  // Add more data as needed
];

const Users = () => {
  return (
    <div>
      <h1 className="font-normal text-[32px] leading-10 mb-8 text-text-accent">
        Total Users
      </h1>
      <Table
        data={data}
        columns={columns}
        tableName="User Information"
        enablePagination={true}
        rowsPerPage={5}
        tableHeight="400px"
        showViewAll={false}
      />
    </div>
  );
};

export default Users;
