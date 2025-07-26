import React from 'react';
import { CaseSensitive as University, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <University className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">SUZA</h3>
                <p className="text-sm text-gray-300">State University of Zanzibar</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Advancing academic excellence through innovative promotion management 
              and transparent evaluation processes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Promotion Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Academic Ranks
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Required Documents
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  P.O. Box 146, Zanzibar, Tanzania
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">+255 24 223 0740</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">info@suza.ac.tz</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">www.suza.ac.tz</span>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">System Info</h4>
            <div className="space-y-3 text-sm">
              <div className="text-gray-300">
                <p className="font-medium">Academic Promotion System</p>
                <p>Version 1.0.0</p>
              </div>
              <div className="text-gray-300">
                <p className="font-medium">Support Hours</p>
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
              </div>
              <div className="text-gray-300">
                <p className="font-medium">Technical Support</p>
                <p>promotion-support@suza.ac.tz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} State University of Zanzibar. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}