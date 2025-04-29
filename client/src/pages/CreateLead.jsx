// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const CreateLead = () => {
// //   const [step, setStep] = useState(1);
// //   const [formData, setFormData] = useState({
// //     onboarding: {
// //       details: {
// //         subject: "",
// //         discussionMatter: "",
// //         leadValue: "",
// //         source: "",
// //         type: "",
// //         expectedCloseDate: "",
// //       },
// //       contactPersons: [
// //         {
// //           name: "",
// //           emailType: "",
// //           emailDetail: "",
// //           contactNumberType: "",
// //           mobileDetail: "",
// //           organization: "",
// //         },
// //       ],
// //       technologies: [{ item: "", price: "", quantity: "", amount: "" }],
// //     },
// //   });
// //   const [leadDetails, setLeadDetails] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name.startsWith("onboarding.details.")) {
// //       const field = name.split(".")[2];
// //       setFormData((prev) => ({
// //         ...prev,
// //         onboarding: {
// //           ...prev.onboarding,
// //           details: {
// //             ...prev.onboarding.details,
// //             [field]: value,
// //           },
// //         },
// //       }));
// //     } else if (name.startsWith("onboarding.contactPersons")) {
// //       const parts = name.split(".");
// //       const indexMatch = parts[1].match(/\[(\d+)\]/);
// //       const index = indexMatch ? parseInt(indexMatch[1]) : 0;
// //       const field = parts[2];
// //       setFormData((prev) => {
// //         const updatedContacts = [...prev.onboarding.contactPersons];
// //         updatedContacts[index] = {
// //           ...updatedContacts[index],
// //           [field]: value,
// //         };
// //         return {
// //           ...prev,
// //           onboarding: {
// //             ...prev.onboarding,
// //             contactPersons: updatedContacts,
// //           },
// //         };
// //       });
// //     } else if (name.startsWith("onboarding.technologies")) {
// //       const parts = name.split(".");
// //       const indexMatch = parts[1].match(/\[(\d+)\]/);
// //       const index = indexMatch ? parseInt(indexMatch[1]) : 0;
// //       const field = parts[2];
// //       setFormData((prev) => {
// //         const updatedTechs = [...prev.onboarding.technologies];
// //         updatedTechs[index] = {
// //           ...updatedTechs[index],
// //           [field]: value,
// //         };
// //         return {
// //           ...prev,
// //           onboarding: {
// //             ...prev.onboarding,
// //             technologies: updatedTechs,
// //           },
// //         };
// //       });
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleNext = () => setStep((prev) => prev + 1);
// //   const handlePrev = () => setStep((prev) => prev - 1);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const preparedData = {
// //       ...formData,
// //       onboarding: {
// //         ...formData.onboarding,
// //         details: {
// //           ...formData.onboarding.details,
// //           leadValue: Number(formData.onboarding.details.leadValue) || 0,
// //           expectedCloseDate: formData.onboarding.details.expectedCloseDate
// //             ? new Date(formData.onboarding.details.expectedCloseDate)
// //             : null,
// //         },
// //         technologies: formData.onboarding.technologies.map((tech) => ({
// //           ...tech,
// //           price: Number(tech.price) || 0,
// //           quantity: Number(tech.quantity) || 0,
// //           amount: Number(tech.amount) || 0,
// //         })),
// //       },
// //     };

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5000/lead/createLead",
// //         preparedData
// //       );
// //       setLeadDetails(res.data.lead);
// //       setShowModal(true);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
// //         <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
// //           <div className="p-6">
// //             <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
// //               Create Lead
// //             </h2>
// //             <form onSubmit={handleSubmit}>
// //               {step === 1 && (
// //                 <div>
// //                   <h3 className="text-xl font-semibold text-blue-800 mb-4">
// //                     Step 1: Basic Details
// //                   </h3>
// //                   <div className="space-y-4">

