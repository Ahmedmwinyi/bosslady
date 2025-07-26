import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
} from "lucide-react";
import { apiClient } from "../service/api";

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  departmentId?: number;
  department?: string;
  schoolId?: number;
  school?: string;
  isActive: boolean;
  lastLogin?: string;
}

export default function UserManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    role: "",
    departmentId: undefined as number | undefined,
    schoolId: undefined as number | undefined,
  });

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchUsers();
    }
  }, [user?.role]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getAllUsers();
      // Transform data to include department and school names if needed
      // Note: You might need additional API calls to get department/school names
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
      console.error("Error fetching users:", err);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.registerUser({
        fullName: newUser.fullName,
        email: newUser.email,
        password: "defaultPassword123",
        role: newUser.role,
        departmentId: newUser.departmentId,
        schoolId: newUser.schoolId,
      });
      setShowAddUser(false);
      setNewUser({
        fullName: "",
        email: "",
        role: "",
        departmentId: undefined,
        schoolId: undefined,
      });
      fetchUsers(); // Refresh the user list
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {

        const userToUpdate = users.find((u) => u.id === userId);
        if (userToUpdate) {
          await apiClient.updateUser(userId, {
            ...userToUpdate,
            isActive: false,
          });
          fetchUsers();
        }
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user");
      }
    }
  };

  const handleEditUser = (userId: number) => {
    console.log("Edit user:", userId);
  };

  if (user?.role !== "ADMIN") {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "hod":
        return "bg-green-100 text-green-800";
      case "dean":
        return "bg-purple-100 text-purple-800";
      case "dvc":
        return "bg-red-100 text-red-800";
      case "hr":
        return "bg-yellow-100 text-yellow-800";
      case "admin":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role.toLowerCase()) {
      case "academic":
        return "Academic Staff";
      case "hod":
        return "Head of Department";
      case "dean":
        return "Dean";
      case "dvc":
        return "Deputy Vice Chancellor";
      case "hr":
        return "HR Officer";
      case "admin":
        return "System Administrator";
      default:
        return role;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName ||
      user.email;
    const matchesRole =
      selectedRole === "all" ||
      user.role;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Loading Users...
            </h2>
            <p className="text-gray-600">
              Please wait while we fetch the user data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchUsers}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">
            Manage system users and their roles
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="academic">Academic Staff</option>
                <option value="hod">Head of Department</option>
                <option value="dean">Dean</option>
                <option value="dvc">Deputy Vice Chancellor</option>
                <option value="hr">HR Officer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              System Users ({filteredUsers.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department/School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.department && <div>{user.department}</div>}
                      {user.school && (
                        <div className="text-xs text-gray-500">
                          {user.school}
                        </div>
                      )}
                      {!user.department && !user.school && (
                        <span className="text-gray-400">Computer Science</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add New User
              </h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newUser.fullName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select role</option>
                    <option value="academic">Academic Staff</option>
                    <option value="hod">Head of Department</option>
                    <option value="dean">Dean</option>
                    <option value="dvc">Deputy Vice Chancellor</option>
                    <option value="hr">HR Officer</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newUser.departmentId || ""}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        departmentId: Number(e.target.value) || undefined,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter department ID (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    value={newUser.schoolId || ""}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        schoolId: Number(e.target.value) || undefined,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter school ID (optional)"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
