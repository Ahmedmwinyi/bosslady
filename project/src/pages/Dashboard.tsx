import { useAuth } from '../contexts/AuthContext';
import StaffDashboard from '../components/dashboards/StaffDashboard';
import HODDashboard from '../components/dashboards/HODDashboard';
import DeanDashboard from '../components/dashboards/DeanDashboard';
import DVCDashboard from '../components/dashboards/DVCDashboard';
import HRDashboard from '../components/dashboards/HRDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'ACADEMIC':
        return <StaffDashboard />;
      case 'HOD':
        return <HODDashboard />;
      case 'DEAN':
        return <DeanDashboard />;
      case 'DVC':
        return <DVCDashboard />;
      case 'HR':
        return <HRDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return <div>Role not recognized</div>;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      {renderDashboard()}
    </div>
  );
}