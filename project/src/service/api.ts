const API_BASE_URL = 'http://localhost:8080/api';

// --- DTO Interfaces ---
interface AuthRequestDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  userId: number;
  role: string;
  fullName: string;
}


interface RegisterUserDTO {
  fullName: string;
  email: string;
  password: string;
  role: string;
  departmentId?: number;
  schoolId?: number;
  phoneNumber?: string;
  employeeId?: string;
}

interface UserDTO {
  id: number;
  fullName: string;
  email: string;
  role: string;
  departmentId?: number;
  schoolId?: number;
  phoneNumber?: string;
  employeeId?: string;
  currentRank?: string;
  isActive: boolean;
}

interface UserProfileDTO extends UserDTO {
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromotionRequestDTO {
  id: number;
  applicantId: number;
  applicantName?: string;
  departmentId: number;
  department?: string;
  schoolId: number;
  school?: string;
  currentRank: string;
  appliedRank: string;
  status: string;
  submissionDate?: string;
  comments?: {
    role: string;
    author: string;
    comment: string;
    reviewDate?: string;
  }[];
  documents?: {
    name: string;
    type: string;
    size: number;
  }[];
}

export interface PromotionReviewDTO {
  id: number;
  promotionRequestId: number;
  reviewerId: number;
  reviewerRole: string;
  comments: string;
  decision: string;
  reviewDate?: string;
}

export interface SchoolDTO {
  id: number;
  name: string;
  code?: string;
  description?: string;
  deanId?: number;
  isActive: boolean;
}

export interface DepartmentDTO {
  id: number;
  name: string;
  code?: string;
  description?: string;
  schoolId: number;
  headOfDepartmentId?: number;
  isActive: boolean;
}

export interface DocumentDTO {
  id: number;
  originalName: string;
  storedName: string;
  filePath: string;
  fileSize?: number;
  contentType?: string;
  documentType?: string;
  description?: string;
  requestId: number;
  uploadedBy: number;
  uploadedAt: Date;
}

export interface NotificationDTO {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  actionUrl?: string;
  promotionRequestId?: number;
  createdAt: string;
}

// --- API Client Class ---
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('suza_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // ==================== Auth ====================
  async login(email: string, password: string): Promise<AuthResponseDTO> {
    const response = await this.request<AuthResponseDTO>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password } as AuthRequestDTO),
    });
    return response;
  }

   // ==================== Users ====================
  async registerUser(userData: RegisterUserDTO): Promise<UserDTO> {
    return this.request<UserDTO>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUserProfile(userId: number): Promise<UserProfileDTO> {
    return this.request<UserProfileDTO>(`/users/${userId}/profile`);
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return this.request<UserDTO[]>('/users');
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    try {
      return await this.request<UserDTO>(`/users/search?email=${encodeURIComponent(email)}`);
    } catch (error) {
      if ((error as Error).message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    return this.request<boolean>(`/users/exists?email=${encodeURIComponent(email)}`);
  }

  async getUsersByRole(role: string): Promise<UserDTO[]> {
    return this.request<UserDTO[]>(`/users/role/${role}`);
  }

  async getUsersByDepartment(departmentId: number): Promise<UserDTO[]> {
    return this.request<UserDTO[]>(`/users/department/${departmentId}`);
  }

  async getUsersBySchool(schoolId: number): Promise<UserDTO[]> {
    return this.request<UserDTO[]>(`/users/school/${schoolId}`);
  }

  // ==================== Departments ====================
   async createDepartment(department: DepartmentDTO): Promise<DepartmentDTO> {
    return this.request<DepartmentDTO>('/departments', {
      method: 'POST',
      body: JSON.stringify(department),
    });
  }

  async getAllDepartments(): Promise<DepartmentDTO[]> {
    return this.request<DepartmentDTO[]>('/departments');
  }

  async getDepartmentById(id: number): Promise<DepartmentDTO> {
    return this.request<DepartmentDTO>(`/departments/${id}`);
  }

  async getDepartmentsBySchool(schoolId: number): Promise<DepartmentDTO[]> {
    return this.request<DepartmentDTO[]>(`/departments/school/${schoolId}`);
  }

  async updateDepartment(id: number, department: DepartmentDTO): Promise<DepartmentDTO> {
    return this.request<DepartmentDTO>(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(department),
    });
  }

  async deleteDepartment(id: number): Promise<void> {
    return this.request<void>(`/departments/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== Promotion Requests ====================
   async createPromotionRequest(applicantId: number, requestData: PromotionRequestDTO): Promise<PromotionRequestDTO> {
    return this.request<PromotionRequestDTO>(`/promotion-requests/${applicantId}`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async submitPromotionRequest(requestId: number): Promise<PromotionRequestDTO> {
    return this.request<PromotionRequestDTO>(`/promotion-requests/${requestId}/submit`, {
      method: 'PUT',
    });
  }

  async getPromotionRequest(id: number): Promise<PromotionRequestDTO> {
    return this.request<PromotionRequestDTO>(`/promotion-requests/${id}`);
  }

  async updatePromotionRequest(id: number, requestData: PromotionRequestDTO): Promise<PromotionRequestDTO> {
    return this.request<PromotionRequestDTO>(`/promotion-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  }

  async deletePromotionRequest(id: number): Promise<void> {
    return this.request<void>(`/promotion-requests/${id}`, {
      method: 'DELETE',
    });
  }

  async getPromotionRequestsByApplicant(applicantId: number): Promise<PromotionRequestDTO[]> {
    return this.request<PromotionRequestDTO[]>(`/promotion-requests/applicant/${applicantId}`);
  }

  async getPromotionRequestsByStatus(status: string): Promise<PromotionRequestDTO[]> {
    return this.request<PromotionRequestDTO[]>(`/promotion-requests/status/${status}`);
  }

  async getPromotionRequestsByDepartment(departmentId: number): Promise<PromotionRequestDTO[]> {
    return this.request<PromotionRequestDTO[]>(`/promotion-requests/department/1`);
  }

  async getPromotionRequestsBySchool(schoolId: number): Promise<PromotionRequestDTO[]> {
    return this.request<PromotionRequestDTO[]>(`/promotion-requests/school/1`);
  }


  // ==================== Documents ====================
  async uploadDocument(
    file: File,
    requestId: number,
    userId: number,
    documentType: string,
    description: string
  ): Promise<DocumentDTO> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('requestId', requestId.toString());
    formData.append('userId', userId.toString());
    formData.append('documentType', documentType);
    formData.append('description', description);

    return this.request<DocumentDTO>('/documents/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async downloadDocument(id: number): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/documents/${id}/download`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return await response.blob();
  }

  async getDocumentsByRequest(requestId: number): Promise<DocumentDTO[]> {
    return this.request<DocumentDTO[]>(`/documents/request/${requestId}`);
  }

  async getDocumentsByUploader(userId: number): Promise<DocumentDTO[]> {
    return this.request<DocumentDTO[]>(`/documents/uploader/${userId}`);
  }

  async getDocumentsByType(type: string): Promise<DocumentDTO[]> {
    return this.request<DocumentDTO[]>(`/documents/type/${type}`);
  }

  async deleteDocument(id: number): Promise<void> {
    return this.request<void>(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== Notifications ====================
   async createNotification(notification: NotificationDTO, userId: number): Promise<NotificationDTO> {
    return this.request<NotificationDTO>(`/notifications/user/${userId}`, {
      method: 'POST',
      body: JSON.stringify(notification),
    });
  }

  async getAllNotifications(): Promise<NotificationDTO[]> {
    return this.request<NotificationDTO[]>('/notifications');
  }

  async getNotificationById(id: number): Promise<NotificationDTO> {
    return this.request<NotificationDTO>(`/notifications/${id}`);
  }

  async updateNotification(id: number, notification: NotificationDTO): Promise<NotificationDTO> {
    return this.request<NotificationDTO>(`/notifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(notification),
    });
  }

  async deleteNotification(id: number): Promise<void> {
    return this.request<void>(`/notifications/${id}`, {
      method: 'DELETE',
    });
  }

  async markNotificationAsRead(id: number): Promise<void> {
    return this.request<void>(`/notifications/${id}/read`, {
      method: 'POST',
    });
  }

  async getUserNotifications(userId: number): Promise<NotificationDTO[]> {
    return this.request<NotificationDTO[]>(`/notifications/user/${userId}`);
  }

  async getUnreadUserNotifications(userId: number): Promise<NotificationDTO[]> {
    return this.request<NotificationDTO[]>(`/notifications/user/${userId}/unread`);
  }

  async getNotificationsByType(type: string): Promise<NotificationDTO[]> {
    return this.request<NotificationDTO[]>(`/notifications/type/${type}`);
  }


  // ==================== Promotion Reviews ====================
   async createOrUpdatePromotionReview(reviewData: PromotionReviewDTO): Promise<PromotionReviewDTO> {
    return this.request<PromotionReviewDTO>('/promotion-reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async getPromotionReview(id: number): Promise<PromotionReviewDTO> {
    return this.request<PromotionReviewDTO>(`/promotion-reviews/${id}`);
  }

  async getAllPromotionReviews(): Promise<PromotionReviewDTO[]> {
    return this.request<PromotionReviewDTO[]>('/promotion-reviews');
  }

  async deletePromotionReview(id: number): Promise<void> {
    return this.request<void>(`/promotion-reviews/${id}`, {
      method: 'DELETE',
    });
  }

  async getPromotionReviewsByReviewer(reviewerId: number): Promise<PromotionReviewDTO[]> {
    return this.request<PromotionReviewDTO[]>(`/promotion-reviews/by-reviewer/${reviewerId}`);
  }

  async getPromotionReviewsByRequest(requestId: number): Promise<PromotionReviewDTO[]> {
    return this.request<PromotionReviewDTO[]>(`/promotion-reviews/by-request/${requestId}`);
  }

  async getPromotionReviewsByDecision(decision: string): Promise<PromotionReviewDTO[]> {
    return this.request<PromotionReviewDTO[]>(`/promotion-reviews/by-decision/${decision}`);
  }

   // ==================== Schools ====================
  async createSchool(schoolData: SchoolDTO): Promise<SchoolDTO> {
    return this.request<SchoolDTO>('/schools', {
      method: 'POST',
      body: JSON.stringify(schoolData),
    });
  }

  async getAllSchools(): Promise<SchoolDTO[]> {
    return this.request<SchoolDTO[]>('/schools');
  }

  async getSchoolById(id: number): Promise<SchoolDTO> {
    return this.request<SchoolDTO>(`/schools/${id}`);
  }

  async updateSchool(id: number, schoolData: SchoolDTO): Promise<SchoolDTO> {
    return this.request<SchoolDTO>(`/schools/${id}`, {
      method: 'PUT',
      body: JSON.stringify(schoolData),
    });
  }

  async deleteSchool(id: number): Promise<void> {
    return this.request<void>(`/schools/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);