// //                     <input
// //                       type="text"
// //                       name="onboarding.details.subject"
// //                       placeholder="Subject"
// //                       value={formData.onboarding.details.subject}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <input
// //                       type="text"
// //                       name="onboarding.details.discussionMatter"
// //                       placeholder="Discussion Matter"
// //                       value={formData.onboarding.details.discussionMatter}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <input
// //                       type="number"
// //                       name="onboarding.details.leadValue"
// //                       placeholder="Lead Value"
// //                       value={formData.onboarding.details.leadValue}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <select
// //                       name="onboarding.details.source"
// //                       value={formData.onboarding.details.source}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">Select Source</option>
// //                       <option value="source1">Source 1</option>
// //                       <option value="source2">Source 2</option>
// //                     </select>
// //                     <select
// //                       name="onboarding.details.type"
// //                       value={formData.onboarding.details.type}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">Select Type</option>
// //                       <option value="type1">Type 1</option>
// //                       <option value="type2">Type 2</option>
// //                     </select>
// //                     <input
// //                       type="date"
// //                       name="onboarding.details.expectedCloseDate"
// //                       value={formData.onboarding.details.expectedCloseDate}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                   </div>
// //                   <div className="flex justify-end mt-6">
// //                     <button
// //                       type="button"
// //                       onClick={handleNext}
// //                       className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //               {step === 2 && (
// //                 <div>
// //                   <h3 className="text-xl font-semibold text-blue-800 mb-4">
// //                     Step 2: Contact Person
// //                   </h3>
// //                   <div className="space-y-4">
// //                     <input
// //                       type="text"
// //                       name="onboarding.contactPersons[0].name"
// //                       placeholder="Contact Person Name"
// //                       value={formData.onboarding.contactPersons[0].name}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <select
// //                       name="onboarding.contactPersons[0].emailType"
// //                       value={formData.onboarding.contactPersons[0].emailType}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">Select Email Type</option>
// //                       <option value="personal">Personal</option>
// //                       <option value="work">Work</option>
// //                       <option value="other">Other</option>
// //                     </select>
// //                     {formData.onboarding.contactPersons[0].emailType && (
// //                       <input
// //                         type="email"
// //                         name="onboarding.contactPersons[0].emailDetail"
// //                         placeholder="Enter Email Detail"
// //                         value={
// //                           formData.onboarding.contactPersons[0].emailDetail
// //                         }
// //                         onChange={handleChange}
// //                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       />
// //                     )}
// //                     <select
// //                       name="onboarding.contactPersons[0].contactNumberType"
// //                       value={
// //                         formData.onboarding.contactPersons[0].contactNumberType
// //                       }
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">Select Contact Number Type</option>
// //                       <option value="mobile">Mobile</option>
// //                       <option value="landline">Landline</option>
// //                       <option value="other">Other</option>
// //                     </select>
// //                     {formData.onboarding.contactPersons[0]
// //                       .contactNumberType && (
// //                       <input
// //                         type="text"
// //                         name="onboarding.contactPersons[0].mobileDetail"
// //                         placeholder="Enter Mobile Detail"
// //                         value={
// //                           formData.onboarding.contactPersons[0].mobileDetail
// //                         }
// //                         onChange={handleChange}
// //                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       />
// //                     )}
// //                     <input
// //                       type="text"
// //                       name="onboarding.contactPersons[0].organization"
// //                       placeholder="Organization"
// //                       value={formData.onboarding.contactPersons[0].organization}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                   </div>
// //                   <div className="flex justify-between mt-6">
// //                     <button
// //                       type="button"
// //                       onClick={handlePrev}
// //                       className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
// //                     >
// //                       Back
// //                     </button>
// //                     <button
// //                       type="button"
// //                       onClick={handleNext}
// //                       className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //               {step === 3 && (
// //                 <div>
// //                   <h3 className="text-xl font-semibold text-blue-800 mb-4">
// //                     Step 3: Technologies
// //                   </h3>
// //                   <div className="space-y-4">
// //                     <input
// //                       type="text"
// //                       name="onboarding.technologies[0].item"
// //                       placeholder="Item"
// //                       value={formData.onboarding.technologies[0].item}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <input
// //                       type="number"
// //                       name="onboarding.technologies[0].price"
// //                       placeholder="Price"
// //                       value={formData.onboarding.technologies[0].price}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <input
// //                       type="number"
// //                       name="onboarding.technologies[0].quantity"
// //                       placeholder="Quantity"
// //                       value={formData.onboarding.technologies[0].quantity}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <input
// //                       type="number"
// //                       name="onboarding.technologies[0].amount"
// //                       placeholder="Amount"
// //                       value={formData.onboarding.technologies[0].amount}
// //                       onChange={handleChange}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                   </div>
// //                   <div className="flex justify-between mt-6">
// //                     <button
// //                       type="button"
// //                       onClick={handlePrev}
// //                       className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
// //                     >
// //                       Back
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
// //                     >
// //                       Submit
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </form>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal to display lead details */}
// //       {showModal && leadDetails && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
// //             <h2 className="text-2xl font-bold mb-4">Lead Created</h2>
// //             <p>
// //               <strong>Name:</strong> {leadDetails.name}
// //             </p>
// //             <p>
// //               <strong>Email:</strong> {leadDetails.email}
// //             </p>
// //             <p>
// //               <strong>Subject:</strong> {leadDetails.onboarding.details.subject}
// //             </p>
// //             <p>
// //               <strong>Discussion Matter:</strong>{" "}
// //               {leadDetails.onboarding.details.discussionMatter}
// //             </p>
// //             <p>
// //               <strong>Lead Value:</strong>{" "}
// //               {leadDetails.onboarding.details.leadValue}
// //             </p>
// //             <p>
// //               <strong>Expected Close Date:</strong>{" "}
// //               {leadDetails.onboarding.details.expectedCloseDate
// //                 ? new Date(
// //                     leadDetails.onboarding.details.expectedCloseDate
// //                   ).toLocaleDateString()
// //                 : "N/A"}
// //             </p>
// //             {/* You can include additional details as needed */}
// //             <button
// //               onClick={() => setShowModal(false)}
// //               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default CreateLead;

