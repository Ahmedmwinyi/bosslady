import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { CaseSensitive as University, User, LogOut, Plus, Users, Home } from 'lucide-react';

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
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

  const getNavItems = () => {
    const items = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' }
    ];

    if (user?.role === 'ACADEMIC') {
      items.push({ icon: Plus, label: 'Apply', path: '/apply' });
    }

    if (user?.role === 'ADMIN') {
      items.push({ icon: Users, label: 'Users', path: '/users' });
    }

    return items;
  };

  return (
    <nav className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg">
              <University className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">SUZA Promotion</h1>
              <p className="text-xs text-gray-500">Academic Management System</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {getNavItems().map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRoleColor(user?.role || '')}`}>
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.fullName}</div>
                <div className="text-gray-500 capitalize">{user?.role}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}