import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard/");

        setStats(res.data);
        setChartData(res.data.chart);   // ✅ REAL DATA
        setRecent(res.data.recent);     // ✅ REAL DATA

      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* 🔥 KPI */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card title="Total Visits" value={stats.total_visits} />
        <Card title="Active Visits" value={stats.active_visits} />
        <Card title="Today Visits" value={stats.today_visits} />
      </div>

      {/* 📊 REAL CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="mb-4 font-semibold">Last 7 Days</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visits" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 REAL TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">Recent Visits</h3>

        <table className="w-full">
          <thead>
            <tr className="text-gray-500 border-b">
              <th>ID</th>
              <th>Branch</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((v) => (
              <tr key={v.id} className="border-b">
                <td>{v.id}</td>
                <td>{v.branch}</td>
                <td className={v.status === "Active" ? "text-green-500" : "text-red-500"}>
                  {v.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold">{value || 0}</p>
    </div>
  );
}