// // CreateLead.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreateLead = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     password: "defaultPassword", // default password
//     onboarding: {
//       details: {
//         subject: "",
//         discussionMatter: "",
//         leadValue: "",
//         source: "",
//         type: "",
//         expectedCloseDate: "",
//       },
//       contactPersons: [
//         {
//           name: "",
//           emailType: "",
//           emailDetail: "",
//           contactNumberType: "",
//           mobileDetail: "",
//           organization: "",
//         },
//       ],
//       technologies: [{ item: "", price: "", quantity: "", amount: "" }],
//     },
//   });
//   const [toastMessage, setToastMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("onboarding.details.")) {
//       const field = name.split(".")[2];
//       setFormData((prev) => ({
//         ...prev,
//         onboarding: {
//           ...prev.onboarding,
//           details: { ...prev.onboarding.details, [field]: value },
//         },
//       }));
//     } else if (name.startsWith("onboarding.contactPersons")) {
//       const parts = name.split(".");
//       const indexMatch = parts[1].match(/\[(\d+)\]/);
//       const index = indexMatch ? parseInt(indexMatch[1]) : 0;
//       const field = parts[2];
//       setFormData((prev) => {
//         const updatedContacts = [...prev.onboarding.contactPersons];
//         updatedContacts[index] = { ...updatedContacts[index], [field]: value };
//         return {
//           ...prev,
//           onboarding: {
//             ...prev.onboarding,
//             contactPersons: updatedContacts,
//           },
//         };
//       });
//     } else if (name.startsWith("onboarding.technologies")) {
//       const parts = name.split(".");
//       const indexMatch = parts[1].match(/\[(\d+)\]/);
//       const index = indexMatch ? parseInt(indexMatch[1]) : 0;
//       const field = parts[2];
//       setFormData((prev) => {
//         const updatedTechs = [...prev.onboarding.technologies];
//         updatedTechs[index] = { ...updatedTechs[index], [field]: value };
//         return {
//           ...prev,
//           onboarding: {
//             ...prev.onboarding,
//             technologies: updatedTechs,
//           },
//         };
//       });
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleNext = () => setStep((prev) => prev + 1);
//   const handlePrev = () => setStep((prev) => prev - 1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Derive lead name and email from the first contact person
//     const contact = formData.onboarding.contactPersons[0];
//     const leadName = contact.name || "Unnamed Lead";
//     const leadEmail = contact.emailDetail || `lead_${Date.now()}@example.com`;

//     const preparedData = {
//       name: leadName,
//       email: leadEmail,
//       password: formData.password,
//       onboarding: {
//         ...formData.onboarding,
//         details: {
//           ...formData.onboarding.details,
//           leadValue: Number(formData.onboarding.details.leadValue) || 0,
//           expectedCloseDate: formData.onboarding.details.expectedCloseDate
//             ? new Date(formData.onboarding.details.expectedCloseDate)
//             : null,
//         },
//         technologies: formData.onboarding.technologies.map((tech) => ({
//           ...tech,
//           price: Number(tech.price) || 0,
//           quantity: Number(tech.quantity) || 0,
//           amount: Number(tech.amount) || 0,
//         })),
//       },
//     };

