// // import React, { useEffect, useState, useCallback } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import {
// //   User,
// //   Mail,
// //   Clipboard,
// //   Loader2,
// //   Trash2,
// //   Plus,
// //   ChevronDown,
// //   ChevronUp,
// // } from "lucide-react";

// // const DeanDashboard = () => {
// //   const [dean, setDean] = useState(null);
// //   const [coords, setCoords] = useState([]);
// //   const [usersByCoord, setUsersByCoord] = useState({});
// //   const [newCoord, setNewCoord] = useState({
// //     name: "",
// //     email: "",
// //     contact: "",
// //     password: "",
// //   });
// //   const [expandedCoordinator, setExpandedCoordinator] = useState(null);
// //   const [isCreating, setIsCreating] = useState(false);
// //   const token = localStorage.getItem("token");

// //   // Fetch Dean profile and then all coordinators
// //   const fetchCoordinators = useCallback(async () => {
// //     try {
// //       // get dean profile
// //       const { data: deanData } = await axios.get(
// //         "http://localhost:5000/profile",
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setDean(deanData);

// //       // get all coordinators
// //       const { data: list } = await axios.get(
// //         "http://localhost:5000/coordinator/coordinators",
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setCoords(list);
// //       // reset user caches
// //       setUsersByCoord({});
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to load coordinators", { autoClose: 400 });
// //     }
// //   }, [token]);

// //   // On mount, load coordinators
// //   useEffect(() => {
// //     fetchCoordinators();
// //   }, [fetchCoordinators]);

// //   // For each coordinator, fetch their assigned users
// //   useEffect(() => {
// //     coords.forEach((c) => {
// //       axios
// //         .get(`http://localhost:5000/coordinator/users?coordinatorId=${c._id}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         .then((res) =>
// //           setUsersByCoord((prev) => ({ ...prev, [c._id]: res.data }))
// //         )
// //         .catch(console.error);
// //     });
// //   }, [coords, token]);

// //   // Handle new coordinator form changes
// //   const handleNewChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewCoord((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Create a coordinator
// //   const handleCreate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(
// //         "http://localhost:5000/coordinator/coordinators",
// //         newCoord,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Coordinator created successfully!");
// //       setNewCoord({ name: "", email: "", contact: "", password: "" });
// //       setIsCreating(false);
// //       fetchCoordinators();
// //     } catch (err) {
// //       console.error(err);
// //       toast.error(err.response?.data?.message || "Creation failed");
// //     }
// //   };

// //   // Delete a coordinator
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this coordinator?"))
// //       return;
// //     try {
// //       await axios.delete(
// //         `http://localhost:5000/coordinator/coordinators/${id}`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Coordinator deleted successfully");
// //       fetchCoordinators();
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Deletion failed");
// //     }
// //   };

// //   const toggleCoordinator = (id) => {
// //     setExpandedCoordinator(expandedCoordinator === id ? null : id);
// //   };

// //   if (!dean) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
// //         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
// //       <ToastContainer position="top-center" />

// //       {/* Header Section */}
// //       <header className="mb-8">
// //         <div className="flex justify-between items-start">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-800 mb-2">
// //               Dean Dashboard
// //             </h1>
// //             <div className="flex items-center text-gray-600">
// //               <div className="bg-blue-100 p-2 rounded-full mr-3">
// //                 <User className="text-blue-600" />
// //               </div>
// //               <div>
// //                 <h2 className="text-xl font-semibold text-gray-700">
// //                   {dean.name}
// //                 </h2>
// //                 <p className="text-gray-600 flex items-center">
// //                   <Mail className="mr-1 h-4 w-4" />
// //                   {dean.email}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="bg-white p-4 rounded-lg shadow-sm">
// //             <p className="text-gray-600">Total Coordinators</p>
// //             <p className="text-2xl font-bold text-blue-600">{coords.length}</p>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="space-y-6">
// //         {/* Create Coordinator Section */}
// //         <section className="bg-white rounded-xl shadow-sm overflow-hidden">
// //           <button
// //             onClick={() => setIsCreating(!isCreating)}
// //             className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
// //           >
// //             <h2 className="text-lg font-medium flex items-center">
// //               <Plus className="mr-2 text-green-600" />
// //               Add New Coordinator
// //             </h2>
// //             {isCreating ? <ChevronUp /> : <ChevronDown />}
// //           </button>

// //           {isCreating && (
// //             <div className="p-4 border-t">
// //               <form
// //                 onSubmit={handleCreate}
// //                 className="grid grid-cols-1 md:grid-cols-2 gap-4"
// //               >
// //                 {["name", "email", "contact", "password"].map((field) => (
// //                   <div key={field} className="space-y-1">
// //                     <label className="block text-sm font-medium text-gray-700">
// //                       {field.charAt(0).toUpperCase() + field.slice(1)}
// //                     </label>
// //                     <input
// //                       type={field === "password" ? "password" : "text"}
// //                       name={field}
// //                       value={newCoord[field]}
// //                       onChange={handleNewChange}
// //                       required
// //                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
// //                       placeholder={`Enter ${field}`}
// //                     />
// //                   </div>
// //                 ))}
// //                 <div className="md:col-span-2 flex justify-end space-x-3 pt-2">
// //                   <button
// //                     type="button"
// //                     onClick={() => setIsCreating(false)}
// //                     className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
// //                   >
// //                     <Plus className="mr-1 h-4 w-4" />
// //                     Create Coordinator
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           )}
// //         </section>

// //         {/* Coordinators List */}
// //         {coords.length === 0 ? (
// //           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
// //             <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
// //               <User className="text-gray-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-gray-700 mb-1">
// //               No Coordinators Found
// //             </h3>
// //             <p className="text-gray-500">
// //               Create your first coordinator to get started
// //             </p>
// //             <button
// //               onClick={() => setIsCreating(true)}
// //               className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
// //             >
// //               <Plus className="mr-1 h-4 w-4" />
// //               Add Coordinator
// //             </button>
// //           </div>
// //         ) : (
// //           <section className="space-y-4">
// //             <h2 className="text-xl font-semibold text-gray-800 px-2">
// //               Coordinators
// //             </h2>
// //             {coords.map((coord) => {
// //               const users = usersByCoord[coord._id] || [];
// //               const pendingCount = users.filter(
// //                 (u) => u.taskStatus === "Pending"
// //               ).length;
// //               const completedCount = users.filter(
// //                 (u) => u.taskStatus === "Completed"
// //               ).length;
// //               const isExpanded = expandedCoordinator === coord._id;

