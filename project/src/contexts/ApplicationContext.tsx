/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  apiClient,
  PromotionRequestDTO,
  PromotionReviewDTO,
  DocumentDTO,
  NotificationDTO,
  DepartmentDTO,
  SchoolDTO,
} from "../service/api";
import { useAuth } from "./AuthContext";

// Define the shape of your application context
interface ApplicationContextType {
  // Promotion Requests
  promotionRequests: PromotionRequestDTO[];
  loadingRequests: boolean;
  errorRequests: string | null;
  fetchPromotionRequests: () => Promise<void>;
  fetchRequestsByApplicant: (applicantId: number) => Promise<void>;
  fetchRequestsByStatus: (status: string) => Promise<void>;
  fetchRequestsByDepartment: (departmentId: number) => Promise<void>;
  fetchRequestsBySchool: (schoolId: number) => Promise<void>;
  createPromotionRequest: (
    requestData: PromotionRequestDTO
  ) => Promise<PromotionRequestDTO>;
  submitPromotionRequest: (requestId: number) => Promise<PromotionRequestDTO>;
  updatePromotionRequest: (
    id: number,
    requestData: PromotionRequestDTO
  ) => Promise<PromotionRequestDTO>;
  deletePromotionRequest: (id: number) => Promise<void>;
  getApplication: (id: string) => Promise<PromotionRequestDTO | null>;

  // Promotion Reviews
  promotionReviews: PromotionReviewDTO[];
  loadingReviews: boolean;
  errorReviews: string | null;
  fetchPromotionReviews: () => Promise<void>;
  fetchReviewsByReviewer: (reviewerId: number) => Promise<void>;
  fetchReviewsByRequest: (requestId: number) => Promise<void>;
  fetchReviewsByDecision: (decision: string) => Promise<void>;
  createOrUpdateReview: (
    reviewData: PromotionReviewDTO
  ) => Promise<PromotionReviewDTO>;
  deleteReview: (id: number) => Promise<void>;

  // Documents
  documents: DocumentDTO[];
  loadingDocuments: boolean;
  errorDocuments: string | null;
  fetchDocumentsByRequest: (requestId: number) => Promise<void>;
  fetchDocumentsByUploader: (userId: number) => Promise<void>;
  fetchDocumentsByType: (type: string) => Promise<void>;
  uploadDocument: (
    file: File,
    requestId: number,
    userId: number,
    documentType: string,
    description: string
  ) => Promise<DocumentDTO>;
  downloadDocument: (id: number) => Promise<Blob>;
  deleteDocument: (id: number) => Promise<void>;

  // Notifications
  notifications: NotificationDTO[];
  unreadNotifications: NotificationDTO[];
  loadingNotifications: boolean;
  errorNotifications: string | null;
  fetchUserNotifications: (userId: number) => Promise<void>;
  fetchUnreadNotifications: (userId: number) => Promise<void>;
  createNotification: (
    notification: NotificationDTO,
    userId: number
  ) => Promise<NotificationDTO>;
  markNotificationAsRead: (id: number) => Promise<void>;

  // Departments & Schools
  departments: DepartmentDTO[];
  schools: SchoolDTO[];
  loadingDepartments: boolean;
  loadingSchools: boolean;
  errorDepartments: string | null;
  errorSchools: string | null;
  fetchDepartments: () => Promise<void>;
  fetchDepartmentsBySchool: (schoolId: number) => Promise<void>;
  fetchSchools: () => Promise<void>;
}

// Create the context
const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

