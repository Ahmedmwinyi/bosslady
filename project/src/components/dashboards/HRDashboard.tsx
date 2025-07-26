import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useApplications } from "../../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Briefcase,
  PieChart,
} from "lucide-react";

export default function HRDashboard() {
  const { user } = useAuth();
  const { promotionRequests, loadingRequests, fetchPromotionRequests } =
    useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromotionRequests();
  }, [fetchPromotionRequests]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "submitted":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "hod_reviewed":
        return <Clock className="w-5 h-5 text-green-500" />;
      case "dean_reviewed":
        return <Clock className="w-5 h-5 text-purple-500" />;
      case "APPROVED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "dvc_rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
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
        return "Approved - Ready for Processing";
      case "dvc_rejected":
        return "Rejected";
      default:
        return "Unknown Status";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "hod_reviewed":
        return "bg-green-50 text-green-700 border-green-200";
      case "dean_reviewed":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "dvc_approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "dvc_rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getApprovedApplications = () => {
    return promotionRequests.filter((app) => app.status === "APPROVED");
  };

  const getPendingProcessing = () => {
    return promotionRequests.filter(
      (app) => app.status === "APPROVED" && !app.hrProcessed
    );
  };

  const getStatsBySchool = () => {
    const stats: Record<string, { total: number; approved: number }> = {};

    promotionRequests.forEach((app) => {
      if (!stats[app.schoolName]) {
        stats[app.schoolName] = { total: 0, approved: 0 };
      }
      stats[app.schoolName].total++;
      if (app.status === "APPROVED") {
        stats[app.schoolName].approved++;
      }
    });

    return stats;
  };


  const schoolStats = getStatsBySchool();

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, {user?.fullName}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Ready for Processing
              </h3>
              <p className="text-gray-600 text-sm">Approved applications</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-900">
            {getPendingProcessing().length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Total Approved
              </h3>
              <p className="text-gray-600 text-sm">This cycle</p>
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
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-900">
            {promotionRequests.length}
          </div>
        </div>
      </div>

      {/* School Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Applications by School
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(schoolStats).map(([school, stats]) => (
              <div
                key={school}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-medium text-gray-900 mb-2">{school}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total: {stats.total}</span>
                  <span className="text-green-600">
                    Approved: {stats.approved}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${(stats.approved / stats.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Ready for Processing */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Applications Ready for HR Processing
          </h2>
          <button
            onClick={() => navigate("/applications")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="p-6">
          {getPendingProcessing().length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications pending processing
              </h3>
              <p className="text-gray-600 mb-4">
                All approved applications have been processed.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {getPendingProcessing().map((app) => (
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
                      <div className="flex flex-wrap gap-2 mb-2">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {getStatusText(app.status)}
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border-gray-200">
                          {app.schoolName}
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border-gray-200">
                          {app.departmentName}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <p>
                          Submitted:{" "}
                          {new Date(app.submissionDate).toLocaleDateString()}
                        </p>
                        <p>
                          Approved:{" "}
                          {app.dvcDecisionDate
                            ? new Date(app.dvcDecisionDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/process/${app.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Process <ChevronRight className="w-4 h-4 ml-1" />
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
