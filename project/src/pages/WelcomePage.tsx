import { useNavigate } from 'react-router-dom';
import { 
  CaseSensitive as University, 
  ArrowRight, 
  Shield, 
  Clock, 
  Users, 
  FileText,
  Target,
  CheckCircle,
  TrendingUp,
  Award,
  BookOpen,
  Globe
} from 'lucide-react';
import Footer from '../components/Footer';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <University className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">
                SUZA Promotion System
              </span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-600 p-4 rounded-full">
                <University className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              SUZA Academic Promotion System
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Empowering Academic Excellence Through Digital Innovation
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-4xl mx-auto">
              A comprehensive digital platform designed to streamline academic
              promotion processes, enhance transparency, and support career
              advancement for faculty at the State University of Zanzibar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Aims Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Project Aims & Objectives
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our mission is to revolutionize the academic promotion process at
              SUZA through technology, transparency, and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Streamline Processes
              </h3>
              <p className="text-gray-600">
                Eliminate paperwork and reduce processing time by digitizing the
                entire promotion workflow from application to final decision.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Enhance Transparency
              </h3>
              <p className="text-gray-600">
                Provide clear visibility into the promotion process with
                real-time status updates and transparent review criteria.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Support Excellence
              </h3>
              <p className="text-gray-600">
                Foster academic excellence by providing a fair, efficient, and
                merit-based promotion evaluation system.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 text-center">
              <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Improve Collaboration
              </h3>
              <p className="text-gray-600">
                Enable seamless collaboration between academic staff, department
                heads, deans, and administrative personnel.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-6 text-center">
              <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ensure Compliance
              </h3>
              <p className="text-gray-600">
                Maintain adherence to university policies and academic standards
                throughout the promotion evaluation process.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6 text-center">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Enable Accessibility
              </h3>
              <p className="text-gray-600">
                Provide 24/7 access to the promotion system from anywhere,
                making it convenient for all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to support every aspect of the
              academic promotion process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Digital Applications
              </h3>
              <p className="text-gray-600">
                Submit promotion applications online with document upload and
                form validation
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-time Tracking
              </h3>
              <p className="text-gray-600">
                Monitor application status and receive notifications at each
                stage
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Multi-level Review
              </h3>
              <p className="text-gray-600">
                Structured review process involving department, faculty, and
                senate levels
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Compliant
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security with role-based access control
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Document Management
              </h3>
              <p className="text-gray-600">
                Centralized storage and management of all promotion-related
                documents
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Collaborative Workflow
              </h3>
              <p className="text-gray-600">
                Seamless collaboration between all stakeholders in the promotion
                process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A streamlined process from application submission to final
              decision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Submit Application
              </h3>
              <p className="text-gray-600">
                Academic staff submit their promotion applications online
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Department Review
              </h3>
              <p className="text-gray-600">
                Department heads review and provide recommendations
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Faculty Evaluation
              </h3>
              <p className="text-gray-600">
                Faculty committees conduct thorough evaluations
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Final Decision
              </h3>
              <p className="text-gray-600">
                Senate makes the final promotion decision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Expected Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transforming academic career advancement at SUZA through digital
              innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">75%</h3>
              <p className="text-gray-600">Reduction in processing time</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Digital documentation</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">90%</h3>
              <p className="text-gray-600">Improved transparency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}