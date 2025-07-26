import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  FileText,
  User,
  School,
  Calendar,
  Award,
} from "lucide-react";

export default function ApprovedApplications() {
  const { user } = useAuth();
  const { promotionRequests, loadingRequests, fetchRequestsByStatus } =
    useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch both DVC_APPROVED and APPROVED statuses to cover all approved applications
    fetchRequestsByStatus("DVC_APPROVED");
    fetchRequestsByStatus("APPROVED");
  }, [fetchRequestsByStatus]);

  const getApprovedApplications = () => {
    return promotionRequests.filter(
      (app) => app.status === "DVC_APPROVED" || app.status === "APPROVED"
    );
  };

  if (loadingRequests) {
    return (
      <div className="max-w-7xl mx-auto px-2 lg:px-0 py-8">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
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
    <div className="max-w-7xl mx-auto px-2 lg:px-0 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Approved Applications
        </h1>
        <p className="text-gray-600 mt-2">
          View all approved promotion applications
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-lg shadow-sm border border-green-200 mb-8 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Total Approved Applications
            </h3>
            <p className="text-gray-600 text-sm">
              Across all departments and schools
            </p>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {getApprovedApplications().length}
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {getApprovedApplications().length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No approved applications found
            </h3>
            <p className="text-gray-600 mb-4">
              Approved applications will appear here once processed.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {getApprovedApplications().map((app) => (
              <div
                key={app.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Application Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Award className="w-5 h-5 text-green-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {app.applicantName} - {app.currentRank} →{" "}
                        {app.appliedRank}
                      </h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Approved
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <School className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {app.schoolName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <School className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {app.departmentName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          Submitted by: {app.submittedBy}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          Approved on:{" "}
                          {app.dvcReviewDate
                            ? new Date(app.dvcReviewDate).toLocaleDateString()
                            : new Date(app.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Review Timeline */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Promotion Timeline
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Submitted:</span>{" "}
                          {new Date(app.submissionDate).toLocaleDateString()}
                        </div>
                        {app.hodReviewDate && (
                          <div>
                            <span className="text-gray-500">HOD Review:</span>{" "}
                            {new Date(app.hodReviewDate).toLocaleDateString()}
                          </div>
                        )}
                        {app.deanReviewDate && (
                          <div>
                            <span className="text-gray-500">Dean Review:</span>{" "}
                            {new Date(app.deanReviewDate).toLocaleDateString()}
                          </div>
                        )}
                        <div className="font-medium text-green-600">
                          <span className="text-gray-500">DVC Approval:</span>{" "}
                          {app.dvcReviewDate
                            ? new Date(app.dvcReviewDate).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="md:w-48 flex flex-col gap-3">
                    <button
                      onClick={() => navigate(`/applications/${app.id}`)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      View Details
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
