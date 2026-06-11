//  "use client";

// const KPICard = ({
//   title,
//   value,
//   subtitle,
//   color = "blue",
// }: {
//   title: string;
//   value: string;
//   subtitle?: string;
//   color?: "blue" | "green" | "red" | "purple";
// }) => {
//   const colorClasses = {
//     blue: "bg-blue-50 border-blue-200 text-blue-700",
//     green: "bg-green-50 border-green-200 text-green-700",
//     red: "bg-red-50 border-red-200 text-red-700",
//     purple: "bg-purple-50 border-purple-200 text-purple-700",
//   };

//   return (
//     <div className={`p-6 rounded-lg border-2 ${colorClasses[color]} hover:shadow-md`}>
//       <h3 className="text-sm font-medium opacity-80">{title}</h3>
//       <p className="text-2xl font-bold mt-2">{value}</p>
//       {subtitle && <p className="text-sm mt-1 opacity-75">{subtitle}</p>}
//     </div>
//   );
// };

// export default function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <KPICard
//           title="Total Outstanding"
//           value="₹2,50,000"
//           subtitle="Across all customers"
//           color="purple"
//         />
//         <KPICard
//           title="Total Principal"
//           value="₹1,80,000"
//           subtitle="Principal amount"
//           color="blue"
//         />
//         <KPICard
//           title="Total Interest"
//           value="₹70,000"
//           subtitle="Accrued interest"
//           color="green"
//         />
//         <KPICard
//           title="Active Customers"
//           value="24"
//           subtitle="36 total loans"
//           color="red"
//         />
//       </div>

//       {/* Simple Table */}
//       <div className="bg-white rounded-lg shadow p-4">
//         <h2 className="text-lg font-semibold mb-4">Recent Loans</h2>

//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left border-b">
//               <th className="py-2">Customer</th>
//               <th>Loan Type</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr className="border-b">
//               <td className="py-2">John</td>
//               <td>Personal</td>
//               <td>₹50,000</td>
//               <td className="text-green-600">Active</td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2">Ravi</td>
//               <td>Jewel</td>
//               <td>₹75,000</td>
//               <td className="text-red-600">Overdue</td>
//             </tr>
//             <tr>
//               <td className="py-2">Arun</td>
//               <td>Personal</td>
//               <td>₹30,000</td>
//               <td className="text-yellow-600">Pending</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }



"use client";

import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

const monthlyExpense = [
  { month: "Jan", materials: 180000, labour: 120000, equipment: 45000 },
  { month: "Feb", materials: 210000, labour: 135000, equipment: 52000 },
  { month: "Mar", materials: 175000, labour: 118000, equipment: 38000 },
  { month: "Apr", materials: 260000, labour: 160000, equipment: 61000 },
  { month: "May", materials: 230000, labour: 145000, equipment: 55000 },
  { month: "Jun", materials: 310000, labour: 175000, equipment: 72000 },
];

const projectProgress = [
  { month: "Jan", completed: 2, ongoing: 5, new: 3 },
  { month: "Feb", completed: 3, ongoing: 6, new: 2 },
  { month: "Mar", completed: 1, ongoing: 7, new: 4 },
  { month: "Apr", completed: 4, ongoing: 5, new: 3 },
  { month: "May", completed: 3, ongoing: 8, new: 5 },
  { month: "Jun", completed: 5, ongoing: 6, new: 2 },
];

const recentProjects = [
  { name: "Sunrise Residency",  location: "Chennai",     manager: "Karthik R.", budget: "₹42L",   spent: "₹28L",  status: "On Track"   },
  { name: "Tech Park Phase 2",  location: "Bangalore",   manager: "Priya S.",   budget: "₹1.2Cr", spent: "₹89L",  status: "Delayed"    },
  { name: "Metro Bridge A3",    location: "Hyderabad",   manager: "Suresh B.",  budget: "₹78L",   spent: "₹31L",  status: "On Track"   },
  { name: "Lakeview Villas",    location: "Kochi",       manager: "Divya N.",   budget: "₹55L",   spent: "₹55L",  status: "Completed"  },
  { name: "Warehouse Unit 7",   location: "Coimbatore",  manager: "Manoj P.",   budget: "₹18L",   spent: "₹22L",  status: "Over Budget"},
];

