import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useApplications } from "../../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Gavel,
  Home,

} from "lucide-react";

export default function DvcDashboard() {
  const { user } = useAuth();
  const { promotionRequests, loadingRequests, fetchRequestsByStatus } =
    useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequestsByStatus("UNDER_DVC_REVIEW");
  }, [fetchRequestsByStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "SUBMITTED":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "APPROVED":
        return <Clock className="w-5 h-5 text-red-500" />;
      case "REJECTED":
        return <Clock className="w-5 h-5 text-green-500" />;
      case "HOD_REVIEWED":
        return <Clock className="w-5 h-5 text-purple-500" />;
      case "DEAN_REVIEWED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "DVC_REVIEWED":
        return <XCircle className="w-5 h-5 text-orange-500" />;
      case "UNDER_DEAN_REVIEW":
        return <XCircle className="w-5 h-5 text-blue-500" />;
      case "UNDER_DVC_REVIEW":
        return <Clock className="w-5 h-5 text-green-500" />;
      case "DVC_REJECTED":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "Draft";
      case "SUBMITTED":
        return "Submitted - Pending HOD Review";
      case "HOD_REVIEWED":
        return "HOD Reviewed - Pending Dean Review";
      case "DEAN_REVIEWED":
        return "Dean Reviewed - Pending DVC Decision";
      case "DVC_APPROVED":
        return "Approved by DVC";
      case "DVC_REJECTED":
        return "Rejected by DVC";
      case "UNDER_DVC_REVIEW":
        return "Review under DVC";
      case "UNDER_DEAN_REVIEW":
        return "Review under DVC";
      default:
        return "Unknown Status";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "SUBMITTED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "HOD_REVIEWED":
        return "bg-green-50 text-green-700 border-green-200";
      case "DEAN_REVIEWED":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "DVC_APPROVED":
        return "bg-green-50 text-green-700 border-green-200";
      case "DVC_REJECTED":
        return "bg-red-50 text-red-700 border-red-200";
      case "UNDER_DVC_REVIEW":
        return "bg-red-50 text-red-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPendingApplications = () => {
    return promotionRequests.filter((app) => app.status === "UNDER_DVC_REVIEW");
  };

  const getApprovedApplications = () => {
    return promotionRequests.filter((app) => app.status === "APPROVED");
  };

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">DVC Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, DVC {user?.fullName}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Pending Decisions
              </h3>
              <p className="text-gray-600 text-sm">
                Applications needing your approval
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-900">
            {getPendingApplications().length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
              <p className="text-gray-600 text-sm">
                Applications you've approved
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-900">
            {getApprovedApplications().length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Total Applications
              </h3>
              <p className="text-gray-600 text-sm">University-wide</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Home className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-900">
            {promotionRequests.length}
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Applications for Decision
          </h2>
          <button
            onClick={() => navigate("/applications")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="p-6">
          {getPendingApplications().length === 0 ? (
            <div className="text-center py-12">
              <Gavel className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications pending decision
              </h3>
              <p className="text-gray-600 mb-4">
                All applications have been processed.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {getPendingApplications().map((app) => (
                <div
                  key={app.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(app.status)}
                        <h3 className="font-medium text-gray-900">
                          {app.applicantName} ({app.schoolName}) -{" "}
                          {app.currentRank} → {app.appliedRank}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {getStatusText(app.status)}
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border-gray-200">
                          {app.departmentName}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <p className="text-sm text-gray-600">
                          Submitted:{" "}
                          {new Date(app.submissionDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          HOD Review:{" "}
                          {app.hodReviewDate
                            ? new Date(app.hodReviewDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Dean Review:{" "}
                          {app.deanReviewDate
                            ? new Date(app.deanReviewDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/review/${app.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Review <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
