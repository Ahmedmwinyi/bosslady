import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function PendingReviews() {
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
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "SUBMITTED":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "HOD_REVIEWED":
        return <Clock className="w-5 h-5 text-purple-500" />;
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
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPendingApplications = () => {
    return promotionRequests.filter(
      (app) =>
        app.status === "DRAFT" ||
        app.status === "SUBMITTED" ||
        app.status === "HOD_REVIEWED"
    );
  };

  if (loadingRequests) {
    return (
      <div className="max-w-7xl mx-auto px-2 lg:px-0 py-8">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pending Reviews</h1>
        <p className="text-gray-600 mt-2">
          Review all pending applications in your department
        </p>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Applications Pending Review ({getPendingApplications().length})
          </h2>
        </div>
        <div className="p-6">
          {getPendingApplications().length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications pending review
              </h3>
              <p className="text-gray-600 mb-4">
                All applications in your department have been reviewed.
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
                          {app.applicantName} - {app.currentRank} →{" "}
                          {app.appliedRank}
                        </h3>
                      </div>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusText(app.status)}
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Submitted:</p>
                          <p className="text-gray-900">
                            {new Date(app.submissionDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Last Updated:</p>
                          <p className="text-gray-900">
                            {new Date(app.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/review/${app.id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      Review Application
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