// //               return (
// //                 <div
// //                   key={coord._id}
// //                   className="bg-white rounded-xl shadow-sm overflow-hidden"
// //                 >
// //                   <div
// //                     className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
// //                     onClick={() => toggleCoordinator(coord._id)}
// //                   >
// //                     <div className="flex justify-between items-center">
// //                       <div className="flex items-center space-x-4">
// //                         <div className="bg-blue-100 p-3 rounded-full">
// //                           <User className="text-blue-600" />
// //                         </div>
// //                         <div>
// //                           <h3 className="font-semibold text-gray-800">
// //                             {coord.name}
// //                           </h3>
// //                           <p className="text-gray-600 text-sm flex items-center">
// //                             <Mail className="mr-1 h-4 w-4" />
// //                             {coord.email}
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center space-x-4">
// //                         <div className="hidden md:flex space-x-3">
// //                           <div className="text-center">
// //                             <p className="text-xs text-gray-500">Users</p>
// //                             <p className="font-bold">{users.length}</p>
// //                           </div>
// //                           <div className="text-center">
// //                             <p className="text-xs text-gray-500">Pending</p>
// //                             <p className="font-bold text-yellow-600">
// //                               {pendingCount}
// //                             </p>
// //                           </div>
// //                           <div className="text-center">
// //                             <p className="text-xs text-gray-500">Completed</p>
// //                             <p className="font-bold text-green-600">
// //                               {completedCount}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <button
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             handleDelete(coord._id);
// //                           }}
// //                           className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
// //                         >
// //                           <Trash2 className="h-5 w-5" />
// //                         </button>
// //                         {isExpanded ? <ChevronUp /> : <ChevronDown />}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {isExpanded && (
// //                     <div className="border-t p-4 bg-gray-50">
// //                       {/* Stats Cards - Mobile */}
// //                       <div className="md:hidden grid grid-cols-3 gap-3 mb-4">
// //                         <div className="bg-white p-3 rounded-lg shadow-xs text-center">
// //                           <p className="text-xs text-gray-500">Users</p>
// //                           <p className="font-bold">{users.length}</p>
// //                         </div>
// //                         <div className="bg-white p-3 rounded-lg shadow-xs text-center">
// //                           <p className="text-xs text-gray-500">Pending</p>
// //                           <p className="font-bold text-yellow-600">
// //                             {pendingCount}
// //                           </p>
// //                         </div>
// //                         <div className="bg-white p-3 rounded-lg shadow-xs text-center">
// //                           <p className="text-xs text-gray-500">Completed</p>
// //                           <p className="font-bold text-green-600">
// //                             {completedCount}
// //                           </p>
// //                         </div>
// //                       </div>

// //                       <div className="space-y-3">
// //                         <div className="flex items-center text-gray-700">
// //                           <Clipboard className="mr-2 text-gray-500" />
// //                           <h4 className="font-medium">Contact</h4>
// //                           <span className="ml-2 font-normal">
// //                             {coord.contact || "Not provided"}
// //                           </span>
// //                         </div>

// //                         <h4 className="font-medium text-gray-700 flex items-center">
// //                           <Clipboard className="mr-2 text-gray-500" />
// //                           Assigned Users & Tasks
// //                         </h4>
// //                         {users.length > 0 ? (
// //                           <div className="overflow-x-auto">
// //                             <table className="min-w-full divide-y divide-gray-200">
// //                               <thead className="bg-gray-100">
// //                                 <tr>
// //                                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                     Name
// //                                   </th>
// //                                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                     Email
// //                                   </th>
// //                                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                     Task
// //                                   </th>
// //                                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                     Status
// //                                   </th>
// //                                 </tr>
// //                               </thead>
// //                               <tbody className="bg-white divide-y divide-gray-200">
// //                                 {users.map((u) => (
// //                                   <tr key={u._id} className="hover:bg-gray-50">
// //                                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
// //                                       {u.name}
// //                                     </td>
// //                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
// //                                       {u.email}
// //                                     </td>
// //                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
// //                                       {u.assignedTask || "—"}
// //                                     </td>
// //                                     <td className="px-4 py-3 whitespace-nowrap text-sm">
// //                                       <span
// //                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                                           u.taskStatus === "Completed"
// //                                             ? "bg-green-100 text-green-800"
// //                                             : "bg-yellow-100 text-yellow-800"
// //                                         }`}
// //                                       >
// //                                         {u.taskStatus}
// //                                       </span>
// //                                     </td>
// //                                   </tr>
// //                                 ))}
// //                               </tbody>
// //                             </table>
// //                           </div>
// //                         ) : (
// //                           <div className="bg-white p-4 rounded-lg border border-dashed border-gray-300 text-center">
// //                             <p className="text-gray-500">
// //                               No users assigned to this coordinator yet.
// //                             </p>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </section>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default DeanDashboard;

// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   User,
//   Mail,
//   Clipboard,
//   Loader2,
//   Trash2,
//   Plus,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// const DeanDashboard = () => {
//   // Dean profile & coordinators
//   const [dean, setDean] = useState(null);
//   const [coords, setCoords] = useState([]);
//   const [usersByCoord, setUsersByCoord] = useState({});
//   const [newCoord, setNewCoord] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     password: "",
//   });
//   const [expandedCoordinator, setExpandedCoordinator] = useState(null);
//   const [isCreating, setIsCreating] = useState(false);

//   // Tabs
//   const [selectedTab, setSelectedTab] = useState("coordinators");

//   // Tech Transfer Flow state
//   const [flows, setFlows] = useState([]);
//   const [flowSteps, setFlowSteps] = useState({
//     paymentReceived: "",
//     paymentReceivedDetails: "",
//     entryIntoAMS: "",
//     entryIntoAMSDetails: "",
//     draftAgreement: "",
//     draftAgreementDetails: "",
//     dasian: "",
//     dasianDetails: "",
//     demonstrate: "",
//     demonstrateDetails: "",
//     certificateGeneration: "",
//     certificateGenerationDetails: "",
//   });

//   const token = localStorage.getItem("token");

//   // Fetch Dean + Coordinators
//   const fetchCoordinators = useCallback(async () => {
//     try {
//       const { data: deanData } = await axios.get(
//         "http://localhost:5000/profile",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setDean(deanData);

