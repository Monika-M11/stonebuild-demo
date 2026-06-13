"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

type Leads = {
  id: string;
  customer_name: string;
  company_name: string;
  contact_person: string;
  mobile_number: string;
  alternate_mobile_number?: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gst_number?: string;
  lead_date: string;
  lead_source: string;
  lead_status: string;
  created_at?: string;
};

const dummyLeads: Leads[] = [
  { id: "1", customer_name: "Ramesh Kumar", company_name: "RK Solar", contact_person: "Ramesh", mobile_number: "9876543210", email: "ramesh@email.com", address: "123 MG Road", city: "Bangalore", state: "Karnataka", pincode: "560001", lead_date: "2025-06-01", lead_source: "Website", lead_status: "New" },
  { id: "2", customer_name: "Priya Sharma", company_name: "PS Enterprises", contact_person: "Priya", mobile_number: "9123456789", email: "priya@email.com", address: "45 Church Street", city: "Chennai", state: "Tamil Nadu", pincode: "600002", lead_date: "2025-06-02", lead_source: "Referral", lead_status: "Contacted" },
  { id: "3", customer_name: "Suresh Babu", company_name: "SB Power", contact_person: "Suresh", mobile_number: "9988776655", email: "suresh@email.com", address: "78 MG Road", city: "Hyderabad", state: "Telangana", pincode: "500003", lead_date: "2025-06-03", lead_source: "Call", lead_status: "Follow Up" },
  { id: "4", customer_name: "Lakshmi Narayanan", company_name: "LN Tech", contact_person: "Lakshmi", mobile_number: "9871234567", email: "lakshmi@email.com", address: "12 Anna Salai", city: "Chennai", state: "Tamil Nadu", pincode: "600004", lead_date: "2025-06-04", lead_source: "Social Media", lead_status: "Interested" },
  { id: "5", customer_name: "Vijay Kumar", company_name: "VK Energy", contact_person: "Vijay", mobile_number: "9345678901", email: "vijay@email.com", address: "56 Residency Road", city: "Bangalore", state: "Karnataka", pincode: "560005", lead_date: "2025-06-05", lead_source: "Website", lead_status: "Converted" },
  // ... (I added 25+ entries total below in full code, but showing sample here)
    { id: "6", customer_name: "Arun Prakash", company_name: "AP Constructions", contact_person: "Arun", mobile_number: "9876543211", email: "arun@email.com", address: "22 Brigade Road", city: "Bangalore", state: "Karnataka", pincode: "560006", lead_date: "2025-06-06", lead_source: "Website", lead_status: "New" },
  { id: "7", customer_name: "Meena Devi", company_name: "MD Interiors", contact_person: "Meena", mobile_number: "9876543212", email: "meena@email.com", address: "10 T Nagar", city: "Chennai", state: "Tamil Nadu", pincode: "600017", lead_date: "2025-06-07", lead_source: "Referral", lead_status: "Contacted" },
  { id: "8", customer_name: "Karthik Raj", company_name: "KR Builders", contact_person: "Karthik", mobile_number: "9876543213", email: "karthik@email.com", address: "44 Banjara Hills", city: "Hyderabad", state: "Telangana", pincode: "500034", lead_date: "2025-06-08", lead_source: "Social Media", lead_status: "Interested" },
  { id: "9", customer_name: "Deepa Nair", company_name: "DN Solutions", contact_person: "Deepa", mobile_number: "9876543214", email: "deepa@email.com", address: "8 Marine Drive", city: "Kochi", state: "Kerala", pincode: "682031", lead_date: "2025-06-09", lead_source: "Call", lead_status: "Follow Up" },
  { id: "10", customer_name: "Rahul Verma", company_name: "RV Energy", contact_person: "Rahul", mobile_number: "9876543215", email: "rahul@email.com", address: "14 Civil Lines", city: "Delhi", state: "Delhi", pincode: "110054", lead_date: "2025-06-10", lead_source: "Website", lead_status: "Converted" },
  { id: "11", customer_name: "Sneha Iyer", company_name: "SI Associates", contact_person: "Sneha", mobile_number: "9876543216", email: "sneha@email.com", address: "32 Velachery", city: "Chennai", state: "Tamil Nadu", pincode: "600042", lead_date: "2025-06-11", lead_source: "Referral", lead_status: "New" },
  { id: "12", customer_name: "Manoj Kumar", company_name: "MK Infra", contact_person: "Manoj", mobile_number: "9876543217", email: "manoj@email.com", address: "66 Whitefield", city: "Bangalore", state: "Karnataka", pincode: "560066", lead_date: "2025-06-12", lead_source: "Website", lead_status: "Interested" },
  { id: "13", customer_name: "Divya Lakshmi", company_name: "DL Ventures", contact_person: "Divya", mobile_number: "9876543218", email: "divya@email.com", address: "21 KK Nagar", city: "Madurai", state: "Tamil Nadu", pincode: "625020", lead_date: "2025-06-13", lead_source: "Social Media", lead_status: "Contacted" },
  { id: "14", customer_name: "Naveen Reddy", company_name: "NR Developers", contact_person: "Naveen", mobile_number: "9876543219", email: "naveen@email.com", address: "19 Gachibowli", city: "Hyderabad", state: "Telangana", pincode: "500032", lead_date: "2025-06-14", lead_source: "Call", lead_status: "Follow Up" },
  { id: "15", customer_name: "Kavitha Rao", company_name: "KR Projects", contact_person: "Kavitha", mobile_number: "9876543220", email: "kavitha@email.com", address: "15 Indiranagar", city: "Bangalore", state: "Karnataka", pincode: "560038", lead_date: "2025-06-15", lead_source: "Referral", lead_status: "Converted" },
  { id: "16", customer_name: "Harish Kumar", company_name: "HK Industries", contact_person: "Harish", mobile_number: "9876543221", email: "harish@email.com", address: "51 RS Puram", city: "Coimbatore", state: "Tamil Nadu", pincode: "641002", lead_date: "2025-06-16", lead_source: "Website", lead_status: "New" },
  { id: "17", customer_name: "Pooja Sharma", company_name: "PS Tech", contact_person: "Pooja", mobile_number: "9876543222", email: "pooja@email.com", address: "77 Sector 18", city: "Noida", state: "Uttar Pradesh", pincode: "201301", lead_date: "2025-06-17", lead_source: "Social Media", lead_status: "Interested" },
  { id: "18", customer_name: "Ajith Menon", company_name: "AM Power", contact_person: "Ajith", mobile_number: "9876543223", email: "ajith@email.com", address: "29 MG Road", city: "Kochi", state: "Kerala", pincode: "682016", lead_date: "2025-06-18", lead_source: "Referral", lead_status: "Contacted" },
  { id: "19", customer_name: "Bhavani Devi", company_name: "BD Exports", contact_person: "Bhavani", mobile_number: "9876543224", email: "bhavani@email.com", address: "90 Gandhi Puram", city: "Coimbatore", state: "Tamil Nadu", pincode: "641012", lead_date: "2025-06-19", lead_source: "Call", lead_status: "Follow Up" },
  { id: "20", customer_name: "Ganesh Babu", company_name: "GB Solar", contact_person: "Ganesh", mobile_number: "9876543225", email: "ganesh@email.com", address: "55 Kukatpally", city: "Hyderabad", state: "Telangana", pincode: "500072", lead_date: "2025-06-20", lead_source: "Website", lead_status: "Converted" },
  { id: "21", customer_name: "Revathi Krishnan", company_name: "RK Traders", contact_person: "Revathi", mobile_number: "9876543226", email: "revathi@email.com", address: "18 Mylapore", city: "Chennai", state: "Tamil Nadu", pincode: "600004", lead_date: "2025-06-21", lead_source: "Referral", lead_status: "New" },
  { id: "22", customer_name: "Sanjay Patel", company_name: "SP Associates", contact_person: "Sanjay", mobile_number: "9876543227", email: "sanjay@email.com", address: "102 Ashram Road", city: "Ahmedabad", state: "Gujarat", pincode: "380009", lead_date: "2025-06-22", lead_source: "Website", lead_status: "Interested" },
  { id: "23", customer_name: "Nithya S", company_name: "NS Builders", contact_person: "Nithya", mobile_number: "9876543228", email: "nithya@email.com", address: "67 Peelamedu", city: "Coimbatore", state: "Tamil Nadu", pincode: "641004", lead_date: "2025-06-23", lead_source: "Social Media", lead_status: "Contacted" },
  { id: "24", customer_name: "Praveen Kumar", company_name: "PK Constructions", contact_person: "Praveen", mobile_number: "9876543229", email: "praveen@email.com", address: "12 Hebbal", city: "Bangalore", state: "Karnataka", pincode: "560024", lead_date: "2025-06-24", lead_source: "Call", lead_status: "Follow Up" },
  { id: "25", customer_name: "Anjali Reddy", company_name: "AR Solutions", contact_person: "Anjali", mobile_number: "9871234570", email: "anjali@email.com", address: "89 Jubilee Hills", city: "Hyderabad", state: "Telangana", pincode: "500033", lead_date: "2025-06-25", lead_source: "Referral", lead_status: "Not Interested" },
  { id: "26", customer_name: "Vignesh Kumar", company_name: "VK Projects", contact_person: "Vignesh", mobile_number: "9876543230", email: "vignesh@email.com", address: "31 Anna Nagar", city: "Chennai", state: "Tamil Nadu", pincode: "600040", lead_date: "2025-06-26", lead_source: "Website", lead_status: "New" },
  { id: "27", customer_name: "Aishwarya Rao", company_name: "AR Energy", contact_person: "Aishwarya", mobile_number: "9876543231", email: "aishwarya@email.com", address: "48 HSR Layout", city: "Bangalore", state: "Karnataka", pincode: "560102", lead_date: "2025-06-27", lead_source: "Social Media", lead_status: "Interested" },
  { id: "28", customer_name: "Murugan P", company_name: "MP Enterprises", contact_person: "Murugan", mobile_number: "9876543232", email: "murugan@email.com", address: "73 Trichy Road", city: "Coimbatore", state: "Tamil Nadu", pincode: "641018", lead_date: "2025-06-28", lead_source: "Call", lead_status: "Contacted" },
  { id: "29", customer_name: "Rohit Singh", company_name: "RS Developers", contact_person: "Rohit", mobile_number: "9876543233", email: "rohit@email.com", address: "11 Gomti Nagar", city: "Lucknow", state: "Uttar Pradesh", pincode: "226010", lead_date: "2025-06-29", lead_source: "Referral", lead_status: "Converted" },
  { id: "30", customer_name: "Keerthana V", company_name: "KV Tech", contact_person: "Keerthana", mobile_number: "9876543234", email: "keerthana@email.com", address: "25 OMR Road", city: "Chennai", state: "Tamil Nadu", pincode: "600119", lead_date: "2025-06-30", lead_source: "Website", lead_status: "Follow Up" },
  
];

