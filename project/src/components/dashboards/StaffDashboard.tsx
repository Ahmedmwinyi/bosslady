import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useApplications } from "../../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

export default function StaffDashboard() {
  const { user } = useAuth();
  const {
    promotionRequests,
    // loadingRequests,
    fetchRequestsByApplicant,
  } = useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetchRequestsByApplicant(user.id);
    }
  }, [user?.id, fetchRequestsByApplicant]);

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
      case "UNDER_DEAN_REVIEW":
        return "bg-red-50 text-red-700 border-purple-200";
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

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Academic Staff Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.fullName}!</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                New Application
              </h3>
              <p className="text-gray-600 text-sm">
                Submit a promotion request
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <button
            onClick={() => navigate("/apply")}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Apply for Promotion
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                My Applications
              </h3>
              <p className="text-gray-600 text-sm">
                {promotionRequests.length} total applications
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-900">
            {promotionRequests.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Career Progress
              </h3>
              <p className="text-gray-600 text-sm">
                Current: {user?.currentRank}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Assistant Lecturer → Lecturer
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            My Applications
          </h2>
        </div>
        <div className="p-6">
          {promotionRequests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications yet
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by submitting your first promotion application.
              </p>
              <button
                onClick={() => navigate("/apply")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Apply for Promotion
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {promotionRequests.map((app) => (
                <div
                  key={app.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(app.status)}
                        <h3 className="font-medium text-gray-900">
                          {app.currentRank} → {app.appliedRank}
                        </h3>
                      </div>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusText(app.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Submitted:{" "}
                        {new Date(app.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/review/${app.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
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