//       const { data: list } = await axios.get(
//         "http://localhost:5000/coordinator/coordinators",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCoords(list);
//       setUsersByCoord({});
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load coordinators", { autoClose: 400 });
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchCoordinators();
//   }, [fetchCoordinators]);

//   // Fetch users for each coordinator
//   useEffect(() => {
//     coords.forEach((c) => {
//       axios
//         .get(`http://localhost:5000/coordinator/users?coordinatorId=${c._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) =>
//           setUsersByCoord((prev) => ({ ...prev, [c._id]: res.data }))
//         )
//         .catch(console.error);
//     });
//   }, [coords, token]);

//   // Tech Transfer Flow: fetch existing
//   const fetchFlows = useCallback(async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:5000/coordinator/tech-transfer-flow",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setFlows(data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load Tech Transfer flows");
//     }
//   }, [token]);

//   useEffect(() => {
//     if (selectedTab === "techTransfer") {
//       fetchFlows();
//     }
//   }, [selectedTab, fetchFlows]);

//   // Handle new coordinator form
//   const handleNewChange = (e) => {
//     const { name, value } = e.target;
//     setNewCoord((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/coordinator/coordinators",
//         newCoord,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Coordinator created!");
//       setNewCoord({ name: "", email: "", contact: "", password: "" });
//       setIsCreating(false);
//       fetchCoordinators();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Creation failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this coordinator?")) return;
//     try {
//       await axios.delete(
//         `http://localhost:5000/coordinator/coordinators/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Deleted");
//       fetchCoordinators();
//     } catch {
//       toast.error("Deletion failed");
//     }
//   };

//   const toggleCoordinator = (id) =>
//     setExpandedCoordinator((prev) => (prev === id ? null : id));

//   // Tech Transfer Flow form handlers
//   const handleFlowChange = (e) => {
//     const { name, value } = e.target;
//     setFlowSteps((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFlowSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const steps = [
//         {
//           name: "Payment Received",
//           date: flowSteps.paymentReceived,
//           details: flowSteps.paymentReceivedDetails,
//         },
//         {
//           name: "Entry into AMS",
//           date: flowSteps.entryIntoAMS,
//           details: flowSteps.entryIntoAMSDetails,
//         },
//         {
//           name: "Draft Agreement",
//           date: flowSteps.draftAgreement,
//           details: flowSteps.draftAgreementDetails,
//         },
//         {
//           name: "Dasian",
//           date: flowSteps.dasian,
//           details: flowSteps.dasianDetails,
//         },
//         {
//           name: "Demonstrate",
//           date: flowSteps.demonstrate,
//           details: flowSteps.demonstrateDetails,
//         },
//         {
//           name: "Demonstration & Certificate Generation",
//           date: flowSteps.certificateGeneration,
//           details: flowSteps.certificateGenerationDetails,
//         },
//       ];

//       await axios.post(
//         "http://localhost:5000/coordinator/tech-transfer-flow",
//         { steps },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Flow saved!");
//       setFlowSteps({
//         paymentReceived: "",
//         paymentReceivedDetails: "",
//         entryIntoAMS: "",
//         entryIntoAMSDetails: "",
//         draftAgreement: "",
//         draftAgreementDetails: "",
//         dasian: "",
//         dasianDetails: "",
//         demonstrate: "",
//         demonstrateDetails: "",
//         certificateGeneration: "",
//         certificateGenerationDetails: "",
//       });
//       fetchFlows();
//     } catch {
//       toast.error("Save failed");
//     }
//   };

//   // Annual Report download + print
//   const generateAnnualReport = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/coordinator/annual-report",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           responseType: "blob",
//         }
//       );
//       const blob = new Blob([res.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = "annual-report.xlsx";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch {
//       toast.error("Report generation failed");
//     }
//   };

//   if (!dean) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
//         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
//       <ToastContainer position="top-center" />

//       {/* Header */}
//       <header className="mb-8">
//         <div className="flex justify-between items-start">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               Dean Dashboard
//             </h1>
//             <div className="flex items-center text-gray-600">
//               <div className="bg-blue-100 p-2 rounded-full mr-3">
//                 <User className="text-blue-600" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-700">
//                   {dean.name}
//                 </h2>
//                 <p className="text-gray-600 flex items-center">
//                   <Mail className="mr-1 h-4 w-4" />
//                   {dean.email}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-sm">
//             <p className="text-gray-600">Total Coordinators</p>
//             <p className="text-2xl font-bold text-blue-600">{coords.length}</p>
//           </div>
//         </div>
//       </header>

//       {/* Tabs */}
//       <div className="flex space-x-4 border-b mb-6">
//         <button
//           onClick={() => setSelectedTab("coordinators")}
//           className={`pb-2 ${
//             selectedTab === "coordinators"
//               ? "border-b-2 border-blue-600 text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           Coordinators
//         </button>
//         <button
//           onClick={() => setSelectedTab("techTransfer")}
//           className={`pb-2 ${
//             selectedTab === "techTransfer"
//               ? "border-b-2 border-blue-600 text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           Tech Transfer Flow
//         </button>
//         <button
//           onClick={() => setSelectedTab("annualReports")}
//           className={`pb-2 ${
//             selectedTab === "annualReports"
//               ? "border-b-2 border-blue-600 text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           Annual Reports
//         </button>
//       </div>

//       {/* Coordinators Tab */}
//       {selectedTab === "coordinators" && (
//         <main className="space-y-6">
//           {/* Create Coordinator */}
//           <section className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <button
//               onClick={() => setIsCreating(!isCreating)}
//               className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
//             >
//               <h2 className="text-lg font-medium flex items-center">
//                 <Plus className="mr-2 text-green-600" />
//                 Add New Coordinator
//               </h2>
//               {isCreating ? <ChevronUp /> : <ChevronDown />}
//             </button>

//             {isCreating && (
//               <div className="p-4 border-t">
//                 <form
//                   onSubmit={handleCreate}
//                   className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                 >
//                   {["name", "email", "contact", "password"].map((field) => (
//                     <div key={field} className="space-y-1">
//                       <label className="block text-sm font-medium text-gray-700">
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </label>
//                       <input
//                         type={field === "password" ? "password" : "text"}
//                         name={field}
//                         value={newCoord[field]}
//                         onChange={handleNewChange}
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition-all"
//                         placeholder={`Enter ${field}`}
//                       />
//                     </div>
//                   ))}
//                   <div className="md:col-span-2 flex justify-end space-x-3 pt-2">
//                     <button
//                       type="button"
//                       onClick={() => setIsCreating(false)}
//                       className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center"
//                     >
//                       <Plus className="mr-1 h-4 w-4" />
//                       Create Coordinator
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </section>

