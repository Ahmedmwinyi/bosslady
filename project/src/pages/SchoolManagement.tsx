import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { School } from "../types"; // Adjust import path as needed
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  Search,
  Filter,
  User,
  Check,
  X,
} from "lucide-react";

export default function SchoolManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  // Simulate fetching schools from API
  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        const mockSchools: School[] = [
          {
            id: 1,
            name: "School of Engineering",
            code: "ENG",
            description: "Engineering and technology programs",
            dean: {
              id: 101,
              fullName: "Dr. John Smith",
              email: "john.smith@university.edu",
            },
            isActive: true,
            createdAt: "2023-01-15T00:00:00",
            updatedAt: "2023-06-20T00:00:00",
          },
          {
            id: 2,
            name: "School of Medicine",
            code: "MED",
            description: "Medical and health science programs",
            dean: null,
            isActive: true,
            createdAt: "2023-02-10T00:00:00",
            updatedAt: "2023-05-15T00:00:00",
          },
        ];
        setSchools(mockSchools);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.code?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActive === null || school.isActive === filterActive;

    return matchesSearch && matchesFilter;
  });

  const handleDeleteSchool = (id: number) => {
    // Implement delete logic
    console.log("Delete school with id:", id);
    setSchools(schools.filter((school) => school.id !== id));
  };

  const toggleSchoolStatus = (id: number) => {
    setSchools(
      schools.map((school) =>
        school.id === id ? { ...school, isActive: !school.isActive } : school
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            School Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all schools in the university
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/schools/new")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New School
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
              placeholder="Search schools..."
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
            Showing {filteredSchools.length} of {schools.length} schools
          </div>
        </div>
      </div>

      {/* Schools List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading schools...</p>
          </div>
        ) : filteredSchools.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-lg font-medium text-gray-900 mt-4">
              No schools found
            </h3>
            <p className="text-gray-600 mt-2">
              {searchTerm || filterActive !== null
                ? "Try adjusting your search or filter criteria"
                : "No schools have been added yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-purple-500" />
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {school.name}
                      </h3>
                      {school.isActive ? (
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
                          {school.code || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Dean</p>
                        <p className="text-sm font-medium text-gray-900">
                          {school.dean?.fullName || "Not assigned"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(school.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {school.description && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-sm text-gray-900">
                          {school.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col items-end space-y-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleSchoolStatus(school.id)}
                        className={`p-2 rounded-md ${
                          school.isActive
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                        title={school.isActive ? "Deactivate" : "Activate"}
                      >
                        {school.isActive ? (
                          <X className="w-5 h-5" />
                        ) : (
                          <Check className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/schools/edit/${school.id}`)
                        }
                        className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSchool(school.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => navigate(`/admin/schools/${school.id}`)}
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
