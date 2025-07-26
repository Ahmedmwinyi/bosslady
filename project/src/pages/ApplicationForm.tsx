import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  X,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function ApplicationForm() {
  const { user } = useAuth();
  const {
    createPromotionRequest,
    departments,
    schools,
    fetchDepartments,
    fetchSchools,
  } = useApplications();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentRank: "",
    appliedRank: "",
    departmentId: user?.departmentId || "",
    schoolId: user?.schoolId || "",
    justification: "",
  });

  const [documents, setDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const academicRanks = [
    "Assistant Lecturer",
    "Lecturer",
    "Senior Lecturer",
    "Associate Professor",
    "Professor",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchDepartments(), fetchSchools()]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchDepartments, fetchSchools]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Check file size (max 10MB each)
      const validFiles = newFiles.filter(
        (file) => file.size <= 10 * 1024 * 1024
      );
      setDocuments((prev) => [...prev, ...validFiles]);

      // Show error for files that are too large
      if (newFiles.length !== validFiles.length) {
        alert("Some files were too large (max 10MB each) and were not added.");
      }
    }
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, you would upload files first and get their IDs
      const documentPromises = documents.map((file) => {
        // This would be replaced with actual file upload logic
        return Promise.resolve({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          type: file.type.split("/")[1] || "file",
          size: file.size,
          url: URL.createObjectURL(file),
        });
      });

      const uploadedDocuments = await Promise.all(documentPromises);

      await createPromotionRequest({
        applicantId: user?.id || 0,
        currentRank: formData.currentRank,
        appliedRank: formData.appliedRank,
        departmentId: parseInt(formData.departmentId),
        schoolId: parseInt(formData.schoolId),
        justification: formData.justification,
        documents: uploadedDocuments,
        status: "draft", // Start as draft, user will submit separately
      });

      navigate("/dashboard?success=true");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Submitting Application
            </h2>
            <p className="text-gray-600 mb-4">
              Please wait while we process your application...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Apply for Academic Promotion
          </h1>
          <p className="text-gray-600 mt-2">
            Submit your application for academic promotion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.fullName || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School
                </label>
                <select
                  name="schoolId"
                  value={formData.schoolId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select school</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Promotion Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Promotion Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Academic Rank
                </label>
                <select
                  name="currentRank"
                  value={formData.currentRank}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select current rank</option>
                  {academicRanks.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applied Academic Rank
                </label>
                <select
                  name="appliedRank"
                  value={formData.appliedRank}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select applied rank</option>
                  {academicRanks
                    .filter(
                      (rank) =>
                        academicRanks.indexOf(rank) >
                        academicRanks.indexOf(formData.currentRank)
                    )
                    .map((rank) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Justification for Promotion
              </label>
              <textarea
                name="justification"
                value={formData.justification}
                onChange={handleInputChange}
                rows={6}
                required
                placeholder="Describe your achievements, contributions, and reasons for seeking promotion..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Supporting Documents
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-800 font-medium">
                      Click to upload
                    </span>
                    <span> or drag and drop</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, JPG, PNG up to 10MB each
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Document List */}
            {documents.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Uploaded Documents ({documents.length})
                </h3>
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(doc.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Required Documents:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Updated Curriculum Vitae (CV)</li>
                <li>• List of Publications/Research Papers</li>
                <li>• Teaching Evaluation Reports (last 3 years)</li>
                <li>• Community Service Documentation</li>
                <li>• Letters of Recommendation (2 minimum)</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Save as Draft
            </button>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={
                  !formData.currentRank ||
                  !formData.appliedRank ||
                  documents.length === 0
                }
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
