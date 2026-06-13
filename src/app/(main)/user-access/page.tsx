"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCw, ShieldCheck, UserCheck } from "lucide-react";
import toast from "react-hot-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Sales" | "Support" | "Viewer";
  status: "Active" | "Inactive";
};

const pages = ["Ledger", "Support", "User Access", "Reports", "Settings", "Purchase", "Expenses", "Quotation", "CRM"];

const dummyUsers: User[] = [
  { id: "1", name: "Aarav Sharma", email: "aarav@crm.com", role: "Admin", status: "Active" },
  { id: "2", name: "Priya Patel", email: "priya@crm.com", role: "Manager", status: "Active" },
  { id: "3", name: "Ramesh Kumar", email: "ramesh@crm.com", role: "Sales", status: "Active" },
  { id: "4", name: "Ananya Reddy", email: "ananya@crm.com", role: "Support", status: "Active" },
  { id: "5", name: "Vikram Singh", email: "vikram@crm.com", role: "Sales", status: "Active" },
  { id: "6", name: "Meera Nair", email: "meera@crm.com", role: "Viewer", status: "Active" },
  { id: "7", name: "Suresh Babu", email: "suresh@crm.com", role: "Manager", status: "Active" },
  { id: "8", name: "Divya Menon", email: "divya@crm.com", role: "Sales", status: "Active" },
  { id: "9", name: "Karthik Rao", email: "karthik@crm.com", role: "Support", status: "Active" },
  { id: "10", name: "Sneha Iyer", email: "sneha@crm.com", role: "Sales", status: "Active" },
  { id: "11", name: "Arjun Verma", email: "arjun@crm.com", role: "Viewer", status: "Inactive" },
  { id: "12", name: "Lakshmi Narayan", email: "lakshmi@crm.com", role: "Manager", status: "Active" },
  { id: "13", name: "Rahul Sharma", email: "rahul@crm.com", role: "Sales", status: "Active" },
  { id: "14", name: "Pooja Gupta", email: "pooja@crm.com", role: "Support", status: "Active" },
  { id: "15", name: "Manoj Patel", email: "manoj@crm.com", role: "Sales", status: "Active" },
  { id: "16", name: "Geetha Krishnan", email: "geetha@crm.com", role: "Viewer", status: "Active" },
  { id: "17", name: "Sanjay Malhotra", email: "sanjay@crm.com", role: "Manager", status: "Active" },
];

export default function UserAccessPage() {
  const [users] = useState<User[]>(dummyUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [grantedPermissions, setGrantedPermissions] = useState<Record<string, Set<string>>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const togglePermission = (userId: string, page: string) => {
    setGrantedPermissions((prev) => {
      const userPerms = new Set(prev[userId] || []);
      if (userPerms.has(page)) {
        userPerms.delete(page);
        toast.success(`Access to ${page} revoked`);
      } else {
        userPerms.add(page);
        toast.success(`Access granted to ${page}`);
      }
      return { ...prev, [userId]: userPerms };
    });
  };

  const isPageGranted = (userId: string, page: string) => {
    return grantedPermissions[userId]?.has(page) || false;
  };

  const handleRefresh = () => {
    toast.success("User access list refreshed");
  };

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Access Management</h1>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

          <Button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List - INCREASED HEIGHT */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-medium">Users ({filteredUsers.length})</h3>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm w-64"
            />
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">   {/* ← Increased Height */}
            <table className="w-full">
              <thead className="sticky top-0 bg-white border-b">
                <tr>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-center p-4">Role</th>
                  <th className="text-center p-4 w-40">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className={`border-b hover:bg-gray-50 cursor-pointer ${selectedUser?.id === user.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin" ? "bg-purple-100 text-purple-700" :
                        user.role === "Manager" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                        }}
                        className="bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
                      >
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permissions Panel */}
        <div className="border rounded-lg p-6 bg-white">
          {selectedUser ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#103BB5] text-white rounded-full flex items-center justify-center text-xl font-semibold">
                  {selectedUser.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-xl">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <span className="text-sm text-gray-500">{selectedUser.role} • {selectedUser.status}</span>
                </div>
              </div>

              <h4 className="font-medium mb-4 text-gray-700">Page Permissions</h4>
              
              <div className="space-y-3">
                {pages.map((page) => {
                  const granted = isPageGranted(selectedUser.id, page);
                  return (
                    <div 
                      key={page} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <UserCheck className={`h-5 w-5 ${granted ? "text-green-600" : "text-gray-400"}`} />
                        <span className="font-medium text-gray-800">{page}</span>
                      </div>
                      
                      <Button
                        variant={granted ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePermission(selectedUser.id, page)}
                        className={`min-w-[110px] ${
                          granted 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "border-[#103BB5] text-[#103BB5] hover:bg-[#103BB5] hover:text-white"
                        }`}
                      >
                        {granted ? "✓ Granted" : "Grant Access"}
                      </Button>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-gray-500 mt-6 text-center">
                Note: Changes are saved instantly. Admin role has access to everything by default.
              </p>
            </div>
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center text-center text-gray-500">
              <ShieldCheck className="h-16 w-16 mb-4 opacity-40" />
              <p className="text-lg font-medium">Select a user</p>
              <p className="text-sm">to manage their page permissions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}