import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function DoctorWorkloadChart({
  workload,
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        marginTop: "40px",
      }}
    >
      <h2>
        Doctor Workload
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={workload}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="doctorName"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="totalAppointments"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DoctorWorkloadChart;