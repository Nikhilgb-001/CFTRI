import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  Bell,
  Contact,
  Cpu,
  Edit2,
  Trash2,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Calendar,
  Hash,
  Smartphone,
  Mail,
  Building,
  Package,
  Tag,
  MapPin,
  Info,
  FileText,
  Phone,
  Briefcase,
  Globe,
  Layers,
  Search,
  Filter,
  ArrowLeft,
} from "lucide-react";

// Option arrays for the Technologies dropdowns
const broadAreaOptions = [
  "Amla",
  "Annatto",
  "Apple",
  "Asafoetida",
  "Bajra",
  "Banana",
  "Barley",
  "Bengal gram",
  "Bisibele bath",
  "Bitter gourd",
  "Broccoli",
  "Cardamom",
  "Carrot",
  "Cashew",
  "Chestnut",
  "Chicken",
  "Chilli",
  "Cocoa",
  "Coconut",
  "Coffee",
  "Coriander",
  "Corn",
  "Curd",
  "Custard apple",
  "Dates",
  "Decalepis",
  "Drumstick",
  "Egg",
  "Fenugreek",
  "Figs",
  "Fish",
  "Foxtail millet",
  "Garcinia",
  "Garlic",
  "Ginger",
  "Grapes",
  "Green gram",
  "Ground nut",
  "Guava",
  "Honey",
  "Horse gram",
  "Jackfruit",
  "Jamoon",
  "Jowar",
  "Kakra",
  "Kokum",
  "Legume",
  "Lemon",
  "Lime",
  "Litchi",
  "Maize",
  "Mango",
  "Mangosteen",
  "Marigold",
  "Meat",
  "Milk",
  "Moringa",
  "Moth bean",
  "Mushroom",
  "Mustard",
  "Mutton",
  "Neera",
  "Niger seeds",
  "Oil",
  "Onion",
  "Orange",
  "Paan",
  "Papaya",
  "Peanut",
  "Pear",
  "Pearl millet",
  "Pepper",
  "Pomegranate",
  "Pongal",
  "Pork",
  "Potato",
  "Prawn",
  "Ragi",
  "Rice",
  "Rusk",
  "Semolina",
  "Sesame",
  "Soya",
  "Spirulina",
  "Sugarcane",
  "Sweet potato",
  "Tamarind",
  "Tea",
  "Tender coconut",
  "Thepla",
  "Tomato",
  "Turmeric",
  "Vanilla",
  "Wheat",
];

const commoditiesOptions = [
  // You can modify this list if needed; currently using the same set as broadAreaOptions.
  ...broadAreaOptions,
];

