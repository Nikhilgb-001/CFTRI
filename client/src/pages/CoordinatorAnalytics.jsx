import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const CoordinatorAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/coordinator/extended-stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching coordinator stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <div>No data available.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Coordinator Analytics</h2>

      {/* Task Status Summary */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg">Task Status</h3>
        <ul className="list-disc ml-6">
          <li>Pending: {stats.taskStats.pending}</li>
          <li>In Progress: {stats.taskStats.inProgress}</li>
          <li>Completed: {stats.taskStats.completed}</li>
        </ul>
      </div>

      {/* Technology Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Technology Details</h3>
        <p>Total Technology Amount: ${stats.totalTechAmount}</p>
        <table className="min-w-full mt-2 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border text-left">Technology</th>
              <th className="px-4 py-2 border text-left">Projects Count</th>
              <th className="px-4 py-2 border text-left">Total Amount</th>
              <th className="px-4 py-2 border text-left">
                Projects Demonstrated
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats.technologyDetails).map(
              ([tech, detail], idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border">{tech}</td>
                  <td className="px-4 py-2 border">{detail.count}</td>
                  <td className="px-4 py-2 border">${detail.totalAmount}</td>
                  <td className="px-4 py-2 border">
                    {detail.projects.join(", ")}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Weekly User Logins */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Weekly User Logins</h3>
        <div className="flex space-x-4">
          {stats.weeklyLogins.labels.map((day, idx) => (
            <div key={idx} className="text-center">
              <p className="font-medium">{day}</p>
              <p>{stats.weeklyLogins.data[idx]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* You can add additional sections such as Payment Received details or ECF if needed */}
    </div>
  );
};

export default CoordinatorAnalytics;
