import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useApplications } from "../../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  ChevronRight,
  Settings,
  PieChart,
  BarChart,
  Shield,
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const {
    promotionRequests,
    fetchPromotionRequests,
    departments,
    schools,
    fetchDepartments,
    fetchSchools,
  } = useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromotionRequests();
    fetchDepartments();
    fetchSchools();
  }, [fetchPromotionRequests, fetchDepartments, fetchSchools]);

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
      case "dvc_approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "dvc_rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "Draft";
      case "submitted":
        return "Pending HOD Review";
      case "UNDER_HOD_REVIEW":
        return "Pending Dean Review";
      case "UNDER_DEAN_REVIEW":
        return "Pending DVC Decision";
      case "APPROVED":
        return "Approved";
      case "dvc_rejected":
        return "DVC_REJECTED";
      default:
        return "Unknown Status";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "UNDER_HOD_REVIEW":
        return "bg-green-50 text-green-700 border-green-200";
      case "UNDER_DEAN_REVIEW":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "APPROVED":
        return "bg-green-50 text-green-700 border-green-200";
      case "DVC_REJECTED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatsByStatus = () => {
    const stats: Record<string, number> = {
      DRAFT: 0,
      UNDER_DVC_REVIEW: 0,
      UNDER_HOD_REVIEW: 0,
      UNDER_DEAN_REVIEW: 0,
      APPROVED: 0,
      DVC_REJECTED: 0,
    };

    promotionRequests.forEach((app) => {
      stats[app.status]++;
    });

    return stats;
  };

  const getRecentActivity = () => {
    return [...promotionRequests]
      .sort(
        (a, b) =>
          new Date(b.submissionDate).getTime() -
          new Date(a.submissionDate).getTime()
      )
      .slice(0, 5);
  };


  const statusStats = getStatsByStatus();
  const recentActivity = getRecentActivity();

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, {user?.fullName}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Total Applications
              </h3>
              <p className="text-gray-600 text-sm">Current cycle</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
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
                Departments
              </h3>
              <p className="text-gray-600 text-sm">Active departments</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-900">
            {departments.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Schools</h3>
              <p className="text-gray-600 text-sm">Active schools</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-900">
            {schools.length}
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Status Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Applications by Status
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(statusStats).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(status)}
                    <span className="font-medium text-gray-700">
                      {getStatusText(status)}
                    </span>
                  </div>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500">No recent activity</p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-start justify-between"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {app.applicantName} - {app.currentRank} →{" "}
                        {app.appliedRank}
                      </h3>
                      <div
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusText(app.status)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Updated: {new Date(app.submissionDate).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/admin/applications/${app.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      View <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            System Management
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/admin/users")}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Users className="w-5 h-5 text-gray-700 mr-3" />
            <span>User Management</span>
          </button>
          <button
            onClick={() => navigate("/admin/departments")}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Settings className="w-5 h-5 text-gray-700 mr-3" />
            <span>Departments</span>
          </button>
          <button
            onClick={() => navigate("/admin/schools")}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Shield className="w-5 h-5 text-gray-700 mr-3" />
            <span>Schools</span>
          </button>
          <button
            onClick={() => navigate("/admin/settings")}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Settings className="w-5 h-5 text-gray-700 mr-3" />
            <span>System Settings</span>
          </button>
        </div>
      </div>

      {/* Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/admin/reports/promotion-stats")}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <BarChart className="w-5 h-5 text-gray-700 mr-3" />
            <span>Promotion Statistics</span>
          </button>
          <button
            onClick={() => navigate("/admin/reports/approval-rates")}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <PieChart className="w-5 h-5 text-gray-700 mr-3" />
            <span>Approval Rates</span>
          </button>
          <button
            onClick={() => navigate("/admin/reports/timelines")}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Clock className="w-5 h-5 text-gray-700 mr-3" />
            <span>Processing Timelines</span>
          </button>
        </div>
      </div>
    </div>
  );
}
