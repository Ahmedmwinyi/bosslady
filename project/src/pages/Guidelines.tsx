import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  User,
  Award,
  BarChart2,
  Mail,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';

export default function Guidelines() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <div className="flex items-center space-x-4 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Academic Promotion Guidelines
            </h1>
          </div>
          <p className="text-gray-600">
            Comprehensive guide to the academic promotion process at State University of Zanzibar
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
              Introduction
            </h2>
            <div className="prose text-gray-700">
              <p>
                The academic promotion process at SUZA is designed to recognize and reward faculty members 
                who demonstrate excellence in teaching, research, and service. This guide provides detailed 
                information about the promotion process, requirements, and timelines.
              </p>
            </div>
          </div>

          {/* Promotion Process */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart2 className="w-5 h-5 text-blue-600 mr-2" />
              Promotion Process Overview
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Application Submission</h3>
                  <p className="text-gray-600 mt-1">
                    Faculty members submit their promotion application through the online portal, 
                    including all required supporting documents.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Departmental Review</h3>
                  <p className="text-gray-600 mt-1">
                    The Head of Department reviews the application and makes a recommendation 
                    to the Dean's office.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">School Level Review</h3>
                  <p className="text-gray-600 mt-1">
                    The Dean's office evaluates the application and makes a recommendation 
                    to the Deputy Vice Chancellor's office.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 font-medium">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">University Level Review</h3>
                  <p className="text-gray-600 mt-1">
                    The Deputy Vice Chancellor's office makes the final decision on the promotion.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 font-medium">5</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Notification</h3>
                  <p className="text-gray-600 mt-1">
                    The applicant is notified of the decision through the system and official channels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              Promotion Requirements
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  General Requirements
                </h3>
                <ul className="text-blue-800 space-y-2 pl-5 list-disc">
                  <li>Minimum years in current rank (varies by rank)</li>
                  <li>Clean disciplinary record</li>
                  <li>Satisfactory performance evaluations</li>
                  <li>Active participation in university activities</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentation Requirements
                </h3>
                <ul className="text-blue-800 space-y-2 pl-5 list-disc">
                  <li>Updated Curriculum Vitae (CV)</li>
                  <li>List of publications with evidence</li>
                  <li>Teaching evaluation reports (last 3 years)</li>
                  <li>Community service documentation</li>
                  <li>Letters of recommendation (minimum 2)</li>
                  <li>Research grants and projects documentation</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Specific Criteria by Rank
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800">To Senior Lecturer:</h4>
                    <ul className="text-blue-800 space-y-1 pl-5 list-disc">
                      <li>Minimum 4 years as Lecturer</li>
                      <li>At least 5 publications in peer-reviewed journals</li>
                      <li>Evidence of effective teaching</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">To Associate Professor:</h4>
                    <ul className="text-blue-800 space-y-1 pl-5 list-disc">
                      <li>Minimum 5 years as Senior Lecturer</li>
                      <li>At least 10 publications with 5 in reputable journals</li>
                      <li>Evidence of research leadership</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">To Professor:</h4>
                    <ul className="text-blue-800 space-y-1 pl-5 list-disc">
                      <li>Minimum 5 years as Associate Professor</li>
                      <li>At least 15 publications with significant impact</li>
                      <li>Demonstrated academic leadership</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              Promotion Timeline
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Annual Promotion Cycle</h3>
                <ul className="text-blue-800 space-y-2">
                  <li className="flex justify-between">
                    <span>Applications Open:</span>
                    <span className="font-medium">January 1 - January 31</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Departmental Review:</span>
                    <span className="font-medium">February 1 - February 28</span>
                  </li>
                  <li className="flex justify-between">
                    <span>School Review:</span>
                    <span className="font-medium">March 1 - March 31</span>
                  </li>
                  <li className="flex justify-between">
                    <span>University Review:</span>
                    <span className="font-medium">April 1 - April 30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Results Announcement:</span>
                    <span className="font-medium">May 15</span>
                  </li>
                </ul>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  Note: The timeline may vary slightly each year. Applicants will be notified of any changes.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="w-5 h-5 text-blue-600 mr-2" />
              Contact Information
            </h2>
            <div className="prose text-gray-700">
              <p>
                For questions about the promotion process, please contact:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  <strong>Promotion Office:</strong> promotion@suza.ac.tz
                </li>
                <li>
                  <strong>HR Department:</strong> hr@suza.ac.tz
                </li>
                <li>
                  <strong>DVC Academic Office:</strong> dvc-academic@suza.ac.tz
                </li>
              </ul>
              <p className="mt-4">
                Office hours: Monday to Friday, 8:00 AM to 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}