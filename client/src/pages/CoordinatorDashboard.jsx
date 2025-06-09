import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LayoutDashboard,
  Settings,
  User,
  Mail,
  Clipboard,
  Edit,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Clock,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Plus,
  Save,
  ArrowLeft,
  Download,
  BarChart2,
  FileText,
  Calendar,
  CreditCard,
  ClipboardCheck,
  Printer,
  Users,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CoordinatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [actionLogFilter, setActionLogFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    assignedTask: "",
  });

  const [expandedUsers, setExpandedUsers] = useState({});
  const [assignTaskData, setAssignTaskData] = useState({
    userId: null,
    task: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  });

  const token = localStorage.getItem("token");

  const [techFlow, setTechFlow] = useState([
    { step: "Payment Received", date: new Date(), details: "" },
    { step: "Entry into AMS (within 1 week)", date: new Date(), details: "" },
    { step: "Draft Agreement", date: new Date(), details: "" },
    { step: "Dasian", date: new Date(), details: "" },
    { step: "Demonstrate", date: new Date(), details: "" },
    {
      step: "Demonstration & Certificate Generation",
      date: new Date(),
      details: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/coordinator/tech-transfer-flow",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.length > 0) {
          // grab the first (or whichever) coordinator doc
          const flows = data[0].flows || [];
          setTechFlow(
            flows.map((f) => ({
              step: f.step,
              // guard in case date is missing
              date: f.date ? new Date(f.date) : null,
              details: f.details || "",
            }))
          );
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token]);

  const handleSaveTechFlow = async () => {
    try {
      await axios.post(
        "http://localhost:5000/coordinator/tech-transfer-flow",
        { flows: techFlow },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Process flow saved!", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save flow", { autoClose: 3000 });
    }
  };

  const [actionLogs, setActionLogs] = useState([]);
  const [newActionLog, setNewActionLog] = useState({
    category: "Technology",
    actionType: "T.O (Technology Offer)",
    details: "",
    transactionId: "",
    // amount: { type: Number },
    amount: "",
    date: new Date(),
    userId: "",
  });

  const fetchStats = async () => {
    try {
      const statsRes = await axios.get(
        "http://localhost:5000/coordinator/stats",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(statsRes.data);
    } catch (err) {
      console.error("Failed to refresh stats", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, statsRes, logsRes] = await Promise.all([
          axios.get("http://localhost:5000/coordinator/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/coordinator/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/coordinator/action-logs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUsers(usersRes.data);
        setStats(statsRes.data);
        setActionLogs(logsRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch data", { autoClose: 3000 });
      }
    };
    fetchData();
  }, [token]);

  const toggleUserExpansion = (userId) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleStatusChange = (userId, currentStatus) => {
    setEditingStatus(userId);
    setUpdatedStatus(currentStatus);
  };

  const handleStatusUpdate = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/coordinator/users/${userId}/status`,
        { status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh both users and stats from backend
      const [usersRes, statsRes] = await Promise.all([
        axios.get("http://localhost:5000/coordinator/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/coordinator/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
      setEditingStatus(null);
      toast.success("Status updated successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status", { autoClose: 3000 });
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUserData({
      name: user.name,
      email: user.email,
      assignedTask: user.assignedTask || "",
    });
  };

  const handleInputChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (userId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/coordinator/users/${userId}`,
        editedUserData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? res.data : user))
      );
      setEditingUserId(null);
      toast.success("User updated successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user", { autoClose: 3000 });
    }
  };

  const handleAssignTask = (userId) => {
    setAssignTaskData({
      ...assignTaskData,
      userId,
    });
  };

  const handleTaskAssignment = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/coordinator/users/${assignTaskData.userId}/assign-task`,
        {
          task: assignTaskData.task,
          startDate: assignTaskData.startDate,
          endDate: assignTaskData.endDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === assignTaskData.userId ? res.data : u))
      );
      setAssignTaskData({
        userId: null,
        task: "",
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      toast.success("Task assigned successfully!", { autoClose: 2000 });
      await fetchStats();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || err.message || "Failed to assign task";
      toast.error(msg, { autoClose: 3000 });
    }
  };

  const handleActionLogChange = (e) => {
    const { name, value } = e.target;
    setNewActionLog((prev) => ({
      ...prev,
      // [name]: value,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const filteredLogs = actionLogFilter
    ? actionLogs.filter(
        (log) => log.userId && log.userId._id === actionLogFilter
      )
    : actionLogs;

  const handleActionLogSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/coordinator/action-log",
        newActionLog,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const savedLog = res.data;
      const fullUser = users.find((u) => u._id === savedLog.userId);

      // setActionLogs([res.data, ...actionLogs]);
      setActionLogs([
        { ...savedLog, userId: fullUser || savedLog.userId },
        ...actionLogs,
      ]);
      setNewActionLog({
        category: "Technology",
        actionType: "",
        details: "",
        transactionId: "",
        amount: "",
        date: new Date(),
      });

      toast.success("Action logged successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to log action", { autoClose: 3000 });
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/coordinator/report",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "coordinator-report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error("Failed to download report", { autoClose: 3000 });
    }
  };

  const downloadTechReport = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/coordinator/tech-transfer-report",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tech-transfer-report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error("Failed to download Tech-Transfer report", {
        autoClose: 3000,
      });
    }
  };

  const handlePrint = () => window.print();

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 mr-1 text-yellow-500" />;
      case "In Progress":
        return <RefreshCw className="h-4 w-4 mr-1 text-blue-500" />;
      case "Completed":
        return <CheckCircle className="h-4 w-4 mr-1 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 mr-1 text-gray-500" />;
    }
  };

  const actionTypes = {
    Technology: [
      "T.O (Technology Offer)",
      "Consultation",
      "Payment Received",
      "Additional Steps",
    ],
    Project: [
      "Consultation",
      "Reach out to R&D",
      "Coordinate meeting",
      "Project Proposal Creation",
      "Payment Received",
    ],
  };

  const [visibleUsers, setVisibleUsers] = useState(10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Header Section */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
              <User className="text-indigo-600 h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                Welcome back, Coordinator
              </h1>
              <div className="flex items-center text-gray-600"></div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Users className="text-indigo-600 h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Enquirers
                </p>
                <p className="text-xl font-bold text-indigo-600">
                  {stats?.userCount || 0}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="text-green-600 h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Tasks Completed
                </p>
                <p className="text-xl font-bold text-green-600">
                  {stats?.taskStats?.completed || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-1 w-full">
        <div className="flex overflow-x-auto">
          {[
            {
              id: "dashboard",
              label: "Dashboard",
              icon: LayoutDashboard,
            },
            {
              id: "actions",
              label: "Actions Log",
              icon: ClipboardCheck,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
              {tab.id === "dashboard" && (
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {stats?.userCount || 0}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="space-y-6">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-shadow flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Monthly ECF
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    INR {stats?.monthlyEMF?.toLocaleString() || 0}
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <FileText className="text-red-600 h-5 w-5" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-shadow flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Yearly ECF
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    INR {stats?.yearlyEMF?.toLocaleString() || 0}
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <FileText className="text-red-600 h-5 w-5" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-shadow flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Tasks Completed
                  </p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">
                    {stats?.taskStats?.completed || 0}/{stats?.userCount || 0}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <FileText className="text-orange-600 h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Task Status Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clipboard className="h-5 w-5 mr-2 text-blue-600" />
                Task Status Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                    <h3 className="font-medium">Pending</h3>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {stats?.taskStats?.pending || 0}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 mr-2 text-blue-600" />
                    <h3 className="font-medium">In Progress</h3>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {stats?.taskStats?.inProgress || 0}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    <h3 className="font-medium">Completed</h3>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {stats?.taskStats?.completed || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Report Download */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Annual Report
                </h2>
                <button
                  onClick={downloadReport}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Excel
                </button>
              </div>
            </div>

            {/* User List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-xl font-semibold p-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Enquirers
              </h2>
              {users.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No users assigned to you yet</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-gray-200">
                    {users.slice(0, visibleUsers).map((user) => (
                      <div
                        key={user._id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleUserExpansion(user._id)}
                        >
                          <div className="flex items-center">
                            <User className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <h3 className="font-semibold">{user.name}</h3>
                              <p className="text-sm text-gray-600">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                                user.taskStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : user.taskStatus === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {getStatusIcon(user.taskStatus)}
                              {user.taskStatus}
                            </span>
                            {expandedUsers[user._id] ? (
                              <ChevronDown className="h-5 w-5 ml-3 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-5 w-5 ml-3 text-gray-500" />
                            )}
                          </div>
                        </div>

                        {expandedUsers[user._id] && (
                          <div className="mt-4 pl-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-start">
                                <Mail className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Contact
                                  </p>
                                  <p className="text-gray-800">
                                    {user.contact || "Not provided"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <Clipboard className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Business Scale
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.projectMode ===
                                    "collaborative"
                                      ? "Collaborative Project"
                                      : user.onboarding?.details
                                          ?.projectMode === "transfer"
                                      ? "Technology Transfer"
                                      : "Not provided"}
                                  </p>
                                </div>
                              </div>

                              {/* Show Collaborative Focus Areas if collaborative */}
                              {user.onboarding?.details?.projectMode ===
                                "collaborative" && (
                                <div className="flex items-start md:col-span-2">
                                  <Clipboard className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">
                                      Collaborative Focus Areas
                                    </p>
                                    <p className="text-gray-800">
                                      {user.onboarding?.details
                                        ?.collaborativeOptions &&
                                      user.onboarding.details
                                        .collaborativeOptions.length > 0
                                        ? user.onboarding.details.collaborativeOptions.join(
                                            ", "
                                          )
                                        : "Not provided"}
                                      {user.onboarding?.details
                                        ?.collaborativeOther
                                        ? `, ${user.onboarding.details.collaborativeOther}`
                                        : ""}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Show Topic of Interest and Specific Option if transfer */}
                              {user.onboarding?.details?.projectMode ===
                                "transfer" && (
                                <>
                                  <div className="flex items-start">
                                    <Clipboard className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">
                                        Topic of Interest
                                      </p>
                                      <p className="text-gray-800">
                                        {user.onboarding?.details
                                          ?.discussionMatter || "Not provided"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <Clipboard className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">
                                        Specific Option
                                      </p>
                                      <p className="text-gray-800">
                                        {user.onboarding?.details
                                          ?.specificOption || "Not provided"}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}

                              <div className="flex items-start">
                                <Clipboard className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Type
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.type ||
                                      "Not provided"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <Clipboard className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Category
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.category ||
                                      "Not provided"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* Task Dates - bring below user details */}
                            {user.taskStartDate && (
                              <div className="flex items-start mb-4">
                                <Calendar className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Task Dates
                                  </p>
                                  <p className="text-gray-800">
                                    {new Date(
                                      user.taskStartDate
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                      user.taskEndDate
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            )}
                            {/* Actions */}
                            <div className="flex space-x-2">
                              {editingStatus === user._id ? (
                                <div className="flex items-center space-x-2">
                                  <select
                                    value={updatedStatus}
                                    onChange={(e) =>
                                      setUpdatedStatus(e.target.value)
                                    }
                                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">
                                      In Progress
                                    </option>
                                    <option value="Completed">Completed</option>
                                  </select>
                                  <button
                                    onClick={() => handleStatusUpdate(user._id)}
                                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center"
                                  >
                                    <Save className="h-4 w-4 mr-1" />
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingStatus(null)}
                                    className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 flex items-center"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      user._id,
                                      user.taskStatus
                                    )
                                  }
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Update Status
                                </button>
                              )}
                            </div>
                            {!user.processed ? (
                              <button
                                onClick={async () => {
                                  try {
                                    await axios.put(
                                      `http://localhost:5000/coordinator/users/${user._id}/process-completed`,
                                      {},
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    );
                                    toast.success(
                                      "User marked as Process Completed"
                                    );
                                    // refresh users or update state locally:
                                    setUsers((us) =>
                                      us.map((u) =>
                                        u._id === user._id
                                          ? { ...u, processed: true }
                                          : u
                                      )
                                    );
                                  } catch (err) {
                                    toast.error("Failed to mark completed");
                                  }
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                              >
                                Process Completed
                              </button>
                            ) : (
                              <span className="text-sm text-gray-500">
                                ✔ Process Completed
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {visibleUsers < users.length && (
                    <div className="text-center py-4">
                      <button
                        onClick={() => setVisibleUsers((v) => v + 10)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Load More
                      </button>
                      <p className="mt-2 text-sm text-gray-500">
                        Showing {Math.min(visibleUsers, users.length)} of{" "}
                        {users.length} users
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* Actions Log Tab */}
        {activeTab === "actions" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ClipboardCheck className="h-5 w-5 mr-2 text-blue-600" />
                Actions Log
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select User
                </label>
                <select
                  name="userId"
                  value={newActionLog.userId}
                  onChange={handleActionLogChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-3">Log New Action</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={newActionLog.category}
                      onChange={handleActionLogChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Project">Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Action Type
                    </label>
                    <select
                      name="actionType"
                      value={newActionLog.actionType}
                      onChange={handleActionLogChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      {actionTypes[newActionLog.category].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Details
                    </label>
                    <textarea
                      name="details"
                      value={newActionLog.details}
                      onChange={handleActionLogChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows="3"
                      placeholder="Enter details about this action..."
                    ></textarea>
                  </div>

                  {newActionLog.actionType === "Payment Received" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Transaction ID
                        </label>
                        <input
                          type="text"
                          name="transactionId"
                          value={newActionLog.transactionId}
                          onChange={handleActionLogChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="Enter transaction ID"
                        />
                      </div>

                      <div>
                        <label>Amount</label>
                        <input
                          type="number"
                          name="amount"
                          value={newActionLog.amount}
                          onChange={handleActionLogChange}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Enter amount"
                        />
                      </div>
                    </>
                  )}

                  {/* Date Picker shown for all action types */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <DatePicker
                      selected={newActionLog.date}
                      onChange={(date) =>
                        setNewActionLog({ ...newActionLog, date })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      minDate={new Date()} // Disable previous/past dates
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleActionLogSubmit}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Log Action
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Recent Actions</h3>
                {actionLogs.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No actions logged yet
                  </div>
                ) : (
                  <div className="space-y-3">
                    {actionLogs.map((log) => (
                      <div
                        key={log._id}
                        className="p-3 border border-gray-200 rounded-lg"
                      >
                        {/* top row: action, category, date */}
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-baseline space-x-2">
                            <span className="font-medium">
                              {log.actionType}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({log.category})
                            </span>
                            {log.userId && (
                              <span className="text-sm text-gray-700 ml-4">
                                <strong>User:</strong> {log.userId.name}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(log.date).toLocaleDateString()}
                          </div>
                        </div>

                        {/* details */}
                        {log.details && (
                          <p className="mt-1 text-sm text-gray-700">
                            {log.details}
                          </p>
                        )}

                        {/* transaction */}
                        {log.transactionId && (
                          <p className="mt-1 text-sm">
                            <span className="font-medium">Transaction ID:</span>{" "}
                            {log.transactionId}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoordinatorDashboard;