//           {/* Coordinators List */}
//           {coords.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//               <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                 <User className="text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-700 mb-1">
//                 No Coordinators Found
//               </h3>
//               <p className="text-gray-500">
//                 Create your first coordinator to get started
//               </p>
//               <button
//                 onClick={() => setIsCreating(true)}
//                 className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center mx-auto"
//               >
//                 <Plus className="mr-1 h-4 w-4" />
//                 Add Coordinator
//               </button>
//             </div>
//           ) : (
//             <section className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 px-2">
//                 Coordinators
//               </h2>
//               {coords.map((coord) => {
//                 const users = usersByCoord[coord._id] || [];
//                 const pendingCount = users.filter(
//                   (u) => u.taskStatus === "Pending"
//                 ).length;
//                 const completedCount = users.filter(
//                   (u) => u.taskStatus === "Completed"
//                 ).length;
//                 const isExpanded = expandedCoordinator === coord._id;

//                 return (
//                   <div
//                     key={coord._id}
//                     className="bg-white rounded-xl shadow-sm overflow-hidden"
//                   >
//                     <div
//                       className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
//                       onClick={() => toggleCoordinator(coord._id)}
//                     >
//                       <div className="flex justify-between items-center">
//                         <div className="flex items-center space-x-4">
//                           <div className="bg-blue-100 p-3 rounded-full">
//                             <User className="text-blue-600" />
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-gray-800">
//                               {coord.name}
//                             </h3>
//                             <p className="text-gray-600 text-sm flex items-center">
//                               <Mail className="mr-1 h-4 w-4" />
//                               {coord.email}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                           <div className="hidden md:flex space-x-3">
//                             <div className="text-center">
//                               <p className="text-xs text-gray-500">Users</p>
//                               <p className="font-bold">{users.length}</p>
//                             </div>
//                             <div className="text-center">
//                               <p className="text-xs text-gray-500">Pending</p>
//                               <p className="font-bold text-yellow-600">
//                                 {pendingCount}
//                               </p>
//                             </div>
//                             <div className="text-center">
//                               <p className="text-xs text-gray-500">Completed</p>
//                               <p className="font-bold text-green-600">
//                                 {completedCount}
//                               </p>
//                             </div>
//                           </div>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(coord._id);
//                             }}
//                             className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                           {isExpanded ? <ChevronUp /> : <ChevronDown />}
//                         </div>
//                       </div>
//                     </div>

//                     {isExpanded && (
//                       <div className="border-t p-4 bg-gray-50">
//                         {/* Mobile stats */}
//                         <div className="md:hidden grid grid-cols-3 gap-3 mb-4">
//                           <div className="bg-white p-3 rounded-lg shadow-xs text-center">
//                             <p className="text-xs text-gray-500">Users</p>
//                             <p className="font-bold">{users.length}</p>
//                           </div>
//                           <div className="bg-white p-3 rounded-lg shadow-xs text-center">
//                             <p className="text-xs text-gray-500">Pending</p>
//                             <p className="font-bold text-yellow-600">
//                               {pendingCount}
//                             </p>
//                           </div>
//                           <div className="bg-white p-3 rounded-lg shadow-xs text-center">
//                             <p className="text-xs text-gray-500">Completed</p>
//                             <p className="font-bold text-green-600">
//                               {completedCount}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="space-y-3">
//                           <div className="flex items-center text-gray-700">
//                             <Clipboard className="mr-2 text-gray-500" />
//                             <h4 className="font-medium">Contact</h4>
//                             <span className="ml-2 font-normal">
//                               {coord.contact || "Not provided"}
//                             </span>
//                           </div>

//                           <h4 className="font-medium text-gray-700 flex items-center">
//                             <Clipboard className="mr-2 text-gray-500" />
//                             Assigned Users & Tasks
//                           </h4>
//                           {users.length > 0 ? (
//                             <div className="overflow-x-auto">
//                               <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-100">
//                                   <tr>
//                                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                       Name
//                                     </th>
//                                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                       Email
//                                     </th>
//                                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                       Task
//                                     </th>
//                                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                       Status
//                                     </th>
//                                   </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                   {users.map((u) => (
//                                     <tr
//                                       key={u._id}
//                                       className="hover:bg-gray-50"
//                                     >
//                                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
//                                         {u.name}
//                                       </td>
//                                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                                         {u.email}
//                                       </td>
//                                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                                         {u.assignedTask || "—"}
//                                       </td>
//                                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                                         <span
//                                           className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                             u.taskStatus === "Completed"
//                                               ? "bg-green-100 text-green-800"
//                                               : "bg-yellow-100 text-yellow-800"
//                                           }`}
//                                         >
//                                           {u.taskStatus}
//                                         </span>
//                                       </td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           ) : (
//                             <div className="bg-white p-4 rounded-lg border border-dashed border-gray-300 text-center">
//                               <p className="text-gray-500">
//                                 No users assigned yet.
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </section>
//           )}
//         </main>
//       )}

//       {/* Tech Transfer Flow Tab */}
//       {selectedTab === "techTransfer" && (
//         <section className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Technology Transfer Process Flow
//           </h2>

//           {/* Flow form */}
//           <form
//             onSubmit={handleFlowSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
//           >
//             {[
//               { label: "Payment Received", key: "paymentReceived" },
//               { label: "Entry into AMS (within 1 week)", key: "entryIntoAMS" },
//               { label: "Draft Agreement", key: "draftAgreement" },
//               { label: "Dasian", key: "dasian" },
//               { label: "Demonstrate", key: "demonstrate" },
//               {
//                 label: "Demonstration & Certificate Generation",
//                 key: "certificateGeneration",
//               },
//             ].map(({ label, key }) => (
//               <div key={key} className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {label} Date
//                 </label>
//                 <input
//                   type="date"
//                   name={key}
//                   value={flowSteps[key]}
//                   onChange={handleFlowChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
//                 />
//                 <label className="block text-sm font-medium text-gray-700">
//                   {label} Details
//                 </label>
//                 <input
//                   type="text"
//                   name={`${key}Details`}
//                   value={flowSteps[`${key}Details`]}
//                   onChange={handleFlowChange}
//                   placeholder="Enter details..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>
//             ))}
//             <div className="md:col-span-2 flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Save Flow
//               </button>
//             </div>
//           </form>

