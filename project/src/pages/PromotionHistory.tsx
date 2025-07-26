import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Briefcase,
  School,
  Calendar,
} from "lucide-react";

export default function PromotionHistory() {
  const { user } = useAuth();
  const { promotionRequests, fetchPromotionRequests } = useApplications();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    school: "",
    year: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "submissionDate",
    direction: "desc",
  });
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    fetchPromotionRequests();
  }, [fetchPromotionRequests]);

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...promotionRequests].sort((a, b) => {
    // @ts-ignore
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    // @ts-ignore
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.currentRank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.appliedRank.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (filters.status === "" || app.status === filters.status) &&
      (filters.school === "" || app.schoolName === filters.school) &&
      (filters.year === "" ||
        new Date(app.submissionDate).getFullYear().toString() === filters.year);

    return matchesSearch && matchesFilters;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "submitted":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "hod_reviewed":
        return <Clock className="w-4 h-4 text-green-500" />;
      case "dean_reviewed":
        return <Clock className="w-4 h-4 text-purple-500" />;
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "dvc_rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Draft";
      case "submitted":
        return "Pending HOD Review";
      case "hod_reviewed":
        return "Pending Dean Review";
      case "dean_reviewed":
        return "Pending DVC Decision";
      case "dvc_approved":
        return "Approved";
      case "dvc_rejected":
        return "Rejected";
      case "hr_processed":
        return "Processed by HR";
      default:
        return "Unknown Status";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "hod_reviewed":
        return "bg-green-100 text-green-800";
      case "dean_reviewed":
        return "bg-purple-100 text-purple-800";
      case "dvc_approved":
        return "bg-green-100 text-green-800";
      case "dvc_rejected":
        return "bg-red-100 text-red-800";
      case "hr_processed":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUniqueValues = (key: string) => {
    const values = new Set<string>();
    promotionRequests.forEach((app) => {
      // @ts-ignore
      if (key === "year") {
        values.add(new Date(app.submissionDate).getFullYear().toString());
      } else {
        // @ts-ignore
        values.add(app[key]);
      }
    });
    return Array.from(values).sort();
  };

  const toggleRowExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Promotion History</h1>
        <p className="text-gray-600 mt-2">
          View historical promotion applications and their status
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            {getUniqueValues("status").map((status) => (
              <option key={status} value={status}>
                {getStatusText(status)}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={filters.school}
            onChange={(e) => setFilters({ ...filters, school: e.target.value })}
          >
            <option value="">All Schools</option>
            {getUniqueValues("schoolName").map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">All Years</option>
            {getUniqueValues("year").map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredData.length} of {promotionRequests.length}{" "}
            applications
          </p>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </button>
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
                    <User className="w-4 h-4 mr-2" />
                    Applicant
                    {sortConfig.key === "applicantName" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("currentRank")}
                >
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Promotion
                    {sortConfig.key === "currentRank" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("schoolName")}
                >
                  <div className="flex items-center">
                    <School className="w-4 h-4 mr-2" />
                    School
                    {sortConfig.key === "schoolName" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sortConfig.key === "status" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("submissionDate")}
                >
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Submitted
                    {sortConfig.key === "submissionDate" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((app) => (
                <>
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleRowExpand(app.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(app.status)}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {app.applicantName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.departmentName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {app.currentRank}
                      </div>
                      <div className="text-sm text-gray-500">
                        → {app.appliedRank}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.schoolName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusText(app.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {expandedRow === app.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </td>
                  </tr>
                  {expandedRow === app.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Application Details
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                <span className="font-medium">
                                  Current Rank:
                                </span>{" "}
                                {app.currentRank}
                              </p>
                              <p>
                                <span className="font-medium">
                                  Applied Rank:
                                </span>{" "}
                                {app.appliedRank}
                              </p>
                              <p>
                                <span className="font-medium">
                                  Years in Rank:
                                </span>{" "}
                                {app.yearsInCurrentRank || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Timeline
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                <span className="font-medium">Submitted:</span>{" "}
                                {new Date(
                                  app.submissionDate
                                ).toLocaleDateString()}
                              </p>
                              {app.hodReviewDate && (
                                <p>
                                  <span className="font-medium">
                                    HOD Review:
                                  </span>{" "}
                                  {new Date(
                                    app.hodReviewDate
                                  ).toLocaleDateString()}
                                </p>
                              )}
                              {app.deanReviewDate && (
                                <p>
                                  <span className="font-medium">
                                    Dean Review:
                                  </span>{" "}
                                  {new Date(
                                    app.deanReviewDate
                                  ).toLocaleDateString()}
                                </p>
                              )}
                              {app.dvcDecisionDate && (
                                <p>
                                  <span className="font-medium">
                                    DVC Decision:
                                  </span>{" "}
                                  {new Date(
                                    app.dvcDecisionDate
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Actions
                            </h4>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md hover:bg-blue-200">
                                View Documents
                              </button>
                              {app.status === "APPROVED" &&
                                !app.hrProcessed && (
                                  <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md hover:bg-green-200">
                                    Process Promotion
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No applications found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {
              setSearchTerm("");
              setFilters({ status: "", school: "", year: "" });
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
