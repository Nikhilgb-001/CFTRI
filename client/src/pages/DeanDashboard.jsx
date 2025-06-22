import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  Mail,
  Clipboard,
  Loader2,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  FileText,
  ArrowRight,
  Calendar,
  FileBarChart2,
  Printer,
  Download,
  Users,
  CheckCircle,
  Clock,
  Settings,
  PieChart,
  BarChart2,
  FileSpreadsheet,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";

const DeanDashboard = () => {
  const [dean, setDean] = useState(null);
  const [coords, setCoords] = useState([]);
  const [usersByCoord, setUsersByCoord] = useState({});
  const [assignedUsers, setAssignedUsers] = useState([]);

  const [newCoord, setNewCoord] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [expandedCoordinator, setExpandedCoordinator] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTab, setSelectedTab] = useState("coordinators");
  const [selectedFlows, setSelectedFlows] = useState([]);
  const [flows, setFlows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [flowSteps, setFlowSteps] = useState({
    paymentReceived: "",
    userId: "",
    paymentReceivedDetails: "",
    entryIntoAMS: "",
    entryIntoAMSDetails: "",
    draftAgreement: "",
    draftAgreementDetails: "",
    dasian: "",
    dasianDetails: "",
    demonstrate: "",
    demonstrateDetails: "",
    certificateGeneration: "",
    certificateGenerationDetails: "",
    member: "",
    memberDetails: "",
    licenseDetails: "",
    licenseDetailsDetails: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Fetch dean profile
      const { data: deanData } = await axios.get(
        "http://localhost:5000/auth/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDean(deanData);

      // Fetch coordinators
      const { data: coordinators } = await axios.get(
        "http://localhost:5000/coordinator/coordinators",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCoords(coordinators);
      setUsersByCoord({});

      // Fetch users for each coordinator
      const usersPromises = coordinators.map((c) =>
        axios.get(
          `http://localhost:5000/coordinator/users?coordinatorId=${c._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );
      const usersResults = await Promise.all(usersPromises);
      const usersData = {};
      coordinators.forEach((c, i) => {
        usersData[c._id] = usersResults[i].data;
      });
      setUsersByCoord(usersData);
      // setAssignedUsers(usersData[deanData._id] || []);

      // Fetch tech transfer flows if on that tab
      if (selectedTab === "techTransfer" || selectedTab === "annualReports") {
        const { data: flowsData } = await axios.get(
          "http://localhost:5000/coordinator/tech-transfer-flow",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("🚀 flowsData:", flowsData);
        setFlows(flowsData);

        const { data: usersData } = await axios.get(
          "http://localhost:5000/api/dean/assigned-users",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAllUsers(usersData);
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
      setIsLoading(false);
    }
  }, [token, selectedTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleFlowSelection = (id) => {
    setSelectedFlows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const fetchAssignedUsers = useCallback(async () => {
    if (!dean) return;
    try {
      const { data } = await axios.get(
        "http://localhost:5000/admin/dean/processed-users",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignedUsers(data);
    } catch (err) {
      console.error("couldn’t fetch assigned users", err);
      toast.error("Could not load your assigned users");
    }
  }, [dean, token]);

  useEffect(() => {
    if (selectedTab === "assignedUsers") {
      fetchAssignedUsers();
    }
  }, [selectedTab, fetchAssignedUsers]);

  const generateTechTransferReport = async () => {
    if (selectedFlows.length === 0) {
      toast.error("Please select at least one process flow.");
      return;
    }
    try {
      const res = await axios.get(
        "http://localhost:5000/coordinator/tech-transfer-report",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { flowIds: selectedFlows.join(",") },
          responseType: "blob",
        }
      );
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "tech-transfer-report.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Report downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate report");
    }
  };

  // Handle new coordinator form
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewCoord((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/coordinator/coordinators",
        newCoord,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Coordinator created successfully!");
      setNewCoord({ name: "", email: "", contact: "", password: "" });
      setIsCreating(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Creation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coordinator?"))
      return;
    try {
      await axios.delete(
        `http://localhost:5000/coordinator/coordinators/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Coordinator deleted successfully");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Deletion failed");
    }
  };

  const toggleCoordinator = (id) => {
    setExpandedCoordinator(expandedCoordinator === id ? null : id);
  };

  // Tech Transfer Flow handlers
  const handleFlowChange = (e) => {
    const { name, value } = e.target;
    setFlowSteps((prev) => ({ ...prev, [name]: value }));
  };

  const handleFlowSubmit = async (e) => {
    e.preventDefault();
    if (!flowSteps.userId) {
      toast.error("Please select a user");
      return;
    }

    try {
      const rawSteps = [
        {
          name: "Payment Received",
          date: flowSteps.paymentReceived,
          details: flowSteps.paymentReceivedDetails,
        },
        {
          name: "Entry into AMS",
          date: flowSteps.entryIntoAMS,
          details: flowSteps.entryIntoAMSDetails,
        },
        {
          name: "Draft Agreement",
          date: flowSteps.draftAgreement,
          details: flowSteps.draftAgreementDetails,
        },
        {
          name: "Dasian",
          date: flowSteps.dasian,
          details: flowSteps.dasianDetails,
        },
        {
          name: "Demonstrate",
          date: flowSteps.demonstrate,
          details: flowSteps.demonstrateDetails,
        },
        {
          name: "Demonstration & Certificate Generation",
          date: flowSteps.certificateGeneration,
          details: flowSteps.certificateGenerationDetails,
        },
        // {
        //   name: "Member",
        //   date: flowSteps.member || new Date(),
        //   details: flowSteps.memberDetails,
        // },
        // {
        //   name: "License Details",
        //   date: flowSteps.licenseDetails || new Date(),
        //   details: flowSteps.licenseDetailsDetails,
        // },
        {
          name: "Member",
          date: flowSteps.member,
          details: flowSteps.memberDetails,
        },
        {
          name: "License Details",
          date: flowSteps.licenseDetails,
          details: flowSteps.licenseDetailsDetails,
        },
      ];

      const steps = rawSteps.filter((step) => step.date || step.details);

      if (steps.length === 0) {
        toast.error("Please enter at least one date or detail before saving.");
        return;
      }

      await axios.post(
        "http://localhost:5000/coordinator/tech-transfer-flow",
        {
          userId: flowSteps.userId,
          steps,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Technology transfer flow saved successfully!");
      setFlowSteps({
        paymentReceived: "",
        paymentReceivedDetails: "",
        entryIntoAMS: "",
        entryIntoAMSDetails: "",
        draftAgreement: "",
        draftAgreementDetails: "",
        dasian: "",
        dasianDetails: "",
        demonstrate: "",
        demonstrateDetails: "",
        certificateGeneration: "",
        certificateGenerationDetails: "",
      });
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save technology transfer flow");
    }
  };

  // Annual Report generation
  const generateAnnualReport = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/coordinator/annual-report",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "annual-report.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Annual report downloaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate annual report");
    }
  };

  if (isLoading || !dean) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
                Welcome back, TT Coordinator
              </h1>
              <div className="flex items-center text-gray-600">
                <h2 className="text-lg font-semibold text-gray-700 mr-3">
                  {dean.name}
                </h2>
                <span className="hidden md:inline-flex items-center text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs">
                  <Mail className="mr-1 h-3 w-3" />
                  {dean.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Users className="text-indigo-600 h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Coordinators
                </p>
                <p className="text-xl font-bold text-indigo-600">
                  {coords.length}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="text-green-600 h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Active Flows
                </p>
                <p className="text-xl font-bold text-green-600">
                  {flows.length}
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
            { id: "coordinators", label: "Coordinators", icon: Users },
            { id: "assignedUsers", label: "Assigned Users", icon: Users },
            { id: "techTransfer", label: "Tech Transfer", icon: Settings },
            { id: "annualReports", label: "Analytics", icon: BarChart2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                selectedTab === tab.id
                  ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
              {tab.id === "coordinators" && (
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {coords.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="space-y-6">
        {/* Coordinators Tab */}
        {selectedTab === "coordinators" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header with search and create */}
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Coordinator Management
                </h2>
                <p className="text-sm text-gray-500">
                  Manage and oversee all coordinators
                </p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search coordinators..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
                <button
                  onClick={() => setIsCreating(!isCreating)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center whitespace-nowrap"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Coordinator
                </button>
              </div>
            </div>

            {/* Create Coordinator Section */}
            {isCreating && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Create New Coordinator
                  </h3>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ChevronUp className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["name", "email", "contact", "password"].map((field) => (
                      <div key={field} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                          {field === "password" && (
                            <span className="text-red-500"> *</span>
                          )}
                        </label>
                        <input
                          type={field === "password" ? "password" : "text"}
                          name={field}
                          value={newCoord[field]}
                          onChange={handleNewChange}
                          required={field === "password"}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                          placeholder={`Enter ${field
                            .replace(/([A-Z])/g, " $1")
                            .toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Create Coordinator
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Coordinators List */}
            <div className="divide-y divide-gray-200">
              {coords.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    No Coordinators Found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Get started by adding your first coordinator
                  </p>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Coordinator
                  </button>
                </div>
              ) : (
                coords.map((coord) => {
                  const users = usersByCoord[coord._id] || [];
                  const pendingCount = users.filter(
                    (u) => u.taskStatus === "Pending"
                  ).length;
                  const completedCount = users.filter(
                    (u) => u.taskStatus === "Completed"
                  ).length;
                  const isExpanded = expandedCoordinator === coord._id;

                  return (
                    <div
                      key={coord._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => toggleCoordinator(coord._id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-xl">
                              <User className="text-indigo-600 h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {coord.name}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="text-gray-600 text-sm flex items-center bg-gray-100 px-2 py-0.5 rounded-full">
                                  <Mail className="mr-1 h-3 w-3" />
                                  {coord.email}
                                </span>
                                {coord.contact && (
                                  <span className="text-gray-600 text-sm flex items-center bg-gray-100 px-2 py-0.5 rounded-full">
                                    {coord.contact}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-3">
                              <div className="text-center px-3 py-1 bg-gray-100 rounded-lg">
                                <p className="text-xs text-gray-500">Users</p>
                                <p className="font-bold text-gray-800">
                                  {users.length}
                                </p>
                              </div>
                              <div className="text-center px-3 py-1 bg-yellow-100 rounded-lg">
                                <p className="text-xs text-yellow-800">
                                  Pending
                                </p>
                                <p className="font-bold text-yellow-800">
                                  {pendingCount}
                                </p>
                              </div>
                              <div className="text-center px-3 py-1 bg-green-100 rounded-lg">
                                <p className="text-xs text-green-800">
                                  Completed
                                </p>
                                <p className="font-bold text-green-800">
                                  {completedCount}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(coord._id);
                                }}
                                className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                title="Delete coordinator"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                <MoreVertical className="h-5 w-5" />
                              </button>
                              {isExpanded ? (
                                <ChevronUp className="text-gray-500 h-5 w-5" />
                              ) : (
                                <ChevronDown className="text-gray-500 h-5 w-5" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 bg-gray-50 border-t">
                          {/* Mobile Stats */}
                          <div className="md:hidden grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-white p-3 rounded-lg shadow-xs text-center border border-gray-200">
                              <p className="text-xs text-gray-500">Users</p>
                              <p className="font-bold text-gray-800">
                                {users.length}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-xs text-center border border-gray-200">
                              <p className="text-xs text-yellow-600">Pending</p>
                              <p className="font-bold text-yellow-600">
                                {pendingCount}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-xs text-center border border-gray-200">
                              <p className="text-xs text-green-600">
                                Completed
                              </p>
                              <p className="font-bold text-green-600">
                                {completedCount}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <h4 className="font-medium text-gray-800 flex items-center mb-3">
                                <Clipboard className="mr-2 text-gray-500" />
                                Assigned Users & Tasks
                              </h4>
                              {users.length > 0 ? (
                                <div className="overflow-x-auto rounded-lg border border-gray-200">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                      <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Task
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {users.map((u) => (
                                        <tr
                                          key={u._id}
                                          className="hover:bg-gray-50"
                                        >
                                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {u.name}
                                          </td>
                                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {u.email}
                                          </td>
                                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {u.assignedTask || "—"}
                                          </td>
                                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <span
                                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                u.taskStatus === "Completed"
                                                  ? "bg-green-100 text-green-800"
                                                  : "bg-yellow-100 text-yellow-800"
                                              }`}
                                            >
                                              {u.taskStatus}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 text-center">
                                  <p className="text-gray-500">
                                    No users assigned to this coordinator yet.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {selectedTab === "assignedUsers" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Your Assigned Users
                  </h2>
                  <p className="text-gray-500">
                    Users assigned to you for processing
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </button>
                </div>
              </div>

              {assignedUsers.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center">
                  <Users className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                  <h4 className="text-gray-700 font-medium mb-1">
                    No users assigned to you yet
                  </h4>
                  <p className="text-gray-500">
                    Users will appear here once assigned by the admin
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assignedUsers.map((user) => (
                    <div
                      key={user._id}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors shadow-xs"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-100 p-3 rounded-full">
                          <User className="text-indigo-600 h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            {user.name}
                          </h3>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="w-24 text-gray-500">
                                Contact:
                              </span>
                              <span>{user.contact || "Not provided"}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="w-24 text-gray-500">
                                Coordinator:
                              </span>
                              <span>
                                {user.onboarding?.details?.coordinator?.name ||
                                  "Not assigned"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tech Transfer Flow Tab */}
        {selectedTab === "techTransfer" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Technology Transfer Process
                  </h2>
                  <p className="text-gray-500">
                    Track and manage technology transfer workflows
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                      value={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Flow Form */}
              <form onSubmit={handleFlowSubmit} className="mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign to user
                  </label>
                  <select
                    name="userId"
                    value={flowSteps.userId}
                    onChange={handleFlowChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  >
                    <option value="">— select user —</option>
                    {allUsers.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Payment Received",
                      key: "paymentReceived",
                      description: "Initial payment confirmation",
                      icon: "💰",
                    },
                    {
                      label: "Entry into AMS",
                      key: "entryIntoAMS",
                      description: "System registration process",
                      icon: "📥",
                    },
                    {
                      label: "Draft Agreement",
                      key: "draftAgreement",
                      description: "Contract preparation stage",
                      icon: "📝",
                    },
                    {
                      label: "Dasian",
                      key: "dasian",
                      description: "Technical evaluation phase",
                      icon: "🔍",
                    },
                    {
                      label: "Demonstrate",
                      key: "demonstrate",
                      description: "Product demonstration",
                      icon: "🖥️",
                    },
                    {
                      label: "Certificate Generation",
                      key: "certificateGeneration",
                      description: "Final documentation",
                      icon: "📜",
                    },
                    {
                      label: "Member",
                      key: "member",
                      description: "Membership verification",
                      icon: "👤",
                    },
                    {
                      label: "License Details",
                      key: "licenseDetails",
                      description: "License and documentation check",
                      icon: "📋",
                    },
                  ].map(({ label, key, description, icon }) => (
                    <div
                      key={key}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors shadow-xs"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">{icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-800">{label}</h3>
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            name={key}
                            value={flowSteps[key]}
                            onChange={handleFlowChange}
                            // required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Details
                          </label>
                          <textarea
                            name={`${key}Details`}
                            value={flowSteps[`${key}Details`]}
                            onChange={handleFlowChange}
                            placeholder="Enter details..."
                            rows="2"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Save Process Flow
                  </button>
                </div>
              </form>

              {/* Existing Flows */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Recent Process Flows
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search flows..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                {flows.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center">
                    <FileText className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <h4 className="text-gray-700 font-medium mb-1">
                      No technology transfer flows
                    </h4>
                    <p className="text-gray-500">
                      Create your first process flow to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {flows.map((flow) => {
                      const user = allUsers.find((u) => u._id === flow.user);
                      return (
                        <div
                          key={flow._id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-sm transition-shadow"
                        >
                          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                Process Flow -{" "}
                                {new Date(flow.createdAt).toLocaleDateString()}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Created at{" "}
                                {new Date(flow.createdAt).toDateString()}
                              </p>
                              {user ? (
                                <p className="text-sm text-gray-600 mt-1">
                                  Assigned to:{" "}
                                  <span className="font-medium text-indigo-600">
                                    {user.name}
                                  </span>
                                </p>
                              ) : (
                                <p className="text-sm text-gray-600 mt-1">
                                  Assigned to: <em>Unknown user</em>
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleFlowSelection(flow._id)}
                                className={`p-2 rounded-lg ${
                                  selectedFlows.includes(flow._id)
                                    ? "bg-indigo-100 text-indigo-600"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                                title="Select for report"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Step
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Details
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {flow.steps.map((step) => (
                                  <tr
                                    key={step.name}
                                    className="hover:bg-gray-50"
                                  >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {step.name}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                      {step.date
                                        ? new Date(
                                            step.date
                                          ).toLocaleDateString()
                                        : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                      {step.details || "—"}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          step.date
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                      >
                                        {step.date ? "Completed" : "Pending"}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === "annualReports" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Analytics & Reports
                  </h2>
                  <p className="text-gray-500">
                    Generate comprehensive reports and view analytics
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={generateAnnualReport}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Excel
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Report
                  </button>
                </div>
              </div>

              {/* Report Generator */}
              <div className="bg-indigo-50 rounded-lg border border-indigo-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-indigo-800 mb-2">
                      Generate Custom Report
                    </h3>
                    <p className="text-indigo-600 mb-4">
                      Select process flows to include in your report
                    </p>
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {flows.length > 0 ? (
                        flows.map((flow) => (
                          <label
                            key={flow._id}
                            className="flex items-center space-x-2 text-gray-700 hover:bg-gray-50 p-2 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={selectedFlows.includes(flow._id)}
                              onChange={() => toggleFlowSelection(flow._id)}
                              className="form-checkbox h-4 w-4 text-indigo-600"
                            />
                            <span>
                              Flow from{" "}
                              {new Date(flow.createdAt).toLocaleDateString()}
                            </span>
                          </label>
                        ))
                      ) : (
                        <p className="text-gray-500 col-span-2 p-2">
                          No process flows available.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
                    <FileSpreadsheet className="h-12 w-12 text-indigo-600 mb-3" />
                    <button
                      onClick={generateTechTransferReport}
                      disabled={selectedFlows.length === 0}
                      className={`px-6 py-2 rounded-lg flex items-center ${
                        selectedFlows.length > 0
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      {selectedFlows.length} flow(s) selected
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                        Total Coordinators
                      </p>
                      <p className="text-2xl font-bold text-indigo-600 mt-1">
                        {coords.length}
                      </p>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Users className="text-indigo-600 h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Last added:{" "}
                      {coords.length > 0
                        ? new Date(
                            coords[coords.length - 1].createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                        Completed Tasks
                      </p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {Object.values(usersByCoord).reduce(
                          (total, users) =>
                            total +
                            users.filter((u) => u.taskStatus === "Completed")
                              .length,
                          0
                        )}
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="text-green-600 h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      {(
                        (Object.values(usersByCoord).reduce(
                          (total, users) =>
                            total +
                            users.filter((u) => u.taskStatus === "Completed")
                              .length,
                          0
                        ) /
                          Math.max(
                            1,
                            Object.values(usersByCoord).reduce(
                              (total, users) => total + users.length,
                              0
                            )
                          )) *
                        100
                      ).toFixed(0)}
                      % completion rate
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                        Active Processes
                      </p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {flows.length}
                      </p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <PieChart className="text-blue-600 h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Last updated:{" "}
                      {flows.length > 0
                        ? new Date(
                            flows[flows.length - 1].updatedAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="font-medium text-gray-800 mb-4">
                  Recent Activity
                </h4>
                <div className="space-y-4">
                  {flows.slice(0, 3).map((flow) => (
                    <div
                      key={flow._id}
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-800">
                            Process Flow Updated
                          </h5>
                          <p className="text-sm text-gray-500">
                            {new Date(flow.updatedAt).toLocaleString()}
                          </p>
                        </div>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                          {flow.steps.filter((s) => s.date).length}/
                          {flow.steps.length} steps completed
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (flow.steps.filter((s) => s.date).length /
                                  flow.steps.length) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeanDashboard;