export default function LeadList() {
  const [leadList] = useState<Leads[]>(dummyLeads);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredLeads = useMemo(() => {
    return leadList.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile_number?.includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !selectedStatus || item.lead_status === selectedStatus;
      const matchesSource = !selectedSource || item.lead_source === selectedSource;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const itemDate = new Date(item.lead_date);
        if (dateFrom) matchesDate = matchesDate && itemDate >= new Date(dateFrom);
        if (dateTo) {
          const toDate = new Date(dateTo);
          toDate.setHours(23, 59, 59);
          matchesDate = matchesDate && itemDate <= toDate;
        }
      }
      return matchesSearch && matchesStatus && matchesSource && matchesDate;
    });
  }, [leadList, searchTerm, selectedStatus, selectedSource, dateFrom, dateTo]);

  const handleRefresh = () => {
    toast.success("Leads list refreshed successfully");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("");
    setSelectedSource("");
    setDateFrom("");
    setDateTo("");
    setShowFilters(false);
    toast.success("Filters cleared");
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
    toast.success("Filters applied");
  };

  return (
    <div className="bg-white p-6">
      {/* Header Buttons - Right aligned */}
      <div className="flex justify-end items-center gap-3 mb-6">
        <Button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>

        <Button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white px-3"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
        <table className="table-default w-full">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <th className="text-center">S.no</th>
              <th>Customer Name</th>
              <th>Company Name</th>
              <th>Contact Person</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Lead Status</th>
              <th>Lead Source</th>
              <th className="text-center">Lead Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center py-8 text-gray-500">
                  No leads found
                </td>
              </tr>
            )}

            {filteredLeads.map((item, idx) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="text-center">{idx + 1}</td>
                <td className="font-medium">{item.customer_name}</td>
                <td>{item.company_name || "-"}</td>
                <td>{item.contact_person}</td>
                <td>{item.mobile_number}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.lead_status === "Converted"
                        ? "bg-green-100 text-green-700"
                        : item.lead_status === "Not Interested"
                        ? "bg-red-100 text-red-700"
                        : item.lead_status === "Interested"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.lead_status}
                  </span>
                </td>
                <td>{item.lead_source}</td>
                <td className="text-center">
                  {new Date(item.lead_date).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Drawer */}
      {showFilters && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowFilters(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Customer, Contact, Mobile or Email..."
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Lead Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Lead Source</label>
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All Sources</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Call">Call</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Lead Date Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleClearFilters}>
                  Clear
                </Button>
                <Button className="flex-1 bg-[#103BB5]" onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}