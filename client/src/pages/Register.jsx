import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  Mail,
  Smartphone,
  Lock,
  Check,
  ArrowRight,
  AlertCircle,
  Shield,
  UserCog,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

const Register = () => {
  const { role } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Role-specific styling
  const getRoleStyles = () => {
    switch (role) {
      case "admin":
        return {
          bgFrom: "from-red-50",
          bgTo: "to-orange-50",
          primary: "red",
          gradientFrom: "from-red-600",
          gradientTo: "to-orange-600",
          icon: <Shield className="h-6 w-6" />,
          roleName: "Administrator",
          description: "Create admin account with full system privileges",
        };
      case "coordinator":
        return {
          bgFrom: "from-emerald-50",
          bgTo: "to-teal-50",
          primary: "emerald",
          gradientFrom: "from-emerald-600",
          gradientTo: "to-teal-600",
          icon: <UserCog className="h-6 w-6" />,
          roleName: "Coordinator",
          description: "Register as an event coordinator",
        };
      default:
        return {
          bgFrom: "from-blue-50",
          bgTo: "to-indigo-50",
          primary: "blue",
          gradientFrom: "from-blue-600",
          gradientTo: "to-indigo-600",
          icon: <User className="h-6 w-6" />,
          roleName: "User",
          description: "Join our community with a personal account",
        };
    }
  };

  const {
    bgFrom,
    bgTo,
    primary,
    gradientFrom,
    gradientTo,
    icon,
    roleName,
    description,
  } = getRoleStyles();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 3000 });
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/auth/register/${role}`,
        formData
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Registration successful! Redirecting...", {
          autoClose: 1500,
          onClose: () => {
            if (role === "admin") navigate("/admin");
            else if (role === "coordinator") navigate("/coordinator");
            else navigate("/profile");
          },
        });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again.",
        { autoClose: 4000 }
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgFrom} ${bgTo} flex items-center justify-center p-4`}
    >
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Header with gradient */}
        <div
          className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-6 text-white`}
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-3`}
            >
              {React.cloneElement(icon, { className: `h-7 w-7 text-white` })}
            </div>
            <h1 className="text-2xl font-bold">{roleName} Registration</h1>
            <p className="text-sm opacity-90 mt-1">{description}</p>
          </div>
        </div>

        {/* Form section */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${primary}-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${primary}-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Contact field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone
                    className="h-5 w-5 text-gray-400"
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type="tel"
                  name="contact"
                  placeholder="+1 (123) 456-7890"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${primary}-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${primary}-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      className="h-5 w-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Check className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${primary}-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      className="h-5 w-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            {/* <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-6 bg-${primary}-600 text-white p-3 rounded-lg hover:bg-${primary}-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-${primary}-500 focus:ring-offset-2 flex items-center justify-center ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Creating Account...
                </>
              ) : (
                <>
                  Register Now <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button> */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center justify-center ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className={`font-medium text-${primary}-600 hover:text-${primary}-500 transition-colors duration-300`}
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
