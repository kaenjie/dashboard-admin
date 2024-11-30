import React from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";

const Beranda = () => {
  // Data untuk grafik statistik (pendapatan bulanan)
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 8000, 6500, 9000, 12000, 15000, 14000, 13000, 11000, 15000, 16000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Data untuk grafik jumlah pengguna aktif harian
  const userActivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Users",
        data: [20, 30, 50, 70, 40, 60, 90],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 rounded-lg shadow mb-6">
        <h1 className="text-3xl font-bold">Grafistix Admin Dashboard</h1>
        <p className="text-sm mt-1">Welcome, Admin! Here’s what’s happening today.</p>
      </header>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">75</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Monthly Revenue</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">$12,500</p>
        </div>
      </section>

      {/* Revenue Chart Section */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h2>
        <Line data={revenueData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      </section>

      {/* Active User Activity Section */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly User Activity</h2>
        <Bar data={userActivityData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      </section>

      {/* Recent Orders Section */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4">#1234</td>
              <td className="py-3 px-4">John Doe</td>
              <td className="py-3 px-4 text-green-600">Completed</td>
              <td className="py-3 px-4">$200</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">#1235</td>
              <td className="py-3 px-4">Jane Smith</td>
              <td className="py-3 px-4 text-yellow-600">Pending</td>
              <td className="py-3 px-4">$350</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">#1236</td>
              <td className="py-3 px-4">Bob Johnson</td>
              <td className="py-3 px-4 text-red-600">Cancelled</td>
              <td className="py-3 px-4">$150</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Notifications Section */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            <p className="font-semibold text-gray-700">New Order Placed</p>
            <p className="text-sm text-gray-600">Order #1237 has been placed by Alex Brown.</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow">
            <p className="font-semibold text-gray-700">Pending Approval</p>
            <p className="text-sm text-gray-600">Order #1235 is awaiting your review.</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg shadow">
            <p className="font-semibold text-gray-700">Order Cancelled</p>
            <p className="text-sm text-gray-600">Order #1236 has been cancelled by the user.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-6 text-gray-500 text-sm text-center">
        <p>&copy; 2024 Grafistix Admin. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Beranda;
