import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  Search,
  Filter,
  User,
  Check,
  X,
  Shield,
} from "lucide-react";

export default function DepartmentManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  // Simulate fetching departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        const mockDepartments = [
          {
            id: 1,
            name: "Computer Science",
            code: "CS",
            description: "Computer science and software engineering programs",
            school: {
              id: 1,
              name: "School of Engineering",
              code: "ENG",
            },
            headOfDepartment: {
              id: 102,
              fullName: "Dr. Sarah Johnson",
              email: "sarah.johnson@university.edu",
            },
            isActive: true,
            createdAt: "2023-03-15T00:00:00",
            updatedAt: "2023-06-25T00:00:00",
          },
          {
            id: 2,
            name: "Electrical Engineering",
            code: "EE",
            description: "Electrical and electronics engineering programs",
            school: {
              id: 1,
              name: "School of Engineering",
              code: "ENG",
            },
            headOfDepartment: null,
            isActive: true,
            createdAt: "2023-03-20T00:00:00",
            updatedAt: "2023-05-30T00:00:00",
          },
        ];
        setDepartments(mockDepartments);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActive === null || dept.isActive === filterActive;

    return matchesSearch && matchesFilter;
  });

  const handleDeleteDepartment = (id: number) => {
    // Implement delete logic
    console.log("Delete department with id:", id);
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  const toggleDepartmentStatus = (id: number) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id ? { ...dept, isActive: !dept.isActive } : dept
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Department Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all departments in the university
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/departments/new")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Department
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search departments..."
              className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={
                filterActive === null
                  ? "all"
                  : filterActive
                  ? "active"
                  : "inactive"
              }
              onChange={(e) => {
                const value = e.target.value;
                setFilterActive(value === "all" ? null : value === "active");
              }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 flex items-center justify-end">
            Showing {filteredDepartments.length} of {departments.length}{" "}
            departments
          </div>
        </div>
      </div>

      {/* Departments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading departments...</p>
          </div>
        ) : filteredDepartments.length === 0 ? (
          <div className="p-12 text-center">
            <Settings className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-lg font-medium text-gray-900 mt-4">
              No departments found
            </h3>
            <p className="text-gray-600 mt-2">
              {searchTerm || filterActive !== null
                ? "Try adjusting your search or filter criteria"
                : "No departments have been added yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {dept.name}
                      </h3>
                      {dept.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </div>

                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Code</p>
                        <p className="text-sm font-medium text-gray-900">
                          {dept.code || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">HOD</p>
                        <p className="text-sm font-medium text-gray-900">
                          {dept.headOfDepartment?.fullName || "Not assigned"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">School</p>
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 text-purple-500 mr-1" />
                          <p className="text-sm font-medium text-gray-900">
                            {dept.school.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {dept.description && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-sm text-gray-900">
                          {dept.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col items-end space-y-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleDepartmentStatus(dept.id)}
                        className={`p-2 rounded-md ${
                          dept.isActive
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                        title={dept.isActive ? "Deactivate" : "Activate"}
                      >
                        {dept.isActive ? (
                          <X className="w-5 h-5" />
                        ) : (
                          <Check className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/departments/edit/${dept.id}`)
                        }
                        className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDepartment(dept.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => navigate(`/admin/departments/${dept.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      View details <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