//           {/* Display flows */}
//           {flows.length === 0 ? (
//             <p className="text-gray-500">No flows recorded.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
//                       Recorded On
//                     </th>
//                     {[
//                       "Payment Received",
//                       "Entry into AMS",
//                       "Draft Agreement",
//                       "Dasian",
//                       "Demonstrate",
//                       "Demonstration & Certificate Generation",
//                     ].map((h) => (
//                       <th
//                         key={h}
//                         className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
//                       >
//                         {h} Date
//                       </th>
//                     ))}
//                     {[
//                       "Payment Received",
//                       "Entry into AMS",
//                       "Draft Agreement",
//                       "Dasian",
//                       "Demonstrate",
//                       "Demonstration & Certificate Generation",
//                     ].map((h) => (
//                       <th
//                         key={h + "det"}
//                         className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
//                       >
//                         {h} Details
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {flows.map((flow) => (
//                     <tr key={flow._id}>
//                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(flow.createdAt).toLocaleDateString()}
//                       </td>
//                       {flow.steps.map((step) => (
//                         <React.Fragment key={step.name}>
//                           <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
//                             {new Date(step.date).toLocaleDateString()}
//                           </td>
//                           <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
//                             {step.details}
//                           </td>
//                         </React.Fragment>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       )}

//       {/* Annual Reports Tab */}
//       {selectedTab === "annualReports" && (
//         <section className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Annual Reports</h2>
//           <div className="flex space-x-4">
//             <button
//               onClick={generateAnnualReport}
//               className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center"
//             >
//               <Clipboard className="mr-2" />
//               Generate Excel Report
//             </button>
//             <button
//               onClick={() => window.print()}
//               className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
//             >
//               Print Report
//             </button>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default DeanDashboard;

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
  const [flowSteps, setFlowSteps] = useState({
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
        "http://localhost:5000/profile",
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

      // Fetch tech transfer flows if on that tab
      if (selectedTab === "techTransfer" || selectedTab === "annualReports") {
        const { data: flowsData } = await axios.get(
          "http://localhost:5000/coordinator/tech-transfer-flow",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFlows(flowsData);
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
    try {
      const steps = [
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
        {
          name: "Member",
          date: flowSteps.member || new Date(),
          details: flowSteps.memberDetails,
        },
        {
          name: "License Details",
          date: flowSteps.licenseDetails || new Date(),
          details: flowSteps.licenseDetailsDetails,
        },
      ];

      await axios.post(
        "http://localhost:5000/coordinator/tech-transfer-flow",
        { steps },
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

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
  //     <ToastContainer position="top-center" autoClose={3000} />

  //     {/* Header Section */}
  //     <header className="mb-8">
  //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
  //         <div className="flex items-start gap-4">
  //           <div className="bg-white p-3 rounded-xl shadow-sm">
  //             <User className="text-blue-600 h-8 w-8" />
  //           </div>
  //           <div>
  //             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
  //               Dean Dashboard
  //             </h1>
  //             <div className="flex items-center text-gray-600">
  //               <h2 className="text-lg font-semibold text-gray-700 mr-3">
  //                 {dean.name}
  //               </h2>
  //               <span className="hidden md:inline-flex items-center text-gray-500">
  //                 <Mail className="mr-1 h-4 w-4" />
  //                 {dean.email}
  //               </span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="flex gap-4">
  //           <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
  //             <div className="bg-blue-100 p-2 rounded-full">
  //               <Users className="text-blue-600 h-5 w-5" />
  //             </div>
  //             <div>
  //               <p className="text-sm text-gray-500">Coordinators</p>
  //               <p className="text-xl font-bold text-blue-600">
  //                 {coords.length}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </header>

  //     {/* Tabs Navigation */}
  //     <div className="mb-6 bg-white rounded-xl shadow-sm p-1 w-full max-w-3xl">
  //       <div className="flex overflow-x-auto">
  //         {[
  //           { id: "coordinators", label: "Coordinators", icon: Users },
  //           { id: "techTransfer", label: "Tech Transfer", icon: FileText },
  //           { id: "annualReports", label: "Reports", icon: FileBarChart2 },
  //         ].map((tab) => (
  //           <button
  //             key={tab.id}
  //             onClick={() => setSelectedTab(tab.id)}
  //             className={`flex items-center px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
  //               selectedTab === tab.id
  //                 ? "bg-blue-100 text-blue-600"
  //                 : "text-gray-600 hover:bg-gray-50"
  //             }`}
  //           >
  //             <tab.icon className="h-5 w-5 mr-2" />
  //             {tab.label}
  //           </button>
  //         ))}
  //       </div>
  //     </div>

  //     {/* Main Content */}
  //     <main className="space-y-6">
  //       {/* Coordinators Tab */}
  //       {selectedTab === "coordinators" && (
  //         <>
  //           {/* Create Coordinator Section */}
  //           <section className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200">
  //             <button
  //               onClick={() => setIsCreating(!isCreating)}
  //               className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
  //             >
  //               <div className="flex items-center">
  //                 <div
  //                   className={`p-2 rounded-lg mr-3 ${
  //                     isCreating
  //                       ? "bg-blue-100 text-blue-600"
  //                       : "bg-green-100 text-green-600"
  //                   }`}
  //                 >
  //                   <Plus className="h-5 w-5" />
  //                 </div>
  //                 <h2 className="text-lg font-medium">Add New Coordinator</h2>
  //               </div>
  //               {isCreating ? (
  //                 <ChevronUp className="text-gray-500" />
  //               ) : (
  //                 <ChevronDown className="text-gray-500" />
  //               )}
  //             </button>

  //             {isCreating && (
  //               <div className="p-4 border-t">
  //                 <form onSubmit={handleCreate} className="space-y-4">
  //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //                     {["name", "email", "contact", "password"].map((field) => (
  //                       <div key={field} className="space-y-2">
  //                         <label className="block text-sm font-medium text-gray-700">
  //                           {field.charAt(0).toUpperCase() + field.slice(1)}
  //                         </label>
  //                         <input
  //                           type={field === "password" ? "password" : "text"}
  //                           name={field}
  //                           value={newCoord[field]}
  //                           onChange={handleNewChange}
  //                           required
  //                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
  //                           placeholder={`Enter ${field}`}
  //                         />
  //                       </div>
  //                     ))}
  //                   </div>
  //                   <div className="flex justify-end space-x-3 pt-2">
  //                     <button
  //                       type="button"
  //                       onClick={() => setIsCreating(false)}
  //                       className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
  //                     >
  //                       Cancel
  //                     </button>
  //                     <button
  //                       type="submit"
  //                       className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
  //                     >
  //                       <Plus className="mr-1 h-4 w-4" />
  //                       Create Coordinator
  //                     </button>
  //                   </div>
  //                 </form>
  //               </div>
  //             )}
  //           </section>

  //           {/* Coordinators List */}
  //           {coords.length === 0 ? (
  //             <div className="bg-white rounded-xl shadow-sm p-8 text-center">
  //               <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
  //                 <Users className="text-gray-400 h-8 w-8" />
  //               </div>
  //               <h3 className="text-lg font-medium text-gray-700 mb-1">
  //                 No Coordinators Found
  //               </h3>
  //               <p className="text-gray-500 mb-4">
  //                 Create your first coordinator to get started
  //               </p>
  //               <button
  //                 onClick={() => setIsCreating(true)}
  //                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
  //               >
  //                 <Plus className="mr-1 h-4 w-4" />
  //                 Add Coordinator
  //               </button>
  //             </div>
  //           ) : (
  //             <section className="space-y-4">
  //               <div className="flex justify-between items-center">
  //                 <h2 className="text-xl font-semibold text-gray-800">
  //                   Coordinators
  //                 </h2>
  //                 <p className="text-sm text-gray-500">
  //                   {coords.length} coordinator{coords.length !== 1 ? "s" : ""}
  //                 </p>
  //               </div>

  //               <div className="grid gap-4">
  //                 {coords.map((coord) => {
  //                   const users = usersByCoord[coord._id] || [];
  //                   const pendingCount = users.filter(
  //                     (u) => u.taskStatus === "Pending"
  //                   ).length;
  //                   const completedCount = users.filter(
  //                     (u) => u.taskStatus === "Completed"
  //                   ).length;
  //                   const isExpanded = expandedCoordinator === coord._id;

  //                   return (
  //                     <div
  //                       key={coord._id}
  //                       className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200"
  //                     >
  //                       <div
  //                         className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
  //                         onClick={() => toggleCoordinator(coord._id)}
  //                       >
  //                         <div className="flex justify-between items-center">
  //                           <div className="flex items-center space-x-4">
  //                             <div className="bg-blue-100 p-3 rounded-xl">
  //                               <User className="text-blue-600 h-6 w-6" />
  //                             </div>
  //                             <div>
  //                               <h3 className="font-semibold text-gray-800">
  //                                 {coord.name}
  //                               </h3>
  //                               <p className="text-gray-600 text-sm flex items-center">
  //                                 <Mail className="mr-1 h-4 w-4" />
  //                                 {coord.email}
  //                               </p>
  //                             </div>
  //                           </div>
  //                           <div className="flex items-center space-x-4">
  //                             <div className="hidden md:flex items-center space-x-3">
  //                               <div className="text-center px-3 py-1 bg-gray-50 rounded-lg">
  //                                 <p className="text-xs text-gray-500">Users</p>
  //                                 <p className="font-bold text-gray-800">
  //                                   {users.length}
  //                                 </p>
  //                               </div>
  //                               <div className="text-center px-3 py-1 bg-yellow-50 rounded-lg">
  //                                 <p className="text-xs text-yellow-600">
  //                                   Pending
  //                                 </p>
  //                                 <p className="font-bold text-yellow-600">
  //                                   {pendingCount}
  //                                 </p>
  //                               </div>
  //                               <div className="text-center px-3 py-1 bg-green-50 rounded-lg">
  //                                 <p className="text-xs text-green-600">
  //                                   Completed
  //                                 </p>
  //                                 <p className="font-bold text-green-600">
  //                                   {completedCount}
  //                                 </p>
  //                               </div>
  //                             </div>
  //                             <button
  //                               onClick={(e) => {
  //                                 e.stopPropagation();
  //                                 handleDelete(coord._id);
  //                               }}
  //                               className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
  //                             >
  //                               <Trash2 className="h-5 w-5" />
  //                             </button>
  //                             {isExpanded ? (
  //                               <ChevronUp className="text-gray-500" />
  //                             ) : (
  //                               <ChevronDown className="text-gray-500" />
  //                             )}
  //                           </div>
  //                         </div>
  //                       </div>

  //                       {isExpanded && (
  //                         <div className="border-t p-4 bg-gray-50">
  //                           {/* Mobile Stats */}
  //                           <div className="md:hidden grid grid-cols-3 gap-3 mb-4">
  //                             <div className="bg-white p-3 rounded-lg shadow-xs text-center">
  //                               <p className="text-xs text-gray-500">Users</p>
  //                               <p className="font-bold text-gray-800">
  //                                 {users.length}
  //                               </p>
  //                             </div>
  //                             <div className="bg-white p-3 rounded-lg shadow-xs text-center">
  //                               <p className="text-xs text-yellow-600">
  //                                 Pending
  //                               </p>
  //                               <p className="font-bold text-yellow-600">
  //                                 {pendingCount}
  //                               </p>
  //                             </div>
  //                             <div className="bg-white p-3 rounded-lg shadow-xs text-center">
  //                               <p className="text-xs text-green-600">
  //                                 Completed
  //                               </p>
  //                               <p className="font-bold text-green-600">
  //                                 {completedCount}
  //                               </p>
  //                             </div>
  //                           </div>

  //                           <div className="space-y-4">
  //                             <div className="flex items-center text-gray-700">
  //                               <Clipboard className="mr-2 text-gray-500" />
  //                               <h4 className="font-medium">Contact:</h4>
  //                               <span className="ml-2 font-normal">
  //                                 {coord.contact || "Not provided"}
  //                               </span>
  //                             </div>

  //                             <div>
  //                               <h4 className="font-medium text-gray-700 flex items-center mb-2">
  //                                 <Clipboard className="mr-2 text-gray-500" />
  //                                 Assigned Users & Tasks
  //                               </h4>
  //                               {users.length > 0 ? (
  //                                 <div className="overflow-x-auto rounded-lg border border-gray-200">
  //                                   <table className="min-w-full divide-y divide-gray-200">
  //                                     <thead className="bg-gray-100">
  //                                       <tr>
  //                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                                           Name
  //                                         </th>
  //                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                                           Email
  //                                         </th>
  //                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                                           Task
  //                                         </th>
  //                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                                           Status
  //                                         </th>
  //                                       </tr>
  //                                     </thead>
  //                                     <tbody className="bg-white divide-y divide-gray-200">
  //                                       {users.map((u) => (
  //                                         <tr
  //                                           key={u._id}
  //                                           className="hover:bg-gray-50"
  //                                         >
  //                                           <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
  //                                             {u.name}
  //                                           </td>
  //                                           <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
  //                                             {u.email}
  //                                           </td>
  //                                           <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
  //                                             {u.assignedTask || "—"}
  //                                           </td>
  //                                           <td className="px-4 py-3 whitespace-nowrap text-sm">
  //                                             <span
  //                                               className={`px-2 py-1 rounded-full text-xs font-medium ${
  //                                                 u.taskStatus === "Completed"
  //                                                   ? "bg-green-100 text-green-800"
  //                                                   : "bg-yellow-100 text-yellow-800"
  //                                               }`}
  //                                             >
  //                                               {u.taskStatus}
  //                                             </span>
  //                                           </td>
  //                                         </tr>
  //                                       ))}
  //                                     </tbody>
  //                                   </table>
  //                                 </div>
  //                               ) : (
  //                                 <div className="bg-white p-4 rounded-lg border border-dashed border-gray-300 text-center">
  //                                   <p className="text-gray-500">
  //                                     No users assigned to this coordinator yet.
  //                                   </p>
  //                                 </div>
  //                               )}
  //                             </div>
  //                           </div>
  //                         </div>
  //                       )}
  //                     </div>
  //                   );
  //                 })}
  //               </div>
  //             </section>
  //           )}
  //         </>
  //       )}

  //       {/* Tech Transfer Flow Tab */}
  //       {selectedTab === "techTransfer" && (
  //         <section className="bg-white rounded-xl shadow-sm p-6">
  //           <div className="flex justify-between items-center mb-6">
  //             <h2 className="text-xl font-semibold text-gray-800">
  //               Technology Transfer Process Flow
  //             </h2>
  //             <div className="flex items-center space-x-2">
  //               <Calendar className="text-gray-500 h-5 w-5" />
  //               <span className="text-sm text-gray-500">
  //                 {new Date().toLocaleDateString()}
  //               </span>
  //             </div>
  //           </div>

  //           {/* Flow Form */}
  //           <form onSubmit={handleFlowSubmit} className="mb-8">
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //               {[
  //                 {
  //                   label: "Payment Received",
  //                   key: "paymentReceived",
  //                   description: "Initial payment confirmation",
  //                 },
  //                 {
  //                   label: "Entry into AMS (within 1 week)",
  //                   key: "entryIntoAMS",
  //                   description: "System registration process",
  //                 },
  //                 {
  //                   label: "Draft Agreement",
  //                   key: "draftAgreement",
  //                   description: "Contract preparation stage",
  //                 },
  //                 {
  //                   label: "Dasian",
  //                   key: "dasian",
  //                   description: "Technical evaluation phase",
  //                 },
  //                 {
  //                   label: "Demonstrate",
  //                   key: "demonstrate",
  //                   description: "Product demonstration",
  //                 },
  //                 {
  //                   label: "Certificate Generation",
  //                   key: "certificateGeneration",
  //                   description: "Final documentation",
  //                 },
  //                 {
  //                   label: "Member",
  //                   key: "member",
  //                   description: "Membership verification",
  //                 },
  //                 {
  //                   label: "License Details",
  //                   key: "licenseDetails",
  //                   description: "License and documentation check",
  //                 },
  //               ].map(({ label, key, description }) => (
  //                 <div
  //                   key={key}
  //                   className="bg-gray-50 p-4 rounded-lg border border-gray-200"
  //                 >
  //                   <h3 className="font-medium text-gray-800 mb-2">{label}</h3>
  //                   <p className="text-sm text-gray-500 mb-3">{description}</p>
  //                   <div className="space-y-3">
  //                     <div>
  //                       <label className="block text-sm font-medium text-gray-700 mb-1">
  //                         Date
  //                       </label>
  //                       <input
  //                         type="date"
  //                         name={key}
  //                         value={flowSteps[key]}
  //                         onChange={handleFlowChange}
  //                         required
  //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
  //                       />
  //                     </div>
  //                     <div>
  //                       <label className="block text-sm font-medium text-gray-700 mb-1">
  //                         Details
  //                       </label>
  //                       <input
  //                         type="text"
  //                         name={`${key}Details`}
  //                         value={flowSteps[`${key}Details`]}
  //                         onChange={handleFlowChange}
  //                         placeholder="Enter details..."
  //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
  //                       />
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //             <div className="mt-6 flex justify-end">
  //               <button
  //                 type="submit"
  //                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
  //               >
  //                 <FileText className="mr-2 h-4 w-4" />
  //                 Save Process Flow
  //               </button>
  //             </div>
  //           </form>

  //           {/* Existing Flows */}
  //           <div>
  //             <h3 className="text-lg font-medium text-gray-800 mb-4">
  //               Existing Process Flows
  //             </h3>
  //             {flows.length === 0 ? (
  //               <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center">
  //                 <FileText className="mx-auto h-10 w-10 text-gray-400 mb-3" />
  //                 <p className="text-gray-500">
  //                   No technology transfer flows recorded yet.
  //                 </p>
  //               </div>
  //             ) : (
  //               <div className="space-y-4">
  //                 {flows.map((flow) => (
  //                   <div
  //                     key={flow._id}
  //                     className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs"
  //                   >
  //                     <div className="p-4 border-b border-gray-200 bg-gray-50">
  //                       <div className="flex justify-between items-center">
  //                         <h4 className="font-medium text-gray-800">
  //                           Process Flow -{" "}
  //                           {new Date(flow.createdAt).toLocaleDateString()}
  //                         </h4>
  //                         <span className="text-sm text-gray-500">
  //                           {new Date(flow.createdAt).toLocaleTimeString()}
  //                         </span>
  //                       </div>
  //                     </div>
  //                     <div className="overflow-x-auto">
  //                       <table className="min-w-full divide-y divide-gray-200">
  //                         <thead className="bg-gray-100">
  //                           <tr>
  //                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                               Step
  //                             </th>
  //                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                               Date
  //                             </th>
  //                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                               Details
  //                             </th>
  //                           </tr>
  //                         </thead>
  //                         <tbody className="bg-white divide-y divide-gray-200">
  //                           {flow.steps.map((step) => (
  //                             <tr key={step.name} className="hover:bg-gray-50">
  //                               <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
  //                                 {step.name}
  //                               </td>
  //                               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
  //                                 {step.date
  //                                   ? new Date(step.date).toLocaleDateString()
  //                                   : "—"}
  //                               </td>
  //                               <td className="px-4 py-3 text-sm text-gray-500">
  //                                 {step.details || "—"}
  //                               </td>
  //                             </tr>
  //                           ))}
  //                         </tbody>
  //                       </table>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         </section>
  //       )}

  //       {/* Annual Reports Tab */}
  //       {selectedTab === "annualReports" && (
  //         <section className="bg-white rounded-xl shadow-sm p-6">
  //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
  //             <div>
  //               <h2 className="text-xl font-semibold text-gray-800 mb-1">
  //                 Annual Reports
  //               </h2>
  //               <p className="text-gray-500">
  //                 Generate and download annual reports
  //               </p>
  //             </div>
  //             <div className="mt-4 md:mt-0 flex space-x-3">
  //               {/* <button
  //                 onClick={generateAnnualReport}
  //                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
  //               >
  //                 <Download className="mr-2 h-4 w-4" />
  //                 Download Excel
  //               </button>
  //               <button
  //                 onClick={() => window.print()}
  //                 className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
  //               >
  //                 <Printer className="mr-2 h-4 w-4" />
  //                 Print Report
  //               </button> */}
  //               <div className="mb-6">
  //                 <h3 className="text-lg font-medium text-gray-800 mb-2">
  //                   Select Process Flows to Include
  //                 </h3>
  //                 <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
  //                   {flows.length > 0 ? (
  //                     flows.map((flow) => (
  //                       <label
  //                         key={flow._id}
  //                         className="flex items-center space-x-2 text-gray-700"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           checked={selectedFlows.includes(flow._id)}
  //                           onChange={() => toggleFlowSelection(flow._id)}
  //                           className="form-checkbox h-4 w-4"
  //                         />
  //                         <span>
  //                           {new Date(flow.createdAt).toLocaleDateString()}
  //                         </span>
  //                       </label>
  //                     ))
  //                   ) : (
  //                     <p className="text-gray-500">
  //                       No process flows available.
  //                     </p>
  //                   )}
  //                 </div>
  //               </div>

  //               {/* ── Download & Print Buttons ── */}
  //               <div className="flex space-x-3 justify-end">
  //                 <button
  //                   onClick={generateTechTransferReport}
  //                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
  //                 >
  //                   <Download className="mr-2 h-4 w-4" />
  //                   Download Excel
  //                 </button>
  //                 <button
  //                   onClick={() => window.print()}
  //                   className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
  //                 >
  //                   <Printer className="mr-2 h-4 w-4" />
  //                   Print Report
  //                 </button>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
  //             <div className="text-center">
  //               <FileBarChart2 className="mx-auto h-12 w-12 text-gray-400 mb-3" />
  //               <h3 className="text-lg font-medium text-gray-800 mb-2">
  //                 Annual Report Generator
  //               </h3>
  //               <p className="text-gray-500 mb-4 max-w-md mx-auto">
  //                 Generate comprehensive annual reports with all coordinator
  //                 activities and technology transfer statistics.
  //               </p>
  //               <div className="flex justify-center space-x-4">
  //                 <button
  //                   onClick={generateAnnualReport}
  //                   className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
  //                 >
  //                   <Download className="mr-2 h-4 w-4" />
  //                   Download
  //                 </button>
  //                 <button
  //                   onClick={() => window.print()}
  //                   className="bg-white border border-gray-600 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
  //                 >
  //                   <Printer className="mr-2 h-4 w-4" />
  //                   Print
  //                 </button>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Stats Preview */}
  //           <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  //             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
  //               <div className="flex items-center">
  //                 <Users className="text-blue-600 h-5 w-5 mr-2" />
  //                 <h4 className="font-medium text-blue-800">Coordinators</h4>
  //               </div>
  //               <p className="text-2xl font-bold text-blue-600 mt-2">
  //                 {coords.length}
  //               </p>
  //             </div>
  //             <div className="bg-green-50 p-4 rounded-lg border border-green-100">
  //               <div className="flex items-center">
  //                 <CheckCircle className="text-green-600 h-5 w-5 mr-2" />
  //                 <h4 className="font-medium text-green-800">
  //                   Completed Tasks
  //                 </h4>
  //               </div>
  //               <p className="text-2xl font-bold text-green-600 mt-2">
  //                 {Object.values(usersByCoord).reduce(
  //                   (total, users) =>
  //                     total +
  //                     users.filter((u) => u.taskStatus === "Completed").length,
  //                   0
  //                 )}
  //               </p>
  //             </div>
  //             <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
  //               <div className="flex items-center">
  //                 <Clock className="text-yellow-600 h-5 w-5 mr-2" />
  //                 <h4 className="font-medium text-yellow-800">Pending Tasks</h4>
  //               </div>
  //               <p className="text-2xl font-bold text-yellow-600 mt-2">
  //                 {Object.values(usersByCoord).reduce(
  //                   (total, users) =>
  //                     total +
  //                     users.filter((u) => u.taskStatus === "Pending").length,
  //                   0
  //                 )}
  //               </p>
  //             </div>
  //           </div>
  //         </section>
  //       )}
  //     </main>
  //   </div>
  // );

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
                Welcome back, Dean
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
                            required
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
                    {flows.map((flow) => (
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
                              {new Date(flow.createdAt).toLocaleTimeString()}
                            </p>
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
                                      ? new Date(step.date).toLocaleDateString()
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
                    ))}
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

              {/* Charts Placeholder */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">
                      Tasks Completion
                    </h4>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      This Month
                    </span>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <BarChart2 className="h-12 w-12" />
                    <span className="ml-2">Tasks Completion Chart</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">
                      Process Flow Status
                    </h4>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      Quarterly
                    </span>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <PieChart className="h-12 w-12" />
                    <span className="ml-2">Process Status Chart</span>
                  </div>
                </div>
              </div> */}

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