//     try {
//       await axios.post("http://localhost:5000/lead/createLead", preparedData);
//       setToastMessage("Lead created successfully!");
//       // After 2 seconds, redirect to the leads tab in the Admin Dashboard.
//       setTimeout(() => {
//         navigate("/admin?tab=3");
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//         <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
//           <div className="p-6">
//             <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
//               Create Lead
//             </h2>
//             <form onSubmit={handleSubmit}>
//               {step === 1 && (
//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">
//                     Step 1: Basic Details
//                   </h3>
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       name="onboarding.details.subject"
//                       placeholder="Subject"
//                       value={formData.onboarding.details.subject}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                       type="text"
//                       name="onboarding.details.discussionMatter"
//                       placeholder="Discussion Matter"
//                       value={formData.onboarding.details.discussionMatter}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                       type="number"
//                       name="onboarding.details.leadValue"
//                       placeholder="Lead Value"
//                       value={formData.onboarding.details.leadValue}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <select
//                       name="onboarding.details.source"
//                       value={formData.onboarding.details.source}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Select Source</option>
//                       <option value="source1">Source 1</option>
//                       <option value="source2">Source 2</option>
//                     </select>
//                     <select
//                       name="onboarding.details.type"
//                       value={formData.onboarding.details.type}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Select Type</option>
//                       <option value="type1">Type 1</option>
//                       <option value="type2">Type 2</option>
//                     </select>
//                     <input
//                       type="date"
//                       name="onboarding.details.expectedCloseDate"
//                       value={formData.onboarding.details.expectedCloseDate}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="flex justify-end mt-6">
//                     <button
//                       type="button"
//                       onClick={handleNext}
//                       className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {step === 2 && (
//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">
//                     Step 2: Contact Person
//                   </h3>
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       name="onboarding.contactPersons[0].name"
//                       placeholder="Contact Person Name"
//                       value={formData.onboarding.contactPersons[0].name}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <select
//                       name="onboarding.contactPersons[0].emailType"
//                       value={formData.onboarding.contactPersons[0].emailType}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Select Email Type</option>
//                       <option value="personal">Personal</option>
//                       <option value="work">Work</option>
//                       <option value="other">Other</option>
//                     </select>
//                     {formData.onboarding.contactPersons[0].emailType && (
//                       <input
//                         type="email"
//                         name="onboarding.contactPersons[0].emailDetail"
//                         placeholder="Enter Email Detail"
//                         value={
//                           formData.onboarding.contactPersons[0].emailDetail
//                         }
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     )}
//                     <select
//                       name="onboarding.contactPersons[0].contactNumberType"
//                       value={
//                         formData.onboarding.contactPersons[0].contactNumberType
//                       }
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Select Contact Number Type</option>
//                       <option value="mobile">Mobile</option>
//                       <option value="landline">Landline</option>
//                       <option value="other">Other</option>
//                     </select>
//                     {formData.onboarding.contactPersons[0]
//                       .contactNumberType && (
//                       <input
//                         type="text"
//                         name="onboarding.contactPersons[0].mobileDetail"
//                         placeholder="Enter Mobile Detail"
//                         value={
//                           formData.onboarding.contactPersons[0].mobileDetail
//                         }
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     )}
//                     <input
//                       type="text"
//                       name="onboarding.contactPersons[0].organization"
//                       placeholder="Organization"
//                       value={formData.onboarding.contactPersons[0].organization}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="flex justify-between mt-6">
//                     <button
//                       type="button"
//                       onClick={handlePrev}
//                       className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleNext}
//                       className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {step === 3 && (
//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">
//                     Step 3: Technologies
//                   </h3>
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       name="onboarding.technologies[0].item"
//                       placeholder="Item"
//                       value={formData.onboarding.technologies[0].item}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                       type="number"
//                       name="onboarding.technologies[0].price"
//                       placeholder="Price"
//                       value={formData.onboarding.technologies[0].price}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                       type="number"
//                       name="onboarding.technologies[0].quantity"
//                       placeholder="Quantity"
//                       value={formData.onboarding.technologies[0].quantity}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                       type="number"
//                       name="onboarding.technologies[0].amount"
//                       placeholder="Amount"
//                       value={formData.onboarding.technologies[0].amount}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="flex justify-between mt-6">
//                     <button
//                       type="button"
//                       onClick={handlePrev}
//                       className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>

//       {toastMessage && (
//         <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
//           {toastMessage}
//         </div>
//       )}
//     </>
//   );
// };

// export default CreateLead;

