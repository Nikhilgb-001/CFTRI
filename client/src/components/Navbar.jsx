// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow p-4">
//       <div className="container mx-auto flex justify-between">
//         <Link to="/" className="font-bold">
//           CFTRI
//         </Link>
//         <div>
//           <Link to="/login/user" className="mr-4">
//             User Login
//           </Link>
//           <Link to="/login/admin" className="mr-4">
//             Admin Login
//           </Link>
//           <Link to="/login/coordinator">Coordinator Login</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  LogIn,
  User,
  Shield,
  UserCog,
  Bookmark,
  FlaskConical,
  Projector,
  Camera,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Home Link */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            {/* <FlaskConical className="h-8 w-8" /> */}
            <img
              src="https://cftri.res.in/assets/user/images/Logo.png"
              alt="CFTRI Logo"
              className="h-8 w-full"
            />
            {/* <span className="text-xl font-bold hidden sm:inline-block">
              CFTRI
            </span> */}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              to="/login/user"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">User Login</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Camera className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">User Profile</span>
            </Link>

            {/* <Link
              to="/login/admin"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Admin Login</span>
            </Link> */}

            {/* <Link
              to="/login/coordinator"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <UserCog className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Coordinator Login</span>
            </Link> */}

            {/* Optional: Add other navigation items */}
            <Link
              to="/about"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
