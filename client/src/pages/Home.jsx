import React from "react";
import { Link } from "react-router-dom";
import {
  FlaskConical,
  ArrowRight,
  Users,
  Shield,
  UserCog,
  BookOpen,
  CalendarCheck,
  BarChart2,
  User, // Added the missing User icon import
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="bg-white p-4 rounded-full shadow-lg mb-6">
          {/* <FlaskConical className="h-12 w-12 text-blue-600" /> */}
          <img
            src="https://cftri.res.in/assets/user/images/Logo.png"
            alt="CFTRI Logo"
            className="h-8 w-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">CFTRI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Central Food Technological Research Institute - Your premier platform
          for food technology research and collaboration
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            to="/login/user"
            className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-blue-50"
          >
            <User className="h-5 w-5 mr-2 text-blue-600" />
            <span>User Login</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link
            to="/login/admin"
            className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-blue-50"
          >
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            <span>Admin Login</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link
            to="/login/coordinator"
            className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-blue-50"
          >
            <UserCog className="h-5 w-5 mr-2 text-blue-600" />
            <span>Coordinator Login</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-blue-600">Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Research Management
              </h3>
              <p className="text-gray-600">
                Comprehensive tools for managing all aspects of food technology
                research projects
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Tracking</h3>
              <p className="text-gray-600">
                Monitor project timelines and milestones with our intuitive
                tracking system
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-xl text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
              <p className="text-gray-600">
                Powerful analytics to derive insights from your food technology
                research data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            {/* <FlaskConical className="h-8 w-8 text-white" /> */}
            <img
            src="https://cftri.res.in/assets/user/images/Logo.png"
            alt="CFTRI Logo"
            className="h-8 w-auto"
          />
          </div>
          <p className="mb-2">Central Food Technological Research Institute</p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CFTRI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
