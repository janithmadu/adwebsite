import React from "react";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Bell,
  Users,
  Globe,
  Scale,
} from "lucide-react";

const Page = () => {
  return (
    <div>
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Shield className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Introduction */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Introduction
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We respect your privacy and are committed to protecting your
              personal data. This privacy policy will inform you about how we
              handle your personal information, your privacy rights, and how the
              law protects you.
            </p>
          </section>

          {/* Data Collection */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Information We Collect
              </h2>
            </div>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                <span>
                  Personal identification information (Name, email address,
                  phone number)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                <span>Usage data (How you interact with our services)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                <span>
                  Technical data (IP address, browser type, device information)
                </span>
              </li>
            </ul>
          </section>

          {/* Data Usage */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                How We Use Your Data
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Primary Uses</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>Providing and maintaining our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>Notifying you about changes to our service</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Secondary Uses</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>Improving customer service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>Analyzing usage patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Data Protection
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Lock className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">Encryption</h3>
                <p className="text-sm text-gray-600">
                  All data is encrypted during transmission
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">
                  Access Control
                </h3>
                <p className="text-sm text-gray-600">
                  Strict access controls for employee data access
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Bell className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">Monitoring</h3>
                <p className="text-sm text-gray-600">
                  24/7 security monitoring and alerts
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Rights
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  You have the right to:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>Access your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>Correct your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>Request deletion of your personal data</span>
                  </li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Contact Us</h3>
                <p className="text-gray-600 text-sm">
                  For any privacy-related questions or concerns, please contact
                  our Data Protection Officer at:
                  <br />
                  <br />
                  Email: info@q8arzaq.com
                  <br />
                  Phone: 96597397310+
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-4 h-4" />
              <span>Available in multiple languages</span>
            </div>
            <p>© {new Date().getFullYear()} Arzaq. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Page;