const keywordsOptions = [
  "Aflatoxin",
  "Alphonso",
  "Ammonium",
  "Atta",
  "Baking",
  "Besan",
  "Beta carotene",
  "Beverages",
  "Bifido",
  "Bioactive",
  "Biriyani",
  "Biscuits",
  "Blend",
  "Bombay halwa",
  "Boondi",
  "Bottled",
  "Bread",
  "Brine",
  "Bun",
  "Burfi",
  "Burger",
  "Cake",
  "Candy",
  "Canned",
  "Carbonated",
  "Cavend",
  "Cereal",
  "Chapathi",
  "Chestnut",
  "Chicken",
  "Chikki",
  "Chips",
  "Chlorogenic acid",
  "Chocolate",
  "Chutney",
  "Cola",
  "Colourant",
  "Composite flour",
  "Concentrate",
  "Continuous",
  "Cookies",
  "Coriander leaves",
  "Cubes",
  "Cupcake",
  "Curing",
  "Curry paste",
  "De skinning",
  "Dehulling",
  "Dehydration",
  "Desiccasted",
  "Dhal",
  "Dhal mill",
  "Diabetes",
  "Dipping oil",
  "Disinfection",
  "Dosa",
  "Dough",
  "Dye",
  "Edible oil",
  "EDTA Solution",
  "Eggless",
  "Energy food",
  "Enrichment",
  "Enzyme",
  "Extraction",
  "Fat replacer",
  "Fermentation",
  "Fiber",
  "Flakes",
  "Flavour",
  "Flour",
  "Forming",
  "Fortification",
  "Fried",
  "Fruits",
  "Gelatin",
  "GI",
  "Gluten free",
  "Gravy",
  "Green",
  "Grinding",
  "Halwa",
  "Hand operated",
  "Healthy food",
  "Heat resistant",
  "High fiber",
  "High protein",
  "Hot air",
  "Idly",
  "Innoculum",
  "Instant",
  "Jam",
  "Jamoon",
  "Jelly",
  "Juice",
  "Kabab",
  "Ketchup",
  "Khakhra",
  "Kheer",
  "Kofta",
  "Laddu",
  "Legumes",
  "Levening",
  "Lime",
  "Liquid fruits",
  "Low fat",
  "Low sugar",
  "Machinery",
  "Maida",
  "Malted",
  "Microbial production",
  "Millets",
  "Mineral",
  "Minimally",
  "Moulding",
  "Mouth freshner",
  "Muffin",
  "Multigrain",
  "Natural",
  "Non thermal processing",
  "Non-Vegetarian",
  "Noodle",
  "North indian",
  "Nutriblend",
  "Nutrient",
  "Nutrition",
  "Oleoresin",
  "Oligosaccharides",
  "Osmodrying",
  "Oyster mushroom",
  "Ozone",
  "Paan",
  "Packaging",
  "Paddu",
  "Papad",
  "Parotta",
  "Pasta",
  "Paste",
  "Payasam",
  "Peanut butter",
  "Pickle",
  "Plant growth",
  "Polyphenols",
  "Popping",
  "Porridge",
  "Poultry",
  "Powder",
  "Prawn",
  "Preservation",
  "Probiotic",
  "Protein",
  "Protocol",
  "Puffed",
  "Puliogare",
  "Pulp",
  "Pulses",
  "Radical scavenging",
  "Rava",
  "Ready mix",
  "Ready to cook",
  "Ready to eat",
  "Ready to fry",
  "Ready to serve",
  "Retort",
  "Rhizome",
  "Roasted",
  "Roller mill",
  "Roti",
  "Rural production",
  "Rusk",
  "Salad",
  "Sambar",
  "Sauce",
  "Sausage",
  "Seed separator",
  "Seeds",
  "Semolina",
  "Sheeting",
  "Shelf life",
  "Shelf stable",
  "Shipping",
  "Smoky odour",
  "Snacks",
  "Sooji",
  "Soup",
  "South indian",
  "Spices",
  "Spread",
  "Squash",
  "Stabilised",
  "Sugar free",
  "Super food",
  "Supplement",
  "Swallow",
  "Sweet mix",
  "Syrup",
  "Table top",
  "Technology",
  "Testa remover",
  "Thepla",
  "Tissue Culture",
  "Traditional foods",
  "Tuti-fruti",
  "Upma",
  "Vada",
  "Vanilla",
  "Vegetables",
  "Vegetarian",
  "Vermicelli",
  "Virgin coconut oil",
  "Vitamin",
  "Wafers",
  "Waste utilisation",
  "Water",
  "Wet heat processing",
  "Whey protein",
  "White pepper",
  "Wine",
  "Zerumbone",
  "Zinc",
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    contacts: true,
    technologies: true,
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setUser(res.data);
        setEditFormData(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile data", { autoClose: 3000 });
      }
    };
    fetchProfile();
  }, [token]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Account deleted successfully!", { autoClose: 2000 });
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete account. Please try again.", {
          autoClose: 3000,
        });
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedEditChange = (e, section, index) => {
    const { name, value } = e.target;
    setEditFormData((prev) => {
      const updatedSection = [...prev.onboarding[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      return {
        ...prev,
        onboarding: { ...prev.onboarding, [section]: updatedSection },
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/profile",
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      setEditing(false);
      toast.success("Profile updated successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  // For date inputs
  const today = new Date().toISOString().split("T")[0];

  // return (
  //   <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
  //     <ToastContainer position="top-center" />
  //     <div className="max-w-6xl mx-auto">
  //       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
  //         {/* Header */}
  //         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white">
  //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
  //             <div>
  //               <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
  //                 <User className="mr-3 h-8 w-8" />
  //                 Profile Settings
  //               </h1>
  //               <p className="mt-2 opacity-90">
  //                 {editing
  //                   ? "Edit your profile information"
  //                   : "View and manage your profile"}
  //               </p>
  //             </div>
  //             {!editing && (
  //               <div className="mt-4 sm:mt-0 flex space-x-3">
  //                 <button
  //                   onClick={() => setEditing(true)}
  //                   className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center"
  //                 >
  //                   <Edit2 className="h-5 w-5 mr-2" />
  //                   Edit Profile
  //                 </button>
  //                 <button
  //                   onClick={handleDelete}
  //                   className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 flex items-center"
  //                 >
  //                   <Trash2 className="h-5 w-5 mr-2" />
  //                   Delete Account
  //                 </button>
  //               </div>
  //             )}
  //           </div>
  //         </div>

  //         {/* Main Content */}
  //         <div className="p-6 sm:p-8">
  //           {!editing ? (
  //             <div className="flex flex-col lg:flex-row gap-8">
  //               {/* Sidebar Navigation */}
  //               <div className="lg:w-1/4">
  //                 <div className="bg-gray-50 rounded-xl p-4 sticky top-8">
  //                   <nav className="space-y-1">
  //                     <button
  //                       onClick={() => setActiveTab("basic")}
  //                       className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center ${
  //                         activeTab === "basic"
  //                           ? "bg-blue-100 text-blue-700"
  //                           : "text-gray-700 hover:bg-gray-100"
  //                       }`}
  //                     >
  //                       <User className="h-5 w-5 mr-3" />
  //                       Basic Information
  //                     </button>
  //                     {user.onboarding && (
  //                       <>
  //                         <button
  //                           onClick={() => setActiveTab("details")}
  //                           className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center ${
  //                             activeTab === "details"
  //                               ? "bg-blue-100 text-blue-700"
  //                               : "text-gray-700 hover:bg-gray-100"
  //                           }`}
  //                         >
  //                           <Bell className="h-5 w-5 mr-3" />
  //                           Onboarding Details
  //                         </button>
  //                         <button
  //                           onClick={() => setActiveTab("contacts")}
  //                           className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center ${
  //                             activeTab === "contacts"
  //                               ? "bg-blue-100 text-blue-700"
  //                               : "text-gray-700 hover:bg-gray-100"
  //                           }`}
  //                         >
  //                           <Contact className="h-5 w-5 mr-3" />
  //                           Contact Persons
  //                         </button>
  //                         <button
  //                           onClick={() => setActiveTab("technologies")}
  //                           className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center ${
  //                             activeTab === "technologies"
  //                               ? "bg-blue-100 text-blue-700"
  //                               : "text-gray-700 hover:bg-gray-100"
  //                           }`}
  //                         >
  //                           <Cpu className="h-5 w-5 mr-3" />
  //                           Technologies
  //                         </button>
  //                       </>
  //                     )}
  //                   </nav>
  //                 </div>
  //               </div>

  //               {/* Content Area */}
  //               <div className="lg:w-3/4">
  //                 {activeTab === "basic" && (
  //                   <div className="bg-white rounded-xl p-6 shadow-sm">
  //                     <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center">
  //                       <User className="h-5 w-5 mr-2" />
  //                       Basic Information
  //                     </h2>
  //                     <div className="space-y-4">
  //                       <div className="flex flex-col sm:flex-row">
  //                         <div className="sm:w-1/3 text-gray-600 font-medium flex items-center">
  //                           <User className="h-4 w-4 mr-2" />
  //                           Name
  //                         </div>
  //                         <div className="sm:w-2/3 text-gray-800">
  //                           {user.name}
  //                         </div>
  //                       </div>
  //                       <div className="flex flex-col sm:flex-row">
  //                         <div className="sm:w-1/3 text-gray-600 font-medium flex items-center">
  //                           <Mail className="h-4 w-4 mr-2" />
  //                           Email
  //                         </div>
  //                         <div className="sm:w-2/3 text-gray-800">
  //                           {user.email}
  //                         </div>
  //                       </div>
  //                       <div className="flex flex-col sm:flex-row">
  //                         <div className="sm:w-1/3 text-gray-600 font-medium flex items-center">
  //                           <Smartphone className="h-4 w-4 mr-2" />
  //                           Contact
  //                         </div>
  //                         <div className="sm:w-2/3 text-gray-800">
  //                           {user.contact ||
  //                             user.onboarding?.contactPersons?.[0]
  //                               ?.mobileDetail ||
  //                             "Not provided"}
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 )}

  //                 {activeTab === "details" && user.onboarding && (
  //                   <div className="bg-white rounded-xl shadow-sm">
  //                     <div className="p-6 border-b border-gray-200">
  //                       <h2 className="text-xl font-bold text-gray-800 flex items-center">
  //                         <Bell className="h-5 w-5 mr-2" />
  //                         Onboarding Details
  //                       </h2>
  //                     </div>
  //                     <div className="p-6">
  //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                         <div className="flex items-start">
  //                           <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                             <Hash className="h-5 w-5 text-blue-600" />
  //                           </div>
  //                           <div>
  //                             <div className="text-gray-600 font-medium mb-1">
  //                               Subject
  //                             </div>
  //                             <div className="text-gray-800">
  //                               {user.onboarding.details.subject}
  //                             </div>
  //                           </div>
  //                         </div>
  //                         <div className="flex items-start">
  //                           <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                             <Bell className="h-5 w-5 text-blue-600" />
  //                           </div>
  //                           <div>
  //                             <div className="text-gray-600 font-medium mb-1">
  //                               Discussion Matter
  //                             </div>
  //                             <div className="text-gray-800">
  //                               {user.onboarding.details.discussionMatter}
  //                             </div>
  //                           </div>
  //                         </div>
  //                         {/* Remove Lead Value and Source since they were removed */}
  //                         <div className="flex items-start">
  //                           <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                             <Package className="h-5 w-5 text-blue-600" />
  //                           </div>
  //                           <div>
  //                             <div className="text-gray-600 font-medium mb-1">
  //                               Type
  //                             </div>
  //                             <div className="text-gray-800">
  //                               {user.onboarding.details.type}
  //                             </div>
  //                           </div>
  //                         </div>
  //                         <div className="flex items-start">
  //                           <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                             <Calendar className="h-5 w-5 text-blue-600" />
  //                           </div>
  //                           <div>
  //                             <div className="text-gray-600 font-medium mb-1">
  //                               Expected Close Date
  //                             </div>
  //                             <div className="text-gray-800">
  //                               {new Date(
  //                                 user.onboarding.details.expectedCloseDate
  //                               ).toLocaleDateString("en-US", {
  //                                 year: "numeric",
  //                                 month: "long",
  //                                 day: "numeric",
  //                               })}
  //                             </div>
  //                           </div>
  //                         </div>
  //                         {/* Specific Option */}
  //                         <div className="flex items-start">
  //                           <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                             <Tag className="h-5 w-5 text-blue-600" />
  //                           </div>
  //                           <div>
  //                             <div className="text-gray-600 font-medium mb-1">
  //                               Specific Option
  //                             </div>
  //                             <div className="text-gray-800">
  //                               {user.onboarding.details.specificOption ||
  //                                 "Not selected"}
  //                             </div>
  //                           </div>
  //                         </div>

  //                         {/* State */}
  //                         <div className="flex items-start">
  //                           <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                             <MapPin className="h-5 w-5 text-blue-600" />
  //                           </div>
  //                           <div>
  //                             <div className="text-gray-600 font-medium mb-1">
  //                               State
  //                             </div>
  //                             <div className="text-gray-800">
  //                               {user.onboarding.details.state ||
  //                                 "Not provided"}
  //                             </div>
  //                           </div>
  //                         </div>

  //                         {/* Place */}
  //                         <div className="flex items-start">
  //                           <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                             <Building className="h-5 w-5 text-blue-600" />
  //                           </div>
  //                           <div>
  //                             <div className="text-gray-600 font-medium mb-1">
  //                               Place
  //                             </div>
  //                             <div className="text-gray-800">
  //                               {user.onboarding.details.place ||
  //                                 "Not provided"}
  //                             </div>
  //                           </div>
  //                         </div>

  //                         {/* Design Improvement */}
  //                         <div className="flex items-start">
  //                           <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                             <Edit2 className="h-5 w-5 text-blue-600" />
  //                           </div>
  //                           <div>
  //                             <div className="text-gray-600 font-medium mb-1">
  //                               Design Improvement
  //                             </div>
  //                             <div className="text-gray-800">
  //                               {user.onboarding.details.designImprovement ||
  //                                 "Not provided"}
  //                             </div>
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 )}

  //                 {activeTab === "contacts" && user.onboarding && (
  //                   <div className="bg-white rounded-xl shadow-sm">
  //                     <div
  //                       className="p-6 border-b border-gray-200 cursor-pointer flex justify-between items-center"
  //                       onClick={() => toggleSection("contacts")}
  //                     >
  //                       <h2 className="text-xl font-bold text-gray-800 flex items-center">
  //                         <Contact className="h-5 w-5 mr-2" />
  //                         Contact Persons
  //                       </h2>
  //                       {expandedSections.contacts ? (
  //                         <ChevronDown className="h-5 w-5 text-gray-500" />
  //                       ) : (
  //                         <ChevronRight className="h-5 w-5 text-gray-500" />
  //                       )}
  //                     </div>
  //                     {expandedSections.contacts && (
  //                       <div className="p-6">
  //                         <div className="space-y-6">
  //                           {user.onboarding.contactPersons.map(
  //                             (contact, idx) => (
  //                               <div
  //                                 key={idx}
  //                                 className="bg-gray-50 rounded-lg p-5 border border-gray-200"
  //                               >
  //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                                   <div className="flex items-start">
  //                                     <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                                       <User className="h-5 w-5 text-blue-600" />
  //                                     </div>
  //                                     <div>
  //                                       <div className="text-gray-600 font-medium mb-1">
  //                                         Name
  //                                       </div>
  //                                       <div className="text-gray-800">
  //                                         {contact.name}
  //                                       </div>
  //                                     </div>
  //                                   </div>
  //                                   <div className="flex items-start">
  //                                     <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                                       <Mail className="h-5 w-5 text-blue-600" />
  //                                     </div>
  //                                     <div>
  //                                       <div className="text-gray-600 font-medium mb-1">
  //                                         Email
  //                                       </div>
  //                                       <div className="text-gray-800">
  //                                         {contact.emailDetail}
  //                                       </div>
  //                                     </div>
  //                                   </div>
  //                                   <div className="flex items-start">
  //                                     <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                                       <Smartphone className="h-5 w-5 text-blue-600" />
  //                                     </div>
  //                                     <div>
  //                                       <div className="text-gray-600 font-medium mb-1">
  //                                         Mobile
  //                                       </div>
  //                                       <div className="text-gray-800">
  //                                         {contact.mobileDetail}
  //                                       </div>
  //                                     </div>
  //                                   </div>
  //                                   <div className="flex items-start">
  //                                     <div className="bg-blue-100 p-2 rounded-lg mr-4">
  //                                       <Building className="h-5 w-5 text-blue-600" />
  //                                     </div>
  //                                     <div>
  //                                       <div className="text-gray-600 font-medium mb-1">
  //                                         Organization
  //                                       </div>
  //                                       <div className="text-gray-800">
  //                                         {contact.organization}
  //                                       </div>
  //                                     </div>
  //                                   </div>
  //                                 </div>
  //                               </div>
  //                             )
  //                           )}
  //                         </div>
  //                       </div>
  //                     )}
  //                   </div>
  //                 )}

  //                 {activeTab === "technologies" && user.onboarding && (
  //                   <div className="bg-white rounded-xl shadow-sm">
  //                     <div
  //                       className="p-6 border-b border-gray-200 cursor-pointer flex justify-between items-center"
  //                       onClick={() => toggleSection("technologies")}
  //                     >
  //                       <h2 className="text-xl font-bold text-gray-800 flex items-center">
  //                         <Cpu className="h-5 w-5 mr-2" />
  //                         Technologies
  //                       </h2>
  //                       {expandedSections.technologies ? (
  //                         <ChevronDown className="h-5 w-5 text-gray-500" />
  //                       ) : (
  //                         <ChevronRight className="h-5 w-5 text-gray-500" />
  //                       )}
  //                     </div>
  //                     {expandedSections.technologies && (
  //                       <div className="p-6">
  //                         <div className="overflow-x-auto">
  //                           <table className="min-w-full divide-y divide-gray-200">
  //                             <thead className="bg-gray-50">
  //                               <tr>
  //                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                                   Category
  //                                 </th>
  //                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                                   Selected Technology
  //                                 </th>
  //                               </tr>
  //                             </thead>
  //                             <tbody className="bg-white divide-y divide-gray-200">
  //                               {user.onboarding.technologies.map(
  //                                 (tech, idx) => {
  //                                   let category = "";
  //                                   if (idx === 0) category = "Broad Area";
  //                                   else if (idx === 1) category = "Commodity";
  //                                   else if (idx === 2) category = "Keyword";
  //                                   return (
  //                                     <tr key={idx}>
  //                                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
  //                                         {category}
  //                                       </td>
  //                                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
  //                                         {tech.item || "Not selected"}
  //                                       </td>
  //                                     </tr>
  //                                   );
  //                                 }
  //                               )}
  //                             </tbody>
  //                           </table>
  //                         </div>
  //                       </div>
  //                     )}
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           ) : (
  //             <form onSubmit={handleSave} className="space-y-8">
  //               <div className="flex flex-col lg:flex-row gap-8">
  //                 {/* Sidebar Navigation */}
  //                 <div className="lg:w-1/4">
  //                   <div className="bg-gray-50 rounded-xl p-4 sticky top-8">
  //                     <nav className="space-y-1">
  //                       <button
  //                         type="button"
  //                         onClick={() => setActiveTab("basic")}
  //                         className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center ${
  //                           activeTab === "basic"
  //                             ? "bg-blue-100 text-blue-700"
  //                             : "text-gray-700 hover:bg-gray-100"
  //                         }`}
  //                       >
  //                         <User className="h-5 w-5 mr-3" />
  //                         Basic Information
  //                       </button>
  //                       {editFormData.onboarding && (
  //                         <>
  //                           <button
  //                             type="button"
  //                             onClick={() => setActiveTab("details")}
  //                             className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center ${
  //                               activeTab === "details"
  //                                 ? "bg-blue-100 text-blue-700"
  //                                 : "text-gray-700 hover:bg-gray-100"
  //                             }`}
  //                           >
  //                             <Bell className="h-5 w-5 mr-3" />
  //                             Onboarding Details
  //                           </button>
  //                           <button
  //                             type="button"
  //                             onClick={() => setActiveTab("contacts")}
  //                             className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center ${
  //                               activeTab === "contacts"
  //                                 ? "bg-blue-100 text-blue-700"
  //                                 : "text-gray-700 hover:bg-gray-100"
  //                             }`}
  //                           >
  //                             <Contact className="h-5 w-5 mr-3" />
  //                             Contact Persons
  //                           </button>
  //                           <button
  //                             type="button"
  //                             onClick={() => setActiveTab("technologies")}
  //                             className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center ${
  //                               activeTab === "technologies"
  //                                 ? "bg-blue-100 text-blue-700"
  //                                 : "text-gray-700 hover:bg-gray-100"
  //                             }`}
  //                           >
  //                             <Cpu className="h-5 w-5 mr-3" />
  //                             Technologies
  //                           </button>
  //                         </>
  //                       )}
  //                     </nav>
  //                   </div>
  //                 </div>

  //                 {/* Content Area */}
  //                 <div className="lg:w-3/4">
  //                   {activeTab === "basic" && (
  //                     <div className="bg-white rounded-xl p-6 shadow-sm">
  //                       <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center">
  //                         <User className="h-5 w-5 mr-2" />
  //                         Basic Information
  //                       </h2>
  //                       <div className="space-y-4">
  //                         <div>
  //                           <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                             <User className="h-4 w-4 mr-2" />
  //                             Name
  //                           </label>
  //                           <input
  //                             type="text"
  //                             name="name"
  //                             value={editFormData.name || ""}
  //                             onChange={handleEditChange}
  //                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                           />
  //                         </div>
  //                         <div>
  //                           <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                             <Mail className="h-4 w-4 mr-2" />
  //                             Email
  //                           </label>
  //                           <input
  //                             type="email"
  //                             name="email"
  //                             value={editFormData.email || ""}
  //                             onChange={handleEditChange}
  //                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                           />
  //                         </div>
  //                         <div>
  //                           <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                             <Smartphone className="h-4 w-4 mr-2" />
  //                             Contact
  //                           </label>
  //                           <input
  //                             type="text"
  //                             name="contact"
  //                             value={editFormData.contact || ""}
  //                             onChange={handleEditChange}
  //                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                           />
  //                         </div>
  //                       </div>
  //                     </div>
  //                   )}

  //                   {activeTab === "details" && editFormData.onboarding && (
  //                     <div className="bg-white rounded-xl p-6 shadow-sm">
  //                       <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center">
  //                         <Bell className="h-5 w-5 mr-2" />
  //                         Onboarding Details
  //                       </h2>
  //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                         <div>
  //                           <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                             <Hash className="h-4 w-4 mr-2" />
  //                             Subject
  //                           </label>
  //                           <input
  //                             type="text"
  //                             name="subject"
  //                             value={
  //                               editFormData.onboarding.details.subject || ""
  //                             }
  //                             onChange={handleEditChange}
  //                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                           />
  //                         </div>
  //                         <div>
  //                           <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                             <Bell className="h-4 w-4 mr-2" />
  //                             Discussion Matter
  //                           </label>
  //                           <input
  //                             type="text"
  //                             name="discussionMatter"
  //                             value={
  //                               editFormData.onboarding.details
  //                                 .discussionMatter || ""
  //                             }
  //                             onChange={handleEditChange}
  //                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                           />
  //                         </div>
  //                         {/* Optionally remove leadValue and source editing here */}
  //                         <div>
  //                           <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                             <Package className="h-4 w-4 mr-2" />
  //                             Type
  //                           </label>
  //                           <input
  //                             type="text"
  //                             name="type"
  //                             value={editFormData.onboarding.details.type || ""}
  //                             onChange={handleEditChange}
  //                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                           />
  //                         </div>
  //                         <div>
  //                           <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                             <Calendar className="h-4 w-4 mr-2" />
  //                             Expected Close Date
  //                           </label>
  //                           <input
  //                             type="date"
  //                             name="expectedCloseDate"
  //                             value={
  //                               editFormData.onboarding.details
  //                                 .expectedCloseDate || ""
  //                             }
  //                             onChange={handleEditChange}
  //                             min={today}
  //                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                           />
  //                         </div>
  //                       </div>
  //                     </div>
  //                   )}

  //                   {activeTab === "contacts" && editFormData.onboarding && (
  //                     <div className="bg-white rounded-xl p-6 shadow-sm">
  //                       <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center">
  //                         <Contact className="h-5 w-5 mr-2" />
  //                         Contact Persons
  //                       </h2>
  //                       <div className="space-y-6">
  //                         {editFormData.onboarding.contactPersons.map(
  //                           (contact, idx) => (
  //                             <div
  //                               key={idx}
  //                               className="bg-gray-50 rounded-lg p-5 border border-gray-200"
  //                             >
  //                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                                 <div>
  //                                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                                     <User className="h-4 w-4 mr-2" />
  //                                     Name
  //                                   </label>
  //                                   <input
  //                                     type="text"
  //                                     name="name"
  //                                     value={contact.name || ""}
  //                                     onChange={(e) =>
  //                                       handleNestedEditChange(
  //                                         e,
  //                                         "contactPersons",
  //                                         idx
  //                                       )
  //                                     }
  //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                                   />
  //                                 </div>
  //                                 <div>
  //                                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                                     <Mail className="h-4 w-4 mr-2" />
  //                                     Email
  //                                   </label>
  //                                   <input
  //                                     type="email"
  //                                     name="emailDetail"
  //                                     value={contact.emailDetail || ""}
  //                                     onChange={(e) =>
  //                                       handleNestedEditChange(
  //                                         e,
  //                                         "contactPersons",
  //                                         idx
  //                                       )
  //                                     }
  //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                                   />
  //                                 </div>
  //                                 <div>
  //                                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                                     <Smartphone className="h-4 w-4 mr-2" />
  //                                     Mobile
  //                                   </label>
  //                                   <input
  //                                     type="text"
  //                                     name="mobileDetail"
  //                                     value={contact.mobileDetail || ""}
  //                                     onChange={(e) =>
  //                                       handleNestedEditChange(
  //                                         e,
  //                                         "contactPersons",
  //                                         idx
  //                                       )
  //                                     }
  //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                                   />
  //                                 </div>
  //                                 <div>
  //                                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                                     <Building className="h-4 w-4 mr-2" />
  //                                     Organization
  //                                   </label>
  //                                   <input
  //                                     type="text"
  //                                     name="organization"
  //                                     value={contact.organization || ""}
  //                                     onChange={(e) =>
  //                                       handleNestedEditChange(
  //                                         e,
  //                                         "contactPersons",
  //                                         idx
  //                                       )
  //                                     }
  //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                                   />
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           )
  //                         )}
  //                       </div>
  //                     </div>
  //                   )}

  //                   {activeTab === "technologies" &&
  //                     editFormData.onboarding && (
  //                       <div className="bg-white rounded-xl p-6 shadow-sm">
  //                         <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center">
  //                           <Cpu className="h-5 w-5 mr-2" />
  //                           Technologies
  //                         </h2>
  //                         <div className="space-y-6">
  //                           {editFormData.onboarding.technologies.map(
  //                             (tech, idx) => {
  //                               let label = "";
  //                               let options = [];
  //                               if (idx === 0) {
  //                                 label = "Broad Area";
  //                                 options = broadAreaOptions;
  //                               } else if (idx === 1) {
  //                                 label = "Commodity";
  //                                 options = commoditiesOptions;
  //                               } else if (idx === 2) {
  //                                 label = "Keyword";
  //                                 options = keywordsOptions;
  //                               }
  //                               return (
  //                                 <div
  //                                   key={idx}
  //                                   className="bg-gray-50 rounded-lg p-5 border border-gray-200"
  //                                 >
  //                                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
  //                                     {label}
  //                                   </label>
  //                                   <select
  //                                     name="item"
  //                                     value={tech.item || ""}
  //                                     onChange={(e) =>
  //                                       handleNestedEditChange(
  //                                         e,
  //                                         "technologies",
  //                                         idx
  //                                       )
  //                                     }
  //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  //                                   >
  //                                     <option value="">Select {label}</option>
  //                                     {options.map((opt, i) => (
  //                                       <option key={i} value={opt}>
  //                                         {opt}
  //                                       </option>
  //                                     ))}
  //                                   </select>
  //                                 </div>
  //                               );
  //                             }
  //                           )}
  //                         </div>
  //                       </div>
  //                     )}
  //                 </div>
  //               </div>

  //               <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
  //                 <button
  //                   type="submit"
  //                   className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center"
  //                 >
  //                   <Check className="h-5 w-5 mr-2" />
  //                   Save Changes
  //                 </button>
  //                 <button
  //                   type="button"
  //                   onClick={() => setEditing(false)}
  //                   className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 flex items-center"
  //                 >
  //                   <X className="h-5 w-5 mr-2" />
  //                   Cancel
  //                 </button>
  //               </div>
  //             </form>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Profile Settings
                  </h1>
                  <p className="mt-1 opacity-90">
                    {editing
                      ? "Edit your profile details"
                      : "View and manage your profile"}
                  </p>
                </div>
              </div>

              {!editing ? (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-white/90 text-indigo-600 px-5 py-2.5 rounded-lg font-medium hover:bg-white transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                  >
                    <Edit2 className="h-5 w-5 mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-white/10 border border-white/20 px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 flex items-center justify-center hover:shadow-inner"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Delete Account
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-white/10 border border-white/20 px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 flex items-center hover:shadow-inner"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to View
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                Profile Sections
              </h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-colors duration-150 ${
                    activeTab === "basic"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <User className="h-5 w-5 mr-3 text-gray-500" />
                  Basic Information
                </button>

                {user.onboarding && (
                  <>
                    <button
                      onClick={() => setActiveTab("details")}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-colors duration-150 ${
                        activeTab === "details"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="h-5 w-5 mr-3 text-gray-500" />
                      Onboarding Details
                    </button>
                    <button
                      onClick={() => setActiveTab("contacts")}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-colors duration-150 ${
                        activeTab === "contacts"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Contact className="h-5 w-5 mr-3 text-gray-500" />
                      Contact Persons
                    </button>
                    <button
                      onClick={() => setActiveTab("technologies")}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-colors duration-150 ${
                        activeTab === "technologies"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Layers className="h-5 w-5 mr-3 text-gray-500" />
                      Technologies
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {!editing ? (
              <div className="space-y-6">
                {/* Basic Information Card */}
                {activeTab === "basic" && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                          <User className="h-6 w-6 mr-2 text-indigo-600" />
                          Basic Information
                        </h2>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Full Name
                          </div>
                          <div className="text-lg font-medium text-gray-800">
                            {user.name}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Email Address
                          </div>
                          <div className="text-lg font-medium text-gray-800">
                            {user.email}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Number
                          </div>
                          <div className="text-lg font-medium text-gray-800">
                            {user.contact || "Not provided"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Onboarding Details Card */}
                {activeTab === "details" && user.onboarding && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 p-6">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <FileText className="h-6 w-6 mr-2 text-indigo-600" />
                        Onboarding Details
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            icon: <Hash className="h-5 w-5 text-indigo-600" />,
                            label: "Subject",
                            value: user.onboarding.details.subject,
                          },
                          {
                            icon: <Info className="h-5 w-5 text-indigo-600" />,
                            label: "Discussion Matter",
                            value: user.onboarding.details.discussionMatter,
                          },
                          {
                            icon: (
                              <Package className="h-5 w-5 text-indigo-600" />
                            ),
                            label: "Type",
                            value: user.onboarding.details.type,
                          },
                          {
                            icon: (
                              <Calendar className="h-5 w-5 text-indigo-600" />
                            ),
                            label: "Expected Close Date",
                            value: new Date(
                              user.onboarding.details.expectedCloseDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }),
                          },
                          {
                            icon: <Tag className="h-5 w-5 text-indigo-600" />,
                            label: "Specific Option",
                            value:
                              user.onboarding.details.specificOption ||
                              "Not selected",
                          },
                          {
                            icon: (
                              <MapPin className="h-5 w-5 text-indigo-600" />
                            ),
                            label: "State",
                            value:
                              user.onboarding.details.state || "Not provided",
                          },
                          {
                            icon: (
                              <Building className="h-5 w-5 text-indigo-600" />
                            ),
                            label: "Place",
                            value:
                              user.onboarding.details.place || "Not provided",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                              {item.icon}
                              <span className="ml-2">{item.label}</span>
                            </div>
                            <div className="text-lg font-medium text-gray-800 mt-1">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Persons Card */}
                {activeTab === "contacts" && user.onboarding && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div
                      className="border-b border-gray-200 p-6 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => toggleSection("contacts")}
                    >
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Contact className="h-6 w-6 mr-2 text-indigo-600" />
                        Contact Persons
                      </h2>
                      {expandedSections.contacts ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    {expandedSections.contacts && (
                      <div className="p-6">
                        <div className="space-y-6">
                          {user.onboarding.contactPersons.map(
                            (contact, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200"
                              >
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                  Contact Person #{idx + 1}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <div className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                                      <User className="h-4 w-4 mr-2" />
                                      Name
                                    </div>
                                    <div className="text-gray-800">
                                      {contact.name}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                                      <Mail className="h-4 w-4 mr-2" />
                                      Email
                                    </div>
                                    <div className="text-gray-800">
                                      {contact.emailDetail}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                                      <Phone className="h-4 w-4 mr-2" />
                                      Mobile
                                    </div>
                                    <div className="text-gray-800">
                                      {contact.mobileDetail}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                                      <Briefcase className="h-4 w-4 mr-2" />
                                      Organization
                                    </div>
                                    <div className="text-gray-800">
                                      {contact.organization}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Technologies Card */}
                {activeTab === "technologies" && user.onboarding && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div
                      className="border-b border-gray-200 p-6 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => toggleSection("technologies")}
                    >
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Layers className="h-6 w-6 mr-2 text-indigo-600" />
                        Technologies
                      </h2>
                      {expandedSections.technologies ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    {expandedSections.technologies && (
                      <div className="p-6">
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Selected Technology
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {user.onboarding.technologies.map((tech, idx) => {
                                let category = "";
                                if (idx === 0) category = "Broad Area";
                                else if (idx === 1) category = "Commodity";
                                else if (idx === 2) category = "Keyword";
                                return (
                                  <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                      {category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                      {tech.item || (
                                        <span className="text-gray-400">
                                          Not selected
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Edit Form Sections */}
                {activeTab === "basic" && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 p-6">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <User className="h-6 w-6 mr-2 text-indigo-600" />
                        Edit Basic Information
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={editFormData.name || ""}
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={editFormData.email || ""}
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Number
                          </label>
                          <input
                            type="text"
                            name="contact"
                            value={editFormData.contact || ""}
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Enter your contact number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Onboarding Details */}
                {activeTab === "details" && editFormData.onboarding && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 p-6">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <FileText className="h-6 w-6 mr-2 text-indigo-600" />
                        Edit Onboarding Details
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Hash className="h-4 w-4 mr-2" />
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={
                              editFormData.onboarding.details.subject || ""
                            }
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Info className="h-4 w-4 mr-2" />
                            Discussion Matter
                          </label>
                          <input
                            type="text"
                            name="discussionMatter"
                            value={
                              editFormData.onboarding.details
                                .discussionMatter || ""
                            }
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Package className="h-4 w-4 mr-2" />
                            Type
                          </label>
                          <input
                            type="text"
                            name="type"
                            value={editFormData.onboarding.details.type || ""}
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Expected Close Date
                          </label>
                          <input
                            type="date"
                            name="expectedCloseDate"
                            value={
                              editFormData.onboarding.details
                                .expectedCloseDate || ""
                            }
                            onChange={handleEditChange}
                            min={today}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Contact Persons */}
                {activeTab === "contacts" && editFormData.onboarding && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 p-6">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Contact className="h-6 w-6 mr-2 text-indigo-600" />
                        Edit Contact Persons
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {editFormData.onboarding.contactPersons.map(
                          (contact, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                            >
                              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                Contact Person #{idx + 1}
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={contact.name || ""}
                                    onChange={(e) =>
                                      handleNestedEditChange(
                                        e,
                                        "contactPersons",
                                        idx
                                      )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    name="emailDetail"
                                    value={contact.emailDetail || ""}
                                    onChange={(e) =>
                                      handleNestedEditChange(
                                        e,
                                        "contactPersons",
                                        idx
                                      )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Phone className="h-4 w-4 mr-2" />
                                    Mobile
                                  </label>
                                  <input
                                    type="text"
                                    name="mobileDetail"
                                    value={contact.mobileDetail || ""}
                                    onChange={(e) =>
                                      handleNestedEditChange(
                                        e,
                                        "contactPersons",
                                        idx
                                      )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Organization
                                  </label>
                                  <input
                                    type="text"
                                    name="organization"
                                    value={contact.organization || ""}
                                    onChange={(e) =>
                                      handleNestedEditChange(
                                        e,
                                        "contactPersons",
                                        idx
                                      )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Technologies */}
                {activeTab === "technologies" && editFormData.onboarding && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 p-6">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Layers className="h-6 w-6 mr-2 text-indigo-600" />
                        Edit Technologies
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {editFormData.onboarding.technologies.map(
                          (tech, idx) => {
                            let label = "";
                            let options = [];
                            if (idx === 0) {
                              label = "Broad Area";
                              options = broadAreaOptions;
                            } else if (idx === 1) {
                              label = "Commodity";
                              options = commoditiesOptions;
                            } else if (idx === 2) {
                              label = "Keyword";
                              options = keywordsOptions;
                            }
                            return (
                              <div
                                key={idx}
                                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                              >
                                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                                  {label}
                                </label>
                                <div className="relative">
                                  <select
                                    name="item"
                                    value={tech.item || ""}
                                    onChange={(e) =>
                                      handleNestedEditChange(
                                        e,
                                        "technologies",
                                        idx
                                      )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200 pr-10"
                                  >
                                    <option value="">Select {label}</option>
                                    {options.map((opt, i) => (
                                      <option key={i} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown className="h-5 w-5" />
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center shadow-sm hover:shadow"
                    >
                      <X className="h-5 w-5 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 flex items-center shadow-sm hover:shadow"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
