import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import {
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  Calendar,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

interface Application {
  id: string;
  applicantName: string;
  department: string;
  school: string;
  currentRank: string;
  appliedRank: string;
  status: string;
  submittedAt: Date | string;
  applicantId: number;
}

export default function ApplicationReview() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const {
    getApplication,
    fetchDocumentsByRequest,
    documents,
    createOrUpdateReview,
    createNotification,
    downloadDocument,
  } = useApplications();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [decision, setDecision] = useState<"APPROVED" | "REJECTED" | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setLoading(true);
          const app = await getApplication(id);
          if (app) {
            setApplication({
              ...app,
              submittedAt: app.submissionDate
                ? new Date(app.submissionDate)
                : new Date(),
            });
            await fetchDocumentsByRequest(parseInt(id));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load application data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, getApplication, fetchDocumentsByRequest]);

  const canReview = () => {
    if (!user || !application) return false;

    switch (user.role) {
      case "HOD":
        return application.status === "DRAFT";
      case "DEAN":
        return application.status === "HOD_REVIEWED" || "UNDER_DEAN_REVIEW";
      case "DVC":
        return application.status === "UNDER_DVC_REVIEW";
      default:
        return false;
    }
  };

  const getStatusTimeline = () => {
    const steps = [
      { key: "DRAFT", label: "Submitted", icon: FileText },
      { key: "HOD_REVIEWED", label: "HOD Review", icon: CheckCircle },
      { key: "UNDER_DEAN_REVIEW", label: "Dean Review", icon: CheckCircle },
      { key: "UNDER_DVC_REVIEW", label: "dvc Review", icon: CheckCircle },
      { key: "DVC_APPROVED", label: "DVC Decision", icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex(
      (step) =>
        step.key === application?.status ||
        (application?.status === "DVC_REJECTED" && step.key === "DVC_APPROVED")
    );

    return steps.map((step, index) => ({
      ...step,
      completed: index < currentIndex,
      current: index === currentIndex,
      rejected:
        application?.status === "DVC_REJECTED" && step.key === "DVC_APPROVED",
    }));
  };

  const handleSubmitReview = async () => {
    if (!comment.trim() || !decision || !user || !application) return;

    setIsSubmitting(true);

    try {
      // Submit the review
      await createOrUpdateReview({
        id: 0,
        promotionRequestId: parseInt(application.id),
        reviewerId: user.id,
        reviewerRole: user.role,
        comments: comment,
        decision: decision,
        reviewDate: new Date().toISOString(),
      });

      // Update application status
      let newStatus = application.status;
      if (decision === "APPROVED") {
        switch (user.role) {
          case "HOD":
            newStatus = "HOD_REVIEWED";
            break;
          case "DEAN":
            newStatus = "DEAN_REVIEWED";
            break;
          case "DVC":
            newStatus = "DVC_APPROVED";
            break;
        }
      } else if (decision === "REJECTED" && user.role === "DVC") {
        newStatus = "DVC_REJECTED";
      }

      await updateApplication(parseInt(application.id), {
        status: newStatus,
      });

      // Notify applicant
      await createNotification(
        {
          title: `Promotion Application ${decision}`,
          message: `Your promotion application has been ${decision.toLowerCase()} by ${
            user.name || user.role
          }`,
          type: "PROMOTION_REVIEW",
          actionUrl: `/applications/${application.id}`,
          promotionRequestId: parseInt(application.id),
        },
        application.applicantId
      );

      toast.success("Review submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadDocument = async (docId: number, docName: string) => {
    try {
      const blob = await downloadDocument(docId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", docName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success("Document downloaded successfully");
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document");
    }
  };

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    const dateObj = date instanceof Date ? date : new Date(date);
    return isNaN(dateObj.getTime()) ? "N/A" : dateObj.toLocaleDateString();
  };

  if (!application) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Application Not Found
            </h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const timeline = getStatusTimeline();

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Application Review
          </h1>
          <p className="text-gray-600 mt-2">
            Review and process promotion application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Application Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Applicant</p>
                    <p className="font-medium text-gray-900">
                      {application.applicantName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium text-gray-900">
                      {application.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">School</p>
                    <p className="font-medium text-gray-900">
                      {application.school}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Submitted</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(application.submittedAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">
                  Promotion Request
                </h3>
                <p className="text-blue-800">
                  {application.currentRank} → {application.appliedRank}
                </p>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Supporting Documents
              </h2>
              {documents && documents.length > 0 ? (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {doc.originalName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {doc.documentType} •{" "}
                            {doc.fileSize
                              ? Math.round(0.45 / 1024) + " KB"
                              : "Size unknown"}
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          handleDownloadDocument(doc.id, doc.originalName)
                        }
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No documents found</p>
              )}
            </div>

            {/* Review Form */}
            {canReview() && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Your Review
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Comments
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your review comments..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Decision
                    </label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setDecision("APPROVED")}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                          decision === "APPROVED"
                            ? "bg-green-600 text-white border-green-600"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      {user?.role === "DVC" && (
                        <button
                          type="button"
                          onClick={() => setDecision("REJECTED")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                            decision === "REJECTED"
                              ? "bg-red-600 text-white border-red-600"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSubmitReview}
                    disabled={!comment.trim() || !decision || isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Progress
              </h3>
              <div className="space-y-4">
                {timeline.map((step, index) => (
                  <div key={step.key} className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-green-100 text-green-600"
                          : step.current
                          ? "bg-blue-100 text-blue-600"
                          : step.rejected
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step.rejected ? (
                        <XCircle className="w-4 h-4" />
                      ) : step.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : step.current ? (
                        <Clock className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          step.completed || step.current
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.rejected && (
                        <p className="text-xs text-red-600">Rejected</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => {
                    if (documents.length > 0) {
                      documents.forEach((doc) => {
                        handleDownloadDocument(doc.id, doc.originalName);
                      });
                    }
                  }}
                >
                  Download All Documents
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Print Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
