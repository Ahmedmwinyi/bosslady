import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  XCircle,
  Gavel,
  Calendar,
  User,
  School,
  Award,
} from "lucide-react";
import { useEffect } from "react";

export default function FinalDecisions() {
  const { user } = useAuth();
  const { promotionRequests, loadingRequests, fetchRequestsByStatus } =
    useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequestsByStatus("UNDER_DVC_REVIEW");
  }, [fetchRequestsByStatus]);

  const getPendingApplications = () => {
    return promotionRequests.filter((app) => app.status === "UNDER_DVC_REVIEW");
  };

  const handleFinalizeDecision = (appId: string, decision: "APPROVE" | "REJECT") => {
    // You'll need to implement this function in your ApplicationContext
    // to update the application status
    console.log(`Finalizing decision for ${appId}: ${decision}`);
    // Example: finalizeDecision(appId, decision);
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
        <Gavel className="w-12 h-12 text-gray-700 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Final Decisions</h1>
        <p className="text-gray-600 mt-2">
          Review and finalize promotion applications
        </p>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-300">
        {getPendingApplications().length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No applications pending final decision
            </h3>
            <p className="text-gray-600 mb-4">
              All applications have been processed.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {getPendingApplications().map((app) => (
              <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Application Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {app.applicantName} - {app.currentRank} → {app.appliedRank}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <School className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {app.schoolName} / {app.departmentName}
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
                          Submitted: {new Date(app.submissionDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Review Timeline */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Review Timeline</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">HOD Review:</span>{" "}
                          {app.hodReviewDate ? new Date(app.hodReviewDate).toLocaleDateString() : "Pending"}
                        </div>
                        <div>
                          <span className="text-gray-500">Dean Review:</span>{" "}
                          {app.deanReviewDate ? new Date(app.deanReviewDate).toLocaleDateString() : "Pending"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decision Panel */}
                  <div className="md:w-64 flex flex-col gap-3">
                    <button
                      onClick={() => navigate(`/review/${app.id}`)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      View Full Application
                    </button>
                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        onClick={() => handleFinalizeDecision(app.id, "APPROVE")}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve Promotion
                      </button>
                      <button
                        onClick={() => handleFinalizeDecision(app.id, "REJECT")}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject Application
                      </button>
                    </div>
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