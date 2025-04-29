// // AdminSettings.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { User, Users, Database, Edit, Trash2, Plus, Settings as SettingsIcon } from 'lucide-react';

// const AdminSettings = () => {
//   const token = localStorage.getItem("token");
//   const [users, setUsers] = useState([]);
//   const [coordinators, setCoordinators] = useState([]);
//   const [leads, setLeads] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [usersRes, coordsRes, leadsRes] = await Promise.all([
//           axios.get("http://localhost:5000/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get("http://localhost:5000/admin/coordinators", { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get("http://localhost:5000/lead/all")
//         ]);
//         setUsers(usersRes.data);
//         setCoordinators(coordsRes.data);
//         setLeads(leadsRes.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, [token]);

//   const handleDelete = async (type, id) => {
//     try {
//       if (type === "user") {
//         await axios.delete(`http://localhost:5000/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//         setUsers(users.filter(u => u._id !== id));
//       } else if (type === "coordinator") {
//         await axios.delete(`http://localhost:5000/admin/coordinators/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//         setCoordinators(coordinators.filter(c => c._id !== id));
//       } else if (type === "lead") {
//         await axios.delete(`http://localhost:5000/lead/${id}`);
//         setLeads(leads.filter(l => l._id !== id));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Dummy edit handler – you can implement modals or navigation to an edit page
//   const handleEdit = (type, id) => {
//     console.log(`Edit ${type} with id ${id}`);
//   };

//   const renderSection = (title, IconComponent, items, type) => (
//     <div className="mb-8">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-2">
//           <IconComponent className="w-6 h-6 text-blue-600" />
//           <h3 className="text-2xl font-bold text-blue-900">{title}</h3>
//         </div>
//         <button
//           className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
//           onClick={() => console.log(`Create new ${type}`)}
//         >
//           <Plus className="w-5 h-5" />
//           <span>Create</span>
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow rounded">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               {type === "lead" && (
//                 <>
//                   <th className="px-4 py-2 border">Subject</th>
//                   <th className="px-4 py-2 border">Discussion</th>
//                   <th className="px-4 py-2 border">Lead Value</th>
//                   <th className="px-4 py-2 border">Source</th>
//                   <th className="px-4 py-2 border">Type</th>
//                   <th className="px-4 py-2 border">Expected Close</th>
//                 </>
//               )}
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item._id} className="text-center">
//                 <td className="px-4 py-2 border">{item.name}</td>
//                 <td className="px-4 py-2 border">{item.email}</td>
//                 {type === "lead" && (
//                   <>
//                     <td className="px-4 py-2 border">{item.onboarding?.details?.subject}</td>
//                     <td className="px-4 py-2 border">{item.onboarding?.details?.discussionMatter}</td>
//                     <td className="px-4 py-2 border">{item.onboarding?.details?.leadValue}</td>
//                     <td className="px-4 py-2 border">{item.onboarding?.details?.source}</td>
//                     <td className="px-4 py-2 border">{item.onboarding?.details?.type}</td>
//                     <td className="px-4 py-2 border">
//                       {item.onboarding?.details?.expectedCloseDate
//                         ? new Date(item.onboarding.details.expectedCloseDate).toLocaleDateString()
//                         : "N/A"}
//                     </td>
//                   </>
//                 )}
//                 <td className="px-4 py-2 border flex items-center justify-center space-x-2">
//                   <button onClick={() => handleEdit(type, item._id)} className="text-blue-500 hover:text-blue-700">
//                     <Edit className="w-5 h-5" />
//                   </button>
//                   <button onClick={() => handleDelete(type, item._id)} className="text-red-500 hover:text-red-700">
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-center text-blue-900 mb-8 flex items-center justify-center space-x-2">
//         <SettingsIcon className="w-8 h-8" />
//         <span>Settings</span>
//       </h2>
//       {renderSection("Users", User, users, "user")}
//       {renderSection("Coordinators", Users, coordinators, "coordinator")}
//       {renderSection("Leads", Database, leads, "lead")}
//     </div>
//   );
// };

// export default AdminSettings;

// AdminSettings.jsx
// AdminSettings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Users,
  Database,
  Edit,
  Trash2,
  Plus,
  Settings as SettingsIcon,
} from "lucide-react";