import React, { useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const CreateLead = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: "defaultPassword", // default password
    onboarding: {
      details: {
        subject: "",
        discussionMatter: "",
        leadValue: "",
        source: "",
        type: "",
        expectedCloseDate: "",
      },
      contactPersons: [
        {
          name: "",
          emailType: "",
          emailDetail: "",
          contactNumberType: "",
          mobileDetail: "",
          organization: "",
        },
      ],
      technologies: [{ item: "", price: "", quantity: "", amount: "" }],
    },
  });
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // Use lodash.set to safely update nested state properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev };
      _.set(updatedData, name, value);
      return updatedData;
    });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Derive lead name and email from the first contact person
    const contact = formData.onboarding.contactPersons[0];
    const leadName = contact.name || "Unnamed Lead";
    const leadEmail = contact.emailDetail || `lead_${Date.now()}@example.com`;

    const preparedData = {
      name: leadName,
      email: leadEmail,
      password: formData.password,
      onboarding: {
        ...formData.onboarding,
        details: {
          ...formData.onboarding.details,
          leadValue: Number(formData.onboarding.details.leadValue) || 0,
          expectedCloseDate: formData.onboarding.details.expectedCloseDate
            ? new Date(formData.onboarding.details.expectedCloseDate)
            : null,
        },
        technologies: formData.onboarding.technologies.map((tech) => ({
          ...tech,
          price: Number(tech.price) || 0,
          quantity: Number(tech.quantity) || 0,
          amount: Number(tech.amount) || 0,
        })),
      },
    };

    console.log("Prepared Data:", preparedData);

    try {
      await axios.post("http://localhost:5000/lead/createLead", preparedData);
      setToastMessage("Lead created successfully!");
      // Redirect after a delay (e.g., to the admin dashboard tab)
      setTimeout(() => {
        navigate("/admin?tab=3");
      }, 2000);
    } catch (err) {
      console.error("Error creating lead:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
              Create Lead
            </h2>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Step 1: Basic Details
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="onboarding.details.subject"
                      placeholder="Subject"
                      value={formData.onboarding.details.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="onboarding.details.discussionMatter"
                      placeholder="Discussion Matter"
                      value={formData.onboarding.details.discussionMatter}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="onboarding.details.leadValue"
                      placeholder="Lead Value"
                      value={formData.onboarding.details.leadValue}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      name="onboarding.details.source"
                      value={formData.onboarding.details.source}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Source</option>
                      <option value="source1">Source 1</option>
                      <option value="source2">Source 2</option>
                    </select>
                    <select
                      name="onboarding.details.type"
                      value={formData.onboarding.details.type}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="type1">Type 1</option>
                      <option value="type2">Type 2</option>
                    </select>
                    <input
                      type="date"
                      name="onboarding.details.expectedCloseDate"
                      value={formData.onboarding.details.expectedCloseDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Step 2: Contact Person
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="onboarding.contactPersons[0].name"
                      placeholder="Contact Person Name"
                      value={formData.onboarding.contactPersons[0].name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      name="onboarding.contactPersons[0].emailType"
                      value={formData.onboarding.contactPersons[0].emailType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Email Type</option>
                      <option value="personal">Personal</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                    {formData.onboarding.contactPersons[0].emailType && (
                      <input
                        type="email"
                        name="onboarding.contactPersons[0].emailDetail"
                        placeholder="Enter Email Detail"
                        value={
                          formData.onboarding.contactPersons[0].emailDetail
                        }
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                    <select
                      name="onboarding.contactPersons[0].contactNumberType"
                      value={
                        formData.onboarding.contactPersons[0].contactNumberType
                      }
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Contact Number Type</option>
                      <option value="mobile">Mobile</option>
                      <option value="landline">Landline</option>
                      <option value="other">Other</option>
                    </select>
                    {formData.onboarding.contactPersons[0]
                      .contactNumberType && (
                      <input
                        type="text"
                        name="onboarding.contactPersons[0].mobileDetail"
                        placeholder="Enter Mobile Detail"
                        value={
                          formData.onboarding.contactPersons[0].mobileDetail
                        }
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                    <input
                      type="text"
                      name="onboarding.contactPersons[0].organization"
                      placeholder="Organization"
                      value={formData.onboarding.contactPersons[0].organization}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Step 3: Technologies
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="onboarding.technologies[0].item"
                      placeholder="Item"
                      value={formData.onboarding.technologies[0].item}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="onboarding.technologies[0].price"
                      placeholder="Price"
                      value={formData.onboarding.technologies[0].price}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="onboarding.technologies[0].quantity"
                      placeholder="Quantity"
                      value={formData.onboarding.technologies[0].quantity}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="onboarding.technologies[0].amount"
                      placeholder="Amount"
                      value={formData.onboarding.technologies[0].amount}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default CreateLead;
