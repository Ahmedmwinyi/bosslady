import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

export default function SchoolApplications() {
  const { user } = useAuth();
  const { promotionRequests, loadingRequests, fetchRequestsBySchool } =
    useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.schoolId) {
      fetchRequestsBySchool(user.schoolId);
    }
  }, [user?.schoolId, fetchRequestsBySchool]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "SUBMITTED":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "HOD_REVIEWED":
        return <Clock className="w-4 h-4 text-purple-500" />;
      case "DEAN_REVIEWED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "DVC_REJECTED":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "UNDER_DEAN_REVIEW":
        return <Clock className="w-4 h-4 text-blue-300" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "Draft";
      case "SUBMITTED":
        return "Pending HOD";
      case "HOD_REVIEWED":
        return "Pending Dean";
      case "DEAN_REVIEWED":
        return "Pending DVC";
      case "DVC_APPROVED":
        return "Approved";
      case "DVC_REJECTED":
        return "Rejected";
      case "UNDER_DEAN_REVIEW":
        return "Under Review";
      default:
        return status.replace(/_/g, " ");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800";
      case "HOD_REVIEWED":
        return "bg-purple-100 text-purple-800";
      case "DEAN_REVIEWED":
        return "bg-green-100 text-green-800";
      case "DVC_APPROVED":
        return "bg-emerald-100 text-emerald-800";
      case "DVC_REJECTED":
        return "bg-red-100 text-red-800";
      case "UNDER_DEAN_REVIEW":
        return "bg-blue-50 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loadingRequests) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with search */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            School Applications
          </h1>
          <p className="text-gray-600 mt-1">
            All promotion applications from {user?.schoolName}
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search applications..."
          />
        </div>
      </div>

      {/* Status filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 flex items-center">
          <Filter className="w-4 h-4 mr-1" /> All ({promotionRequests.length})
        </button>
        <button className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          Draft ({promotionRequests.filter((a) => a.status === "DRAFT").length})
        </button>
        <button className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          Pending (
          {
            promotionRequests.filter((a) =>
              ["SUBMITTED", "HOD_REVIEWED", "UNDER_DEAN_REVIEW"].includes(
                a.status
              )
            ).length
          }
          )
        </button>
        <button className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          Approved (
          {promotionRequests.filter((a) => a.status === "DVC_APPROVED").length})
        </button>
        <button className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          Rejected (
          {promotionRequests.filter((a) => a.status === "DVC_REJECTED").length})
        </button>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Applicant
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Promotion
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Updated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {promotionRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No applications found
                    </h3>
                    <p className="text-gray-600">
                      There are no applications from your school yet.
                    </p>
                  </td>
                </tr>
              ) : (
                promotionRequests.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {app.applicantName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.currentRank}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {app.departmentName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {app.currentRank} → {app.appliedRank}
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
                      {new Date(
                        app.updatedAt || app.submissionDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => navigate(`/applications/${app.id}`)}
                        className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                      >
                        View <ChevronRight className="w-4 h-4 ml-1" />
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