const AdminSettings = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [leads, setLeads] = useState([]);

  // State for modal form (used for editing)
  const [showFormModal, setShowFormModal] = useState(false);
  const [currentItemType, setCurrentItemType] = useState(""); // "user", "coordinator", "lead"
  const [currentItem, setCurrentItem] = useState({ name: "", email: "" });

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ id: "", type: "" });

  // State for toast notification
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coordsRes, leadsRes] = await Promise.all([
          axios.get("http://localhost:5000/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/admin/coordinators", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/lead/all"),
        ]);
        setUsers(usersRes.data);
        setCoordinators(coordsRes.data);
        setLeads(leadsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  // Open the modal for editing an item
  const openFormModal = (itemType, item) => {
    setCurrentItemType(itemType);
    setCurrentItem(item);
    setShowFormModal(true);
  };

  // Handle form submission for editing
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItemType === "user") {
        const res = await axios.put(
          `http://localhost:5000/admin/users/${currentItem._id}`,
          { name: currentItem.name, email: currentItem.email },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(users.map((u) => (u._id === currentItem._id ? res.data : u)));
      } else if (currentItemType === "coordinator") {
        const res = await axios.put(
          `http://localhost:5000/admin/coordinators/${currentItem._id}`,
          { name: currentItem.name, email: currentItem.email },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCoordinators(
          coordinators.map((c) => (c._id === currentItem._id ? res.data : c))
        );
      } else if (currentItemType === "lead") {
        // For leads, editing might be disabled or different.
        // Here we simply close the modal.
        console.log("Editing for leads is not supported.");
      }
      setShowFormModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Open the delete confirmation modal
  const openDeleteModal = (id, type) => {
    setDeleteItem({ id, type });
    setShowDeleteModal(true);
  };

  // Handle deletion after confirmation
  const handleDelete = async () => {
    try {
      if (deleteItem.type === "user") {
        await axios.delete(
          `http://localhost:5000/admin/users/${deleteItem.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(users.filter((u) => u._id !== deleteItem.id));
      } else if (deleteItem.type === "coordinator") {
        await axios.delete(
          `http://localhost:5000/admin/coordinators/${deleteItem.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCoordinators(coordinators.filter((c) => c._id !== deleteItem.id));
      } else if (deleteItem.type === "lead") {
        await axios.delete(`http://localhost:5000/lead/${deleteItem.id}`);
        setLeads(leads.filter((l) => l._id !== deleteItem.id));
      }
      setShowDeleteModal(false);
      setToastMessage(
        `${
          deleteItem.type.charAt(0).toUpperCase() + deleteItem.type.slice(1)
        } successfully deleted`
      );
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Render each section based on type
  const renderSection = (title, IconComponent, items, type) => (
    <div className="mb-8" key={title}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <IconComponent className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-blue-900">{title}</h3>
        </div>
        {/* Only show the Create button for coordinators */}
        {type === "coordinator" && (
          <button
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            onClick={() => navigate("/register/coordinator")}
          >
            <Plus className="w-5 h-5" />
            <span>Create</span>
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              {/* For leads, remove Name and Email columns */}
              {type !== "lead" ? (
                <>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-2 border">Subject</th>
                  <th className="px-4 py-2 border">Discussion</th>
                  <th className="px-4 py-2 border">Lead Value</th>
                  <th className="px-4 py-2 border">Source</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Expected Close</th>
                </>
              )}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="text-center">
                {type !== "lead" ? (
                  <>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">{item.email}</td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2 border">
                      {item.onboarding?.details?.subject}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.onboarding?.details?.discussionMatter}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.onboarding?.details?.leadValue}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.onboarding?.details?.source}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.onboarding?.details?.type}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.onboarding?.details?.expectedCloseDate
                        ? new Date(
                            item.onboarding.details.expectedCloseDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </>
                )}
                <td className="px-4 py-2 border flex items-center justify-center space-x-2">
                  <button
                    onClick={() => openFormModal(type, item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {/* <Edit className="w-5 h-5" /> */}
                  </button>
                  <button
                    onClick={() => openDeleteModal(item._id, type)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6 relative">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8 flex items-center justify-center space-x-2">
        <SettingsIcon className="w-8 h-8" />
        <span>Settings</span>
      </h2>
      {renderSection("Users", User, users, "user")}
      {renderSection("Coordinators", Users, coordinators, "coordinator")}
      {renderSection("Leads", Database, leads, "lead")}

      {/* Form Modal for Editing */}
      {showFormModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl mb-4">
              Edit{" "}
              {currentItemType.charAt(0).toUpperCase() +
                currentItemType.slice(1)}
            </h3>
            {currentItemType !== "lead" ? (
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2"
                    value={currentItem.name}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border px-3 py-2"
                    value={currentItem.email}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p>Editing of lead details is not available.</p>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="mt-4 px-4 py-2 bg-gray-300 rounded"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-xl mb-4">Confirm Deletion</h3>
            <p className="mb-4">
              Are you sure you want to delete this {deleteItem.type}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