const recentPurchases = [
  { item: "TMT Steel Bars",  supplier: "Ramesh Traders",  qty: "5 Ton",    amount: "₹2,15,000", date: "10/06/2026" },
  { item: "Cement OPC 53",   supplier: "UltraTech Depot", qty: "200 Bags", amount: "₹88,000",   date: "09/06/2026" },
  { item: "JCB Rental",      supplier: "Vijay Equipments",qty: "3 Days",   amount: "₹45,000",   date: "08/06/2026" },
  { item: "Sand (M-Sand)",   supplier: "Lakshmi Quarry",  qty: "10 Loads", amount: "₹32,000",   date: "07/06/2026" },
];

const formatLakh = (v: number) =>
  v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${(v / 1000).toFixed(0)}K`;

const statusStyle: Record<string, string> = {
  "On Track":    "bg-green-50 text-green-700 border border-green-200",
  "Delayed":     "bg-yellow-50 text-yellow-700 border border-yellow-200",
  "Completed":   "bg-blue-50 text-[#103BB5] border border-blue-200",
  "Over Budget": "bg-red-50 text-red-700 border border-red-200",
};

const KPICard = ({ title, value, sub, icon, accent }: {
  title: string; value: string; sub: string; icon: string; accent: string;
}) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${accent}`}>
      {icon}
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</span>
      <span className="text-2xl font-bold text-[#103BB5]">{value}</span>
      <span className="text-xs text-gray-400">{sub}</span>
    </div>
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
    <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">{title}</h2>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-xs">
      <p className="font-semibold text-gray-600 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="py-0.5">
          {p.name}: {typeof p.value === "number" && p.value > 100 ? formatLakh(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon="🏗️" title="Active Projects"      value="6"    sub="14 total this year"   accent="bg-blue-50"   />
        <KPICard icon="👷" title="Workforce"             value="138"  sub="Across all sites"     accent="bg-orange-50" />
        <KPICard icon="📦" title="Materials This Month"  value="₹31L" sub="Jun 2026"             accent="bg-green-50"  />
        <KPICard icon="⚙️" title="Equipment in Use"      value="22"   sub="4 under service"      accent="bg-purple-50" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Monthly Site Expenditure">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyExpense} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatLakh} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={48} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} iconType="circle" iconSize={8} />
              <Bar dataKey="materials" name="Materials" fill="#103BB5" radius={[4,4,0,0]} />
              <Bar dataKey="labour"    name="Labour"    fill="#636CCB" radius={[4,4,0,0]} />
              <Bar dataKey="equipment" name="Equipment" fill="#ACBAC4" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Project Activity Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={projectProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} iconType="circle" iconSize={8} />
              <Line type="monotone" dataKey="ongoing"   name="Ongoing"   stroke="#103BB5" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="completed" name="Completed" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="new"       name="New"       stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 3" dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <SectionCard title="Active Projects">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Project", "Location", "Manager", "Budget", "Spent", "Status"].map((h) => (
                      <th key={h} className="text-left py-2 pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider pr-4 last:pr-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentProjects.map((p) => (
                    <tr key={p.name} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-medium text-[#103BB5] whitespace-nowrap">{p.name}</td>
                      <td className="py-3 pr-4 text-gray-500">{p.location}</td>
                      <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{p.manager}</td>
                      <td className="py-3 pr-4 font-medium text-gray-700">{p.budget}</td>
                      <td className="py-3 pr-4 text-gray-700">{p.spent}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusStyle[p.status]}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Recent Purchases">
          <div className="space-y-3">
            {recentPurchases.map((p) => (
              <div key={p.item} className="flex flex-col gap-0.5 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{p.item}</span>
                  <span className="text-sm font-semibold text-[#103BB5]">{p.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{p.supplier} · {p.qty}</span>
                  <span className="text-xs text-gray-400">{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
