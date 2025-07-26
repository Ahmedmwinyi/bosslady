import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  FileText,
  Plus,
  Users,
  Building,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  User,
  LogOut,
  CaseSensitive as University,
  BookOpen,
  Shield,
  Mail,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ACADEMIC': return 'bg-blue-600';
      case 'HOD': return 'bg-green-600';
      case 'DEAN': return 'bg-purple-600';
      case 'DVC': return 'bg-red-600';
      case 'HR': return 'bg-yellow-600';
      case 'ADMIN': return 'bg-gray-600';
      default: return 'bg-blue-600';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ACADEMIC":
        return "Academic Staff";
      case "HOD":
        return "Head of Department";
      case "DEAN":
        return "Dean";
      case "DVC":
        return "Deputy Vice Chancellor";
      case "HR":
        return "HR Officer";
      case "ADMIN":
        return "Administrator";
      default:
        return role;
    }
  };

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' }
    ];

    switch (user?.role) {
      case 'ACADEMIC':
        return [
          ...baseItems,
          { icon: Plus, label: 'Apply for Promotion', path: '/apply' },
          { icon: FileText, label: 'My Applications', path: '/my-applications' },
          { icon: BookOpen, label: 'Guidelines', path: '/guidelines' }
        ];
      
      case 'HOD':
        return [
          ...baseItems,
          { icon: Clock, label: 'Pending Reviews', path: '/pending-reviews' },
          { icon: FileText, label: 'Department Applications', path: '/department-applications' },
          { icon: BookOpen, label: 'Guidelines', path: '/guidelines' }
        ];
      
      case 'DEAN':
        return [
          ...baseItems,
          { icon: Clock, label: 'Pending Reviews', path: '/pending-reviews' },
          { icon: FileText, label: 'School Applications', path: '/school-applications' },
          { icon: BookOpen, label: 'Guidelines', path: '/guidelines' }
        ];
      
      case 'DVC':
        return [
          ...baseItems,
          { icon: Clock, label: 'Final Decisions', path: '/final-decisions' },
          { icon: CheckCircle, label: 'Approved Applications', path: '/approved-applications' },
          { icon: BookOpen, label: 'Guidelines', path: '/guidelines' }
        ];
      
      case 'HR':
        return [
          ...baseItems,
          { icon: FileText, label: 'All Applications', path: '/all-applications' },
          { icon: BarChart3, label: 'Reports', path: '/reports' },
          { icon: Clock, label: 'Promotion History', path: '/promotion-history' },
          { icon: Mail, label: 'Notifications', path: '/notifications' }
        ];
      
      case 'ADMIN':
        return [
          ...baseItems,
          { icon: Users, label: 'User Management', path: '/users' },
          { icon: Building, label: 'Departments', path: '/departments' },
          { icon: Shield, label: 'Schools', path: '/schools' },
          { icon: BarChart3, label: 'Reports', path: '/reports' },
          { icon: Settings, label: 'System Settings', path: '/settings' }
        ];
      
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border border-gray-200"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 flex flex-col shadow-lg z-40 transition-transform duration-300 ease-in-out
        w-64 lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <University className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-base lg:text-lg font-bold text-gray-900 truncate">SUZA Promotion</h1>
              <p className="text-xs text-gray-500 truncate">Academic Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 lg:py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-3 lg:p-4 border-t border-gray-200 bg-gray-50">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getRoleColor(user?.role || '')}`}>
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">{user?.fullName}</p>
              <p className="text-xs text-gray-500 truncate">{getRoleLabel(user?.role || '')}</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}