 "use client";

const KPICard = ({
  title,
  value,
  subtitle,
  color = "blue",
}: {
  title: string;
  value: string;
  subtitle?: string;
  color?: "blue" | "green" | "red" | "purple";
}) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]} hover:shadow-md`}>
      <h3 className="text-sm font-medium opacity-80">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {subtitle && <p className="text-sm mt-1 opacity-75">{subtitle}</p>}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Outstanding"
          value="₹2,50,000"
          subtitle="Across all customers"
          color="purple"
        />
        <KPICard
          title="Total Principal"
          value="₹1,80,000"
          subtitle="Principal amount"
          color="blue"
        />
        <KPICard
          title="Total Interest"
          value="₹70,000"
          subtitle="Accrued interest"
          color="green"
        />
        <KPICard
          title="Active Customers"
          value="24"
          subtitle="36 total loans"
          color="red"
        />
      </div>

      {/* Simple Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Loans</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Customer</th>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">John</td>
              <td>Personal</td>
              <td>₹50,000</td>
              <td className="text-green-600">Active</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Ravi</td>
              <td>Jewel</td>
              <td>₹75,000</td>
              <td className="text-red-600">Overdue</td>
            </tr>
            <tr>
              <td className="py-2">Arun</td>
              <td>Personal</td>
              <td>₹30,000</td>
              <td className="text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}