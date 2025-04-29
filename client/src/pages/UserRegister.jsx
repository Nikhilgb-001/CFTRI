import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Option arrays for each dropdown
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
const discussionMatterOptions = [
  "Bakery Products",
  "Beverage Products",
  "Cereal Products",
  "Convenience Products",
  "Food Machinery",
  "Fruits & Vegetable Products",
  "Meat & Marine Products",
  "Microbiology & Fermentation",
  "Plantation & Spice Products",
  "Protein Specialty Products",
];

const typeOptions = [
  "Industrial Collaboration",
  "Technological Transfer",
  "Start-up",
  "MNC",
  "Women Entrepreneurship",
  "FPO",
  "SHC",
  "MSME",
];

const commoditiesOptions = [
  // For demonstration, you may use the same list as Broad Area.
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

const UserRegister = () => {
  // Update initial state to store three technology selections:
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    onboarding: {
      details: {
        subject: "",
        discussionMatter: "",
        type: "", // Accepts "Industrial Collaboration" or "Technological Transfer"
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
      // Three separate selections: one for Broad Area, one for Commodities, one for Keywords.
      technologies: [{ item: "" }, { item: "" }, { item: "" }],
    },
  });

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Generic handler for nested fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For onboarding.details fields
    if (name.startsWith("onboarding.details.")) {
      const field = name.split(".")[2];
      setFormData((prev) => ({
        ...prev,
        onboarding: {
          ...prev.onboarding,
          details: {
            ...prev.onboarding.details,
            [field]: value,
          },
        },
      }));
    }
    // For contactPersons (assumes index 0)
    else if (name.startsWith("onboarding.contactPersons")) {
      const parts = name.split(".");
      const indexMatch = parts[1].match(/\[(\d+)\]/);
      const index = indexMatch ? parseInt(indexMatch[1]) : 0;
      const field = parts[2];
      setFormData((prev) => {
        const updatedContacts = [...prev.onboarding.contactPersons];
        updatedContacts[index] = { ...updatedContacts[index], [field]: value };
        return {
          ...prev,
          onboarding: { ...prev.onboarding, contactPersons: updatedContacts },
        };
      });
    }
    // For technologies (assumes three separate selections at indexes 0, 1, and 2)
    else if (name.startsWith("onboarding.technologies")) {
      const parts = name.split(".");
      const indexMatch = parts[1].match(/\[(\d+)\]/);
      const index = indexMatch ? parseInt(indexMatch[1]) : 0;
      const field = parts[2];
      setFormData((prev) => {
        const updatedTechs = [...prev.onboarding.technologies];
        updatedTechs[index] = { ...updatedTechs[index], [field]: value };
        return {
          ...prev,
          onboarding: { ...prev.onboarding, technologies: updatedTechs },
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the expected close date as a Date if provided
    const preparedData = {
      ...formData,
      onboarding: {
        ...formData.onboarding,
        details: {
          ...formData.onboarding.details,
          expectedCloseDate: formData.onboarding.details.expectedCloseDate
            ? new Date(formData.onboarding.details.expectedCloseDate)
            : null,
        },
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/register/user",
        preparedData
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Set today's date (YYYY-MM-DD) for date input's minimum
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
            User Onboarding
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
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Onboarding Details */}
                  <input
                    type="text"
                    name="onboarding.details.subject"
                    placeholder="Subject"
                    value={formData.onboarding.details.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/* <input
                    type="text"
                    name="onboarding.details.discussionMatter"
                    placeholder="Discussion Matter"
                    value={formData.onboarding.details.discussionMatter}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  /> */}

                  {/* <select
                    name="onboarding.details.discussionMatter"
                    value={formData.onboarding.details.discussionMatter}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${primary}-500 transition-all duration-300"
                  >
                    <option value="Bakery">Bakery</option>
                    <option value="Sweets">Sweets</option>
                    <option value="Party">Party </option>
                    <option value="Wedding">Wedding</option>
                  </select> */}

                  {/* Removed leadValue and source */}
                  {/* <select
                    name="onboarding.details.type"
                    value={formData.onboarding.details.type}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Industrial Collaboration">
                      Industrial Collaboration
                    </option>
                    <option value="Technological Transfer">
                      Technological Transfer
                    </option>
                  </select> */}

                  {/* discussionMatter (Topic of Interest) */}
                  <select
                    name="onboarding.details.discussionMatter"
                    value={formData.onboarding.details.discussionMatter}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Topic of Interest</option>
                    {discussionMatterOptions.map((topic, i) => (
                      <option key={i} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>

                  {/* type */}
                  <select
                    name="onboarding.details.type"
                    value={formData.onboarding.details.type}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    {typeOptions.map((t, i) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    name="onboarding.details.expectedCloseDate"
                    value={formData.onboarding.details.expectedCloseDate}
                    onChange={handleChange}
                    min={today}
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
                      value={formData.onboarding.contactPersons[0].emailDetail}
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
                  {formData.onboarding.contactPersons[0].contactNumberType && (
                    <input
                      type="text"
                      name="onboarding.contactPersons[0].mobileDetail"
                      placeholder="Enter Mobile Detail"
                      value={formData.onboarding.contactPersons[0].mobileDetail}
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
                {/* Dropdown for Broad Area */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Broad Area
                  </label>
                  <select
                    name="onboarding.technologies[0].item"
                    value={formData.onboarding.technologies[0].item}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Broad Area</option>
                    {broadAreaOptions.map((tech, idx) => (
                      <option key={idx} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Dropdown for Commodities */}
                <div className="space-y-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Commodity
                  </label>
                  <select
                    name="onboarding.technologies[1].item"
                    value={formData.onboarding.technologies[1].item}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Commodity</option>
                    {commoditiesOptions.map((tech, idx) => (
                      <option key={idx} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Dropdown for Keywords */}
                <div className="space-y-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Keyword
                  </label>
                  <select
                    name="onboarding.technologies[2].item"
                    value={formData.onboarding.technologies[2].item}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Keyword</option>
                    {keywordsOptions.map((tech, idx) => (
                      <option key={idx} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
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
  );
};

export default UserRegister;
