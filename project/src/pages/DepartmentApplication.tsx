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
  Building2,
} from "lucide-react";

export default function DepartmentApplications() {
  const { user } = useAuth();
  const { promotionRequests, loadingRequests, fetchRequestsByDepartment } =
    useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.departmentId) {
      fetchRequestsByDepartment(user.departmentId);
    }
  }, [user?.departmentId, fetchRequestsByDepartment]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "SUBMITTED":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "HOD_REVIEWED":
        return <Clock className="w-4 h-4 text-indigo-500" />;
      case "DEAN_REVIEWED":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "DVC_REJECTED":
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case "UNDER_DEAN_REVIEW":
        return <Clock className="w-4 h-4 text-sky-500" />;
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
        return "bg-amber-100 text-amber-800";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800";
      case "HOD_REVIEWED":
        return "bg-indigo-100 text-indigo-800";
      case "DEAN_REVIEWED":
        return "bg-emerald-100 text-emerald-800";
      case "DVC_APPROVED":
        return "bg-green-100 text-green-800";
      case "DVC_REJECTED":
        return "bg-rose-100 text-rose-800";
      case "UNDER_DEAN_REVIEW":
        return "bg-sky-100 text-sky-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loadingRequests) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with department info */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.departmentName} Applications
          </h1>
        </div>
        <p className="text-gray-600">
          {user?.schoolName} • {promotionRequests.length} total applications
        </p>
      </div>

      {/* Search and filter bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search applicants..."
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-800 flex items-center whitespace-nowrap">
            <Filter className="w-4 h-4 mr-2" /> All Statuses
          </button>
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
            Pending Review
          </button>
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-800 whitespace-nowrap">
            Approved
          </button>
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-rose-100 text-rose-800 whitespace-nowrap">
            Rejected
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
          <div className="text-sm font-medium text-gray-500 mb-1">Total</div>
          <div className="text-2xl font-bold text-indigo-600">
            {promotionRequests.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
          <div className="text-sm font-medium text-gray-500 mb-1">Drafts</div>
          <div className="text-2xl font-bold text-amber-600">
            {promotionRequests.filter((a) => a.status === "DRAFT").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
          <div className="text-sm font-medium text-gray-500 mb-1">Pending</div>
          <div className="text-2xl font-bold text-blue-600">
            {
              promotionRequests.filter((a) =>
                ["SUBMITTED", "HOD_REVIEWED", "UNDER_DEAN_REVIEW"].includes(
                  a.status
                )
              ).length
            }
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Processed
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {
              promotionRequests.filter((a) =>
                ["DVC_APPROVED", "DVC_REJECTED"].includes(a.status)
              ).length
            }
          </div>
        </div>
      </div>

      {/* Applications table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
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
                  Current Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Applied Rank
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
                      There are no applications in your department yet.
                    </p>
                  </td>
                </tr>
              ) : (
                promotionRequests.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {app.applicantName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(app.submissionDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.currentRank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.appliedRank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(app.status)}
                        <span
                          className={`ml-2 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
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
                        className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end"
                      >
                        Details <ChevronRight className="w-4 h-4 ml-1" />
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