// Provider component
export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [promotionRequests, setPromotionRequests] = useState<
    PromotionRequestDTO[]
  >([]);
  const [promotionReviews, setPromotionReviews] = useState<
    PromotionReviewDTO[]
  >([]);
  const [documents, setDocuments] = useState<DocumentDTO[]>([]);
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<
    NotificationDTO[]
  >([]);
  const [departments, setDepartments] = useState<DepartmentDTO[]>([]);
  const [schools, setSchools] = useState<SchoolDTO[]>([]);

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingSchools, setLoadingSchools] = useState(false);

  const [errorRequests, setErrorRequests] = useState<string | null>(null);
  const [errorReviews, setErrorReviews] = useState<string | null>(null);
  const [errorDocuments, setErrorDocuments] = useState<string | null>(null);
  const [errorNotifications, setErrorNotifications] = useState<string | null>(
    null
  );
  const [errorDepartments, setErrorDepartments] = useState<string | null>(null);
  const [errorSchools, setErrorSchools] = useState<string | null>(null);

  // ==================== Promotion Requests ====================
  const getApplication = async (
    id: string
  ): Promise<PromotionRequestDTO | null> => {
    try {
      const request = await apiClient.getPromotionRequest(parseInt(id));
      return request;
    } catch (error) {
      console.error("Error fetching application:", error);
      return null;
    }
  };

  const fetchPromotionRequests = async () => {
    setLoadingRequests(true);
    setErrorRequests(null);
    try {
      const requests = await apiClient.getPromotionRequestsByStatus(
        "SUBMITTED"
      );
      setPromotionRequests(requests);
    } catch (error) {
      setErrorRequests(
        error instanceof Error ? error.message : "Failed to fetch requests"
      );
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchRequestsByApplicant = async (applicantId: number) => {
    setLoadingRequests(true);
    setErrorRequests(null);
    try {
      const requests = await apiClient.getPromotionRequestsByApplicant(
        applicantId
      );
      setPromotionRequests(requests);
    } catch (error) {
      setErrorRequests(
        error instanceof Error ? error.message : "Failed to fetch requests"
      );
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchRequestsByStatus = async (status: string) => {
    setLoadingRequests(true);
    setErrorRequests(null);
    try {
      const requests = await apiClient.getPromotionRequestsByStatus(status);
      setPromotionRequests(requests);
    } catch (error) {
      setErrorRequests(
        error instanceof Error ? error.message : "Failed to fetch requests"
      );
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchRequestsByDepartment = async (departmentId: number) => {
    setLoadingRequests(true);
    setErrorRequests(null);
    try {
      const requests = await apiClient.getPromotionRequestsByDepartment(
        departmentId
      );
      setPromotionRequests(requests);
    } catch (error) {
      setErrorRequests(
        error instanceof Error ? error.message : "Failed to fetch requests"
      );
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchRequestsBySchool = async (schoolId: number) => {
    setLoadingRequests(true);
    setErrorRequests(null);
    try {
      const requests = await apiClient.getPromotionRequestsBySchool(schoolId);
      setPromotionRequests(requests);
    } catch (error) {
      setErrorRequests(
        error instanceof Error ? error.message : "Failed to fetch requests"
      );
    } finally {
      setLoadingRequests(false);
    }
  };

  const createPromotionRequest = async (
    requestData: PromotionRequestDTO
  ): Promise<PromotionRequestDTO> => {
    if (!user) throw new Error("User not authenticated");
    try {
      const newRequest = await apiClient.createPromotionRequest(
        user.id,
        requestData
      );
      setPromotionRequests((prev) => [...prev, newRequest]);
      return newRequest;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to create request");
    }
  };

  const submitPromotionRequest = async (
    requestId: number
  ): Promise<PromotionRequestDTO> => {
    try {
      const updatedRequest = await apiClient.submitPromotionRequest(requestId);
      setPromotionRequests((prev) =>
        prev.map((req) => (req.id === requestId ? updatedRequest : req))
      );
      return updatedRequest;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to submit request");
    }
  };

  const updatePromotionRequest = async (
    id: number,
    requestData: PromotionRequestDTO
  ): Promise<PromotionRequestDTO> => {
    try {
      const updatedRequest = await apiClient.updatePromotionRequest(
        id,
        requestData
      );
      setPromotionRequests((prev) =>
        prev.map((req) => (req.id === id ? updatedRequest : req))
      );
      return updatedRequest;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to update request");
    }
  };

  const deletePromotionRequest = async (id: number): Promise<void> => {
    try {
      await apiClient.deletePromotionRequest(id);
      setPromotionRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to delete request");
    }
  };

  // ==================== Promotion Reviews ====================
  const fetchPromotionReviews = async () => {
    setLoadingReviews(true);
    setErrorReviews(null);
    try {
      const reviews = await apiClient.getAllPromotionReviews();
      setPromotionReviews(reviews);
    } catch (error) {
      setErrorReviews(
        error instanceof Error ? error.message : "Failed to fetch reviews"
      );
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchReviewsByReviewer = async (reviewerId: number) => {
    setLoadingReviews(true);
    setErrorReviews(null);
    try {
      const reviews = await apiClient.getPromotionReviewsByReviewer(reviewerId);
      setPromotionReviews(reviews);
    } catch (error) {
      setErrorReviews(
        error instanceof Error ? error.message : "Failed to fetch reviews"
      );
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchReviewsByRequest = async (requestId: number) => {
    setLoadingReviews(true);
    setErrorReviews(null);
    try {
      const reviews = await apiClient.getPromotionReviewsByRequest(requestId);
      setPromotionReviews(reviews);
    } catch (error) {
      setErrorReviews(
        error instanceof Error ? error.message : "Failed to fetch reviews"
      );
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchReviewsByDecision = async (decision: string) => {
    setLoadingReviews(true);
    setErrorReviews(null);
    try {
      const reviews = await apiClient.getPromotionReviewsByDecision(decision);
      setPromotionReviews(reviews);
    } catch (error) {
      setErrorReviews(
        error instanceof Error ? error.message : "Failed to fetch reviews"
      );
    } finally {
      setLoadingReviews(false);
    }
  };

  const createOrUpdateReview = async (
    reviewData: PromotionReviewDTO
  ): Promise<PromotionReviewDTO> => {
    try {
      const review = await apiClient.createOrUpdatePromotionReview(reviewData);
      setPromotionReviews((prev) => {
        const existing = prev.find((r) => r.id === review.id);
        return existing
          ? prev.map((r) => (r.id === review.id ? review : r))
          : [...prev, review];
      });
      return review;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to create/update review");
    }
  };

  const deleteReview = async (id: number): Promise<void> => {
    try {
      await apiClient.deletePromotionReview(id);
      setPromotionReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to delete review");
    }
  };

  // ==================== Documents ====================
  const fetchDocumentsByRequest = async (requestId: number) => {
    setLoadingDocuments(true);
    setErrorDocuments(null);
    try {
      const docs = await apiClient.getDocumentsByRequest(requestId);
      setDocuments(docs);
    } catch (error) {
      setErrorDocuments(
        error instanceof Error ? error.message : "Failed to fetch documents"
      );
    } finally {
      setLoadingDocuments(false);
    }
  };

  const fetchDocumentsByUploader = async (userId: number) => {
    setLoadingDocuments(true);
    setErrorDocuments(null);
    try {
      const docs = await apiClient.getDocumentsByUploader(userId);
      setDocuments(docs);
    } catch (error) {
      setErrorDocuments(
        error instanceof Error ? error.message : "Failed to fetch documents"
      );
    } finally {
      setLoadingDocuments(false);
    }
  };

  const fetchDocumentsByType = async (type: string) => {
    setLoadingDocuments(true);
    setErrorDocuments(null);
    try {
      const docs = await apiClient.getDocumentsByType(type);
      setDocuments(docs);
    } catch (error) {
      setErrorDocuments(
        error instanceof Error ? error.message : "Failed to fetch documents"
      );
    } finally {
      setLoadingDocuments(false);
    }
  };

  const uploadDocument = async (
    file: File,
    requestId: number,
    userId: number,
    documentType: string,
    description: string
  ): Promise<DocumentDTO> => {
    try {
      const doc = await apiClient.uploadDocument(
        file,
        requestId,
        userId,
        documentType,
        description
      );
      setDocuments((prev) => [...prev, doc]);
      return doc;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to upload document");
    }
  };

  const downloadDocument = async (id: number): Promise<Blob> => {
    try {
      return await apiClient.downloadDocument(id);
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to download document");
    }
  };

  const deleteDocument = async (id: number): Promise<void> => {
    try {
      await apiClient.deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to delete document");
    }
  };

  // ==================== Notifications ====================
  const fetchUserNotifications = async (userId: number) => {
    setLoadingNotifications(true);
    setErrorNotifications(null);
    try {
      const notifs = await apiClient.getUserNotifications(userId);
      setNotifications(notifs);
    } catch (error) {
      setErrorNotifications(
        error instanceof Error ? error.message : "Failed to fetch notifications"
      );
    } finally {
      setLoadingNotifications(false);
    }
  };

  const fetchUnreadNotifications = async (userId: number) => {
    setLoadingNotifications(true);
    setErrorNotifications(null);
    try {
      const notifs = await apiClient.getUnreadUserNotifications(userId);
      setUnreadNotifications(notifs);
    } catch (error) {
      setErrorNotifications(
        error instanceof Error
          ? error.message
          : "Failed to fetch unread notifications"
      );
    } finally {
      setLoadingNotifications(false);
    }
  };

  const createNotification = async (
    notification: NotificationDTO,
    userId: number
  ): Promise<NotificationDTO> => {
    try {
      const notif = await apiClient.createNotification(notification, userId);
      setNotifications((prev) => [...prev, notif]);
      return notif;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to create notification");
    }
  };

  const markNotificationAsRead = async (id: number): Promise<void> => {
    try {
      await apiClient.markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
      setUnreadNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to mark notification as read");
    }
  };

  // ==================== Departments & Schools ====================
  const fetchDepartments = async () => {
    setLoadingDepartments(true);
    setErrorDepartments(null);
    try {
      const depts = await apiClient.getAllDepartments();
      setDepartments(depts);
    } catch (error) {
      setErrorDepartments(
        error instanceof Error ? error.message : "Failed to fetch departments"
      );
    } finally {
      setLoadingDepartments(false);
    }
  };

  const fetchDepartmentsBySchool = async (schoolId: number) => {
    setLoadingDepartments(true);
    setErrorDepartments(null);
    try {
      const depts = await apiClient.getDepartmentsBySchool(schoolId);
      setDepartments(depts);
    } catch (error) {
      setErrorDepartments(
        error instanceof Error ? error.message : "Failed to fetch departments"
      );
    } finally {
      setLoadingDepartments(false);
    }
  };

  const fetchSchools = async () => {
    setLoadingSchools(true);
    setErrorSchools(null);
    try {
      const schls = await apiClient.getAllSchools();
      setSchools(schls);
    } catch (error) {
      setErrorSchools(
        error instanceof Error ? error.message : "Failed to fetch schools"
      );
    } finally {
      setLoadingSchools(false);
    }
  };

  // Initialize data when user changes
  useEffect(() => {
    if (user) {
      fetchDepartments();
      fetchSchools();

      // Load user-specific data based on role
      if (user.role === "ACADEMIC") {
        fetchRequestsByApplicant(user.id);
      } else if (user.role === "HOD") {
        fetchRequestsByDepartment(user.departmentId);
      } else if (user.role === "DEAN") {
        fetchRequestsBySchool(user.schoolId);
      } else if (user.role === "DVC") {
        fetchRequestsByStatus("dean_reviewed");
      }

      // Load notifications
      fetchUserNotifications(user.id);
      fetchUnreadNotifications(user.id);
    }
  }, [user]);

  const value = {
    // Promotion Requests
    promotionRequests,
    loadingRequests,
    errorRequests,
    fetchPromotionRequests,
    fetchRequestsByApplicant,
    fetchRequestsByStatus,
    fetchRequestsByDepartment,
    fetchRequestsBySchool,
    createPromotionRequest,
    submitPromotionRequest,
    updatePromotionRequest,
    deletePromotionRequest,
    getApplication,

    // Promotion Reviews
    promotionReviews,
    loadingReviews,
    errorReviews,
    fetchPromotionReviews,
    fetchReviewsByReviewer,
    fetchReviewsByRequest,
    fetchReviewsByDecision,
    createOrUpdateReview,
    deleteReview,

    // Documents
    documents,
    loadingDocuments,
    errorDocuments,
    fetchDocumentsByRequest,
    fetchDocumentsByUploader,
    fetchDocumentsByType,
    uploadDocument,
    downloadDocument,
    deleteDocument,

    // Notifications
    notifications,
    unreadNotifications,
    loadingNotifications,
    errorNotifications,
    fetchUserNotifications,
    fetchUnreadNotifications,
    createNotification,
    markNotificationAsRead,

    // Departments & Schools
    departments,
    schools,
    loadingDepartments,
    loadingSchools,
    errorDepartments,
    errorSchools,
    fetchDepartments,
    fetchDepartmentsBySchool,
    fetchSchools,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

// Custom hook for using the context
export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider"
    );
  }
  return context;
};
