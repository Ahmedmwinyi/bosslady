import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  User,
} from "lucide-react";

export default function AllApplications() {
  const { user } = useAuth();
  const { promotionRequests, loadingRequests, fetchPromotionRequests } =
    useApplications();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [schoolFilter, setSchoolFilter] = useState<string>("ALL");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  useEffect(() => {
    fetchPromotionRequests();
  }, [fetchPromotionRequests]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "submitted":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "hod_reviewed":
        return <Clock className="w-4 h-4 text-green-500" />;
      case "dean_reviewed":
        return <Clock className="w-4 h-4 text-purple-500" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "Draft";
      case "submitted":
        return "Pending HOD Review";
      case "hod_reviewed":
        return "Pending Dean Review";
      case "dean_reviewed":
        return "Pending DVC Decision";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "bg-yellow-50 text-yellow-700";
      case "submitted":
        return "bg-blue-50 text-blue-700";
      case "hod_reviewed":
        return "bg-green-50 text-green-700";
      case "dean_reviewed":
        return "bg-purple-50 text-purple-700";
      case "approved":
        return "bg-green-50 text-green-700";
      case "rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="w-4 h-4 ml-1 inline" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1 inline" />
    );
  };

  const sortedAndFilteredApplications = () => {
    let filtered = [...promotionRequests];

    // Apply filters
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.currentRank.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.appliedRank.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (app) => app.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (schoolFilter !== "ALL") {
      filtered = filtered.filter((app) => app.schoolName === schoolFilter);
    }

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const uniqueSchools = Array.from(
    new Set(promotionRequests.map((app) => app.schoolName))
  );
  const uniqueStatuses = Array.from(
    new Set(promotionRequests.map((app) => app.status))
  );

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Applications</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive view of all promotion applications
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {getStatusText(status)}
              </option>
            ))}
          </select>

          {/* School Filter */}
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
          >
            <option value="ALL">All Schools</option>
            {uniqueSchools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-end text-sm text-gray-600">
            <span className="font-medium">
              {sortedAndFilteredApplications().length} results
            </span>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("applicantName")}
                >
                  <div className="flex items-center">
                    Applicant
                    {getSortIcon("applicantName")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("currentRank")}
                >
                  <div className="flex items-center">
                    Current → Applied Rank
                    {getSortIcon("currentRank")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("schoolName")}
                >
                  <div className="flex items-center">
                    School/Department
                    {getSortIcon("schoolName")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {getSortIcon("status")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("submissionDate")}
                >
                  <div className="flex items-center">
                    Submitted
                    {getSortIcon("submissionDate")}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAndFilteredApplications().length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No applications found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filters
                    </p>
                  </td>
                </tr>
              ) : (
                sortedAndFilteredApplications().map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {app.applicantName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {app.currentRank} → {app.appliedRank}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {app.schoolName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.departmentName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(app.status)}
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {getStatusText(app.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => navigate(`/applications/${app.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
