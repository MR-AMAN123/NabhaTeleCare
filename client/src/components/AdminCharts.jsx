import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";



function AdminCharts({ stats }) {
  const data = [
    {
      name: "Patients",
      value: stats.totalPatients,
    },
    {
      name: "Doctors",
      value: stats.totalDoctors,
    },
    {
      name: "Appointments",
      value: stats.totalAppointments,
    },
    {
      name: "Records",
      value: stats.totalRecords,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        marginTop: "30px",
      }}
    >
      <h2>Healthcare Analytics</h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


export default AdminCharts;