import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Bell,
  BellOff,
  CheckCircle,
  AlertCircle,
  Info,
  Filter,
  X,
} from "lucide-react";

type Notification = {
  id: string;
  type: "success" | "error" | "info" | "warning" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export default function NotificationScreen() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("unread");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState<
    "all" | "success" | "error" | "info" | "warning" | "system"
  >("all");

  // Simulate loading notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([
        {
          id: "1",
          type: "success",
          title: "Promotion Approved",
          message: "Your promotion to Associate Professor has been approved by DVC.",
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          read: false,
          action: {
            label: "View Details",
            onClick: () => console.log("View promotion details"),
          },
        },
        {
          id: "2",
          type: "error",
          title: "Document Rejected",
          message: "Your publication document was rejected. Please upload a new version.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false,
          action: {
            label: "Upload Again",
            onClick: () => console.log("Upload document"),
          },
        },
        {
          id: "3",
          type: "info",
          title: "New Message",
          message: "You have received a new message from the HOD regarding your application.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true,
          action: {
            label: "Read Message",
            onClick: () => console.log("Read message"),
          },
        },
        {
          id: "4",
          type: "warning",
          title: "Deadline Reminder",
          message: "Your promotion application is due in 3 days. Please complete all requirements.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          read: true,
        },
        {
          id: "5",
          type: "system",
          title: "System Maintenance",
          message: "The promotion portal will be down for maintenance tomorrow from 2-4 AM.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
          read: true,
        },
      ]);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    const matchesFilter = filter === "all" || !n.read;
    const matchesType = typeFilter === "all" || n.type === typeFilter;
    return matchesFilter && matchesType;
  });

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "system":
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    
    return "just now";
  };

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-0">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">
            {filter === "unread"
              ? "Unread notifications"
              : "All notifications"}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            <span>Filters</span>
          </button>
          <button
            onClick={markAllAsRead}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={notifications.every((n) => n.read)}
          >
            <CheckCircle className="w-5 h-5 mr-2 text-gray-600" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>

      {/* Filters Dropdown */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notification Status
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    filter === "all"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    filter === "unread"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Unread Only
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notification Type
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTypeFilter("all")}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${
                    typeFilter === "all"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setTypeFilter("success")}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${
                    typeFilter === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Success
                </button>
                <button
                  onClick={() => setTypeFilter("error")}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${
                    typeFilter === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Error
                </button>
                <button
                  onClick={() => setTypeFilter("info")}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${
                    typeFilter === "info"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <Info className="w-4 h-4 mr-1" />
                  Info
                </button>
                <button
                  onClick={() => setTypeFilter("warning")}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${
                    typeFilter === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Warning
                </button>
                <button
                  onClick={() => setTypeFilter("system")}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${
                    typeFilter === "system"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <Bell className="w-4 h-4 mr-1" />
                  System
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <BellOff className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-lg font-medium text-gray-900 mt-4">
              No notifications found
            </h3>
            <p className="text-gray-600 mt-2">
              {filter === "unread"
                ? "You have no unread notifications"
                : "You have no notifications matching your filters"}
            </p>
            {filter !== "all" || typeFilter !== "all" ? (
              <button
                onClick={() => {
                  setFilter("all");
                  setTypeFilter("all");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Show all notifications
              </button>
            ) : null}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`hover:bg-gray-50 transition-colors ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm font-medium ${
                              !notification.read
                                ? "text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {notification.action && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              notification.action?.onClick();
                              markAsRead(notification.id);
                            }}
                            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}