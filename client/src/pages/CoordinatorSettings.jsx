import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoordinatorSettings = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    assignedTask: ""
  });
  const token = localStorage.getItem("token");

  // Fetch assigned users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/coordinator/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users.", { autoClose: 3000 });
    }
  };

  // Prepare form fields for editing a user's details
  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUserData({
      name: user.name,
      email: user.email,
      assignedTask: user.assignedTask || "",
    });
  };

  // Handle input field changes for user details
  const handleInputChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };

  // Update the user details (name, email, assigned task)
  const handleUpdate = async (userId) => {
    try {
      // This endpoint must be implemented on your backend for coordinators
      const res = await axios.put(
        `http://localhost:5000/coordinator/users/${userId}`,
        editedUserData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? res.data : user
        )
      );
      setEditingUserId(null);
      toast.success("User updated successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user.", { autoClose: 3000 });
    }
  };

  // Delete a user – ensure your backend verifies that the user is assigned to the coordinator
  const handleDelete = async (userId) => {
    try {
      // This DELETE endpoint must be implemented on your backend for coordinators
      await axios.delete(`http://localhost:5000/coordinator/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
      toast.success("User deleted successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.", { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-6">
          Coordinator Settings
        </h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50 transition-colors duration-300"
              >
                {editingUserId === user._id ? (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-gray-700">Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={editedUserData.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={editedUserData.email}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Assigned Task:
                      </label>
                      <input
                        type="text"
                        name="assignedTask"
                        value={editedUserData.assignedTask}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                      />
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-gray-700">
                      <strong>Assigned Task:</strong>{" "}
                      {user.assignedTask || "None"}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorSettings;
