import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  Contact,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Hash,
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
} from "lucide-react";

// Option arrays for the Technologies dropdowns
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

const bakeryProductOptions = [
  "Sugar-free Biscuit",
  "Baking powder",
  "Bread: Production (Brown, Plain, Sweet, Milk, Whole wheat, Fruit, High fiber, Ragi, Bajra)",
  "Composite Bajra Bread",
  "Composite Ragi Rusk",
  "Onion-flavoured biscuit",
  "Wheat Germ Stabilization",
  "Sugar-free cup cake",
  "Sugar-free cake rusk",
  "Instant Payasam Mix",
  "Bar cake",
  "Sugar-free rusk",
  "High protein rusk",
  "Cake rusk",
  "Instant cake mix",
  "Vermicelli (wheat & whole wheat flour)",
  "Fortified protein-rich vemicelli",
  "Layered parotta (South Indian)",
  "Suruchi meetha-health food snacks (burfi)",
  "Honey-based Bakery products",
  "Atta with multi-grains/ multi-whole grains",
  "Instant upma, halva & rava idli mix from multigrain semolina",
  "Instant upma, halva & rava idli mix from high fiber semolina",
  "Instant upma mix from millets & multimillets semolina",
  "Instant halva mix from millets & multimillets semolina",
  "Instant rava idli mix from millets & multimillets semolina",
  "Production of high fiber semolina (sooji/rava)",
  "Production of high protein semolina (sooji/rava)",
  "Production of barley dahlia/semolina",
  "Roller milling process for multigrain semolina (sooji/rava)",
  "Roller milling process for semolina (sooji/rava) from millets & preparation of multimillets",
  "Process for extension of shelf life of bread with natural preservatives",
  "Shelf Stable muffins with natural preservatives",
  "Nutritious high fiber soup sticks",
  "Baked savory snacks",
  "Preparation of chestnut-based gluten-free cookies",
  "Ragi-based biscuit",
  "Buckwheat Noodles (Soba)/Pasta",
  "Gluten free Biscuit",
  "Gluten free Cookie Cake",
  "Multigrain Nutri Cookies",
  "Production of Quinoa Germ Preparation of Spice Bread",
  "Preparation of Fibre Enriched Rusk",
  "Process for Gluten Free Cake Mix",
  "A process for the production of multigrain waffle",
  "A process for the production of Multigrain Pizza Base",
  "Process for development of gluten free bread premixes [three Versions] 1.Proso millet, 2. Foxtail millet and 3. Barnyard millet",
  "Process for development of gluten free bread premix (Version -1) Proso millet",
  "Process for development of gluten free bread premix (version-2) Foxtail millet",
  "Development of gluten free bread premix (version-3) Baryard millet",
];

const beverageProductOptions = [
  "Cereal flakes: jowar",
  "Instant traditional foods: Bisi bele bhath, Sambar, Rasam, Pongal, Urd bhath, Imli poha",
  "Spice mix: Puliogere",
  "Paushtik atta",
  "Composite vermicelli based on ragi flour",
  "Maize flakes (wet heat process)",
  "Maize chips",
  "Ready to eat low fat snack — Chakli & Tengolal",
  "Ready to eat low fat flaked spicy Maize/ Corn-snacks",
  "Legume based ready-to-fry-snacks",
  "Ragi based papads",
  "Pulse based papads",
  "Decortication of Ragi",
  "Malted ragi flour - enzyme rich",
  "Ready-to-eat low fat maize snacks from milled maize grits",
  "Flaking of foxtail millet",
  "Composite lentil chips",
  "Flaked jowar - RTE sweet & savoury snacks",
  "Quick cooking, germinated & dehydrated pulses",
  "Fermented & dehydrated ready mixes for Idli & Dosa",
  "Foods for diabetics",
  "Shelf-stable jowar flour",
  "Processed besan (Bengal gram flour) for sev & boondi preparation",
  "Puffed moth bean based sweet and savoury snacks",
  "Finger millet (Ragi) based murukku",
  "Expanded Horse gram",
  "Flaking of ragi",
  "Shelf stable optimally milled brown rice",
  "Multigrain based fortified snack",
  "Mothbean Dal Puff",
  "Multi-grain sweet mix",
  "Ready to eat snack mix from puffed coarse cereals & legumes",
  "Ready to cook multigrain whole mix for drink/ porridge",
  "Convenience flour from Ragi suitable for stiff porridge",
  "Finger millet based multigrain semolina for preparation of Upma, Kesri bath & similar products",
  "Protein enriched ragi vermicelli",
  "Shelf stable roti from cereals & millets (rice/ragi/maize/jowar/bajra)",
  "Low fat expanded green snack using moringa leaves",
  "Preparation of beverage mix from malted ragi",
  "Multigrain instant semolina",
  "Millet based cookie",
  "Process for production of multigrain gluten free semolina",
  "Multigrain gluten free instant upma mix",
  "Multigrain gluten free instant rava idli mix",
  "Multigrain gluten free instant halwa mix",
  "Production of Sorghum (jowar) semolina",
  "Production of pearl millet semolina",
  "Instant upma, halwa and rava idli mix from barley semolina",
  "Production of rice grits/sooji",
  "Ready-to-eat weaning food based on Malted Wheat",
  "Ready-to-eat weaning food based on Malted Rice",
  "Ready-to-eat weaning food based on Malted Multi-cereals",
  "Antidiabetic beverage mix - DiaLow GI-53 (Barley+Wheat-Herb based)",
  "Antidiabetic beverage mix - DiaLow GI-49 (Wheat-Herb based)",
  "Antidiabetic beverage mix - DiaLow GI-47 (Barley-Herb based)",
  "Barley-seaweed based Anti-obese supplement Sea Slim",
  "Production of soluble & insoluble arabinoxylan from wheat bran",
  "Ragi based malt hydrolysate",
  "Malted ragi based ready to eat weaning food",
  "Finger millet semolina",
  "Instant finger millet (ragi) ravi idli mix",
  "Instant finger millet halwa mix",
  "Instant finger millet kichadi mix",
  "Instant finger millet upma mix",
  "Millet and multimillet puttu podu mix",
];

const cerealProductOptions = [
  "Coffee concentrate",
  "Cola flavour concentrate",
  "Orange flavour concentrate for manufacture of soft beverage",
  "Clear Lime-Lemon flavour blend for soft drink manufacture",
  "Liquid fruits (clarified fruit juices) - Apple, Banana, Grapes, Guava",
  "Pomegranate juice & products",
  "Bottling of Sugarcane juice",
  "Fruit syrups & squashes",
  "Litchi products (canned; squash)",
  "RTS fruit juice & beverages",
  "Neera bottling",
  "Low Glycemic Index (GI) Beverage for Diabetics",
  "Banana pseudo stem juice beverage",
  "Instant Ginger Beverage (Ginger Tea)",
  "Coconut beverage from tender coconut",
  "Preparation of Nutri Beverage in Glass Bottles (Non -Aerated)",
  "Mixed fruit and Vegetable juices",
  "Fortified sugarcane beverage in glass bottles",
  "Ginger beverage",
  "Tender coconut water concentrate with sugar",
  "Improved process for preservation of Neera (pet bottles)",
  "Neera concentrate",
  "Green coffee extract",
  "Carbonated fruit beverages from selected fruits (mango, grapes, lime, orange)",
  "Paan flavoured water",
  "Coffee leaves brew mix",
  "Glucose-amla Beverage Mix",
];

const convenienceProductOptions = [
  "Ready Mixes - Vada, Dosa, Chakli, Jamoon, Jelebi Maddur vada, Pakoda, Cake Doughnut, Combination doughnut",
  "Ready mix: Upma",
  "RTE convenience food-Khakra",
  "North Indian (Punjab) Halwa Mix",
  "Bombay Halwa Mix",
  "Chutney paste (spread)",
  "Low sugar milk Burfi",
  "Deep fat fried & flavoured cashew kernels",
  "Roasted & flavoured cashew kernel",
  "Shelf-stable & ready to eat foods thermo processed in retort pouches (non-veg. & veg. Foods)",
  "Tamarind candy",
  "Nutri blends of edible oils",
  "Chikki/ Nutra-chikki (3 formulations)",
  "Nutra Chikki with added spirulina",
  "Cereal Bar",
  "Multigrain cereal-legume Bar and Puffed Rice Bar",
  "Spirulina-choco bar and spirulina-cereal bar",
  "Fat powder",
  "Value Added products from coconut (Instant adjunct mix, Instant filling mix, Coconut rice mix, Coconut bites)",
  "Milk Chocolate",
  "Milk Chocolate with no added sugar",
  "Coconut Oil Blends with other vegetable oils",
  "Preparation of protein, vitamin and mineral fortified chikki",
  "Dhal based nutritional supplement for foods",
  "Gongura leaf powder",
  "Instant Rava Idli Mix",
  "DOLYMIX - for soft & enhanced number of IDLYS",
  "Chocolate rich in healthy polyphenols",
  "Chikki with Moringa",
  "Ready to use Multigrain Idli and Dosa Batter in Retail Packs",
];

const foodMachineryOptions = [
  "Versatile Dal mill",
  "Continuous Dosa Making unit",
  "Design on Spouted Bed Coffee Roaster",
  "Vibro fluidized bed roaster",
  "Dry maize milling plant",
  "Device for Pneumatic extrusion of dough & device useful for dusting & cutting of dough into geometrical shapes",
  "Infrared heating of Cashew for testa removal",
  "Combined infrared hot air heating system for food processing",
  "Hot air popping machine using flue gas",
  "Desiccated coconut drier",
  "Continuous bio-plate casting machine",
  "Automatic continuous cooker",
  "Sugarcane de-skinning machine",
  "Integrated hot air roasting machine",
  "Continuous Vada making Machine",
  "Mini versatile dhal mill",
  "Hand operated lemon cutting machine",
  "Moulding machine for besan, sooji/rava and similar laddus",
  "Device useful for sheeting and cutting of chikki & other similar Indian Traditional sweets",
  "Forming and frying machine for foods",
  "Domestic dough shaping & forming machine",
  "Continuous dough sheet extruder",
  "Tiny Rice Mill",
  "Continuous wet cum dry grinding machine for foods (Colloidal mill)",
  "3 A device for continuous forming and frying of boondi",
  "Annatto seed separator",
  "Table top continuous wet cum dry grinder",
  "Thepla & Kakra processing machine",
  "Design & Development of a machine for continuous cooking & discharging of Ragi mudde/ball making",
  "Ozone based air disinfection system",
];

const fruitsVegetableProductOptions = [
  "Fruit bars: Apple, Banana, Guava, Mango",
  "Fortified Mango bar",
  "Fruits & Vegetables dehydration: Grapes, Banana, Onion, Potato, Peas & green chillies",
  "Oyster Mushroom: dehydration",
  "Technology Protocol for export of Alphonso Mango by Ship",
  "Technology Protocol for export of Banana variety Dwarf Cavendish by Ship",
  "Fruit jams & jellies: preparation",
  "Tutti-fruity (papaya/carrot)",
  "Fruit & vegetables: canning of",
  "Pickles & Chutneys",
  "Osmo-air dried fruits (Amla, Jackfruit, Pineapple & Mango)",
  "Potato flour",
  "Potato wafers/chips: direct process",
  "Tomato products (Juice, Ketchup, Sauce etc.)",
  "Jamoon fruit products: (squash, RTS beverage, syrup)",
  "Dehydrated drumstick powder",
  "Amla spread",
  "Modified atmosphere packaging of minimally processed vegetables",
  "Value added products from Figs (Ficus carica L)",
  "Dehydrated bitter gourd",
  "Dehydrated whole lime",
  "Instant mushroom soup mix",
  "Dipping oil formulation for grapes",
  "Bio-preservation of ready-to-eat sugarcane chunks",
  "Amla paste",
  "Date Syrup Concentrate",
  "Mangosteen Fruit Products",
  "Value added products from custard apple (pulp, microfiltered beverage & jelly)",
  "Products from pear fruit (dehydrated fruit, juice & powder)",
  "Fruit jam slices",
  "Apple pomace powder for enrichment of bakery products (bun, muffin, cookies)",
  "Instant products from Moringa leaves",
  "Crunchy banana cereal bar",
  "Instant Broccoli soup mix",
  "Plain spiced RTS beverage & squash from kokum",
  "Kokum jelly",
  "Banana juice",
  "Improved process for banana fruit bar",
  "Sweet Potato soup mix",
  "Minimally processed pomegranate arils",
  "Nutrient and Micronutrient rich Ready-to-Eat (RTE) salad",
  "Process for Instant Tomato crush, Tomato Rasam mix & Tomato rice bath mix",
  "Process for preparation of raw banana powder (unripe)",
  "Process for Nutri Fruit bars with immune boosters",
  "Beverage concentrate/ Paste from Mango, in Collapsible Tube",
  "Beverage concentrate/ Paste from Guava, in Collapsible Tube",
  "Beverage concentrate/ Paste from Pineapple, in Collapsible Tube",
  "Beverage concentrate/ Paste from mixed fruit and vegetable, in Collapsible Tube",
];

const meatMarineProductOptions = [
  "Instant gravy mixes (dehydrated)",
  "Meat pickles: Prawn, Mutton",
  "Fish viscera silage (fermented)",
  "Sausage preparation: Chicken & Pork",
  "Meat/Fish/Poultry wafers (Chicken/Fish/Prawn/Pork/Egg/Meat)",
  "Shelf-stable chicken biryani",
  "Shelf-stable chicken tit-bits",
  "Meat burger",
  "Egg loaf",
  "Shelf stable kabab mix with chicken meat",
  "Ready to eat shelf stable egg crunchy bite",
  "Dehydrated Egg Cubes",
  "Deep fat fried Egg Cubes",
  "Shelf stable egg albumin & egg yolk cubes",
  "Low fat meat kofta",
  "Shelf-stable biryani paste",
  "Shelf stable varieties of curry pastes for vegetarian & non vegetarian traditional cuisines",
  "Shelf stable convenience mix: A cooking base",
  "Gelatin from Chicken feet",
];

const microbiologyFermentationOptions = [
  "Microbial production of Fructooligosaccharides (FOS)",
  "Kit for the detection of aflatoxins by improved Dot-ELISA technique",
  "Preparation of wine from Garcina Xanthochymus",
  "Microbial inoculums for the management of coffee pulp effluent",
  "Bifido curd",
  "Soya curd",
  "A-Hango: Preparation for alleviating alcohol hangover",
  "A green process for production of methylanthines for food and other applications",
  "Herbal Hand Sanitizer (Gel Form)",
  "Herbal Hand Sanitizer (Liquid Form)",
  "Herbal fogging disinfectants for mist sanitizer system",
  "Herbal spray Sanitizer",
  "Herbal Bulk sanitizer product",
  "High Performance Advanced Oxidation Process for STP's Greywater and Industrial Wastewaters (Food and Non-Food)",
  "Banana Juice",
  "Process for the production of transglycosylating a-glucosidase using novel fungal strain",
  "Production of Baker's Yeast",
  "Process know-how for Probiotic Carrot nectar",
];

const plantationSpiceProductOptions = [
  "Annatto dye: preparation",
  "Processing of cocoa beans to: Cocoa mass, Cocoa butter, Cocoa powder",
  "Compounded Asafoetida",
  "Food colours: natural - Beetroot, Safflower, Kokum & Grapes",
  "Garlic powder",
  "Kokum: concentrate & powder",
  "Mustard powder",
  "Making superior quality White pepper",
  "Plant growth promoter: n-triacontanol",
  "Spice oil - Pepper",
  "Spice oleoresins: Turmeric & Chillies",
  "An improved process for Chilli oleoresin",
  "Tamarind: juice concentrate & powder",
  "Processing of cocoa (Theobroma cocoa pods to dried cocoa beans)",
  "Zinc - EDTA Chelate",
  "Garlic paste",
  "Ginger paste",
  "Spray dried coconut milk powder",
  "Sugarcane juice spread",
  "Removal of smoky odour from Bhatti cured large cardamom capsules",
  "Green pepper in brine",
  "Green tamarind spice mix - paste & powder",
  "Preparation of cashew apple candy",
  "Faster curing of vanilla beans",
  "Preparation of radical scavenging conserve from tea leaves - normal/coarse/pruned",
  "Chlorogenic acid rich coffee conserve from green coffee beans",
  "Water soluble turmeric colourant (odourless) formulation",
  "2-hydroxy-4 methoxy benzaldehyde, a natural flavourant from Swallow Roots (Decalepis hamittoni) Wight & Arn",
  "Coffee flakes based mouth freshener",
  "Production of coconut spread from Mature coconut water concentrate & coconut dietary fibre",
  "Virgin Coconut oil preparation",
  "Marigold Oleoresin preparation",
  "Preparation of dehydrated green pepper without chemicals",
  "Turmeric powder from fresh turmeric rhizome",
  "Instant Coffee cubes",
  "CGA enriched Carbonated Coffee",
  "Preparation of zerumbone crystals from fresh zerumbet rhizomes",
  "Dehydration of coriander foliage",
  "Process for freshness keeper paper for extension of shelf life of cut roses",
  "Instant Tea Premix",
  "Ethylene Scavenger",
];

const proteinSpecialtyProductOptions = [
  "Mustard/rape seed integrated processing",
  "Sesame: dehulling, (wet process)",
  "Rural based biotechnological production of spirulina",
  "Malted weaning food",
  "Full fat Soya flour: edible (improved process)",
  "Dry dehulling of sesame seed",
  "Low fat high protein snack foods",
  "Bland soya protein concentrate",
  "Energy food: new formulation",
  "Heat resistant white Sesame seeds",
  "Groundnut (peanut) butter",
  "Soya Protein Hydrolysate",
  "Preparation of Beta Carotene and mineral fortified bun",
  "Stabilized edible rice bran",
  "Sesame based nutritious supplement",
  "Moringa seed protein isolate as Flocculant",
  "A Process for flavour essence from decalepis",
  "Process for the preparation of whey protein hydrolysate",
  "Coconut protein powder",
  "Spray-dried refined papain",
  "Cleaner process for biotechnological production of spirulina",
];

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

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  // new state
  const [showTechModal, setShowTechModal] = useState(false);
  const [newDiscussionMatter, setNewDiscussionMatter] = useState("");
  const [newSpecificOption, setNewSpecificOption] = useState("");
  const [showTechSpecificOptions, setShowTechSpecificOptions] = useState(false);
  const [techSpecificOptions, setTechSpecificOptions] = useState([]);

  const [expandedSections, setExpandedSections] = useState({
    details: true,
    contacts: true,
    technologies: true,
    techTransfer: true,
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUser = res.data;

        if (
          !fetchedUser.contact &&
          fetchedUser.onboarding?.contactPersons?.length
        ) {
          fetchedUser.contact =
            fetchedUser.onboarding.contactPersons[0].mobileDetail;
        }

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

  useEffect(() => {
    switch (newDiscussionMatter) {
      case "Bakery Products":
        setTechSpecificOptions(bakeryProductOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Beverage Products":
        setTechSpecificOptions(beverageProductOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Cereal Products":
        setTechSpecificOptions(cerealProductOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Convenience Products":
        setTechSpecificOptions(convenienceProductOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Food Machinery":
        setTechSpecificOptions(foodMachineryOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Fruits & Vegetable Products":
        setTechSpecificOptions(fruitsVegetableProductOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Meat & Marine Products":
        setTechSpecificOptions(meatMarineProductOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Microbiology & Fermentation":
        setTechSpecificOptions(microbiologyFermentationOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Plantation & Spice Products":
        setTechSpecificOptions(plantationSpiceProductOptions);
        setShowTechSpecificOptions(true);
        break;
      case "Protein Specialty Products":
        setTechSpecificOptions(proteinSpecialtyProductOptions);
        setShowTechSpecificOptions(true);
        break;
      default:
        setShowTechSpecificOptions(false);
        setNewSpecificOption("");
        break;
    }
  }, [newDiscussionMatter]);

  const handleNewTechSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/profile/technology",
        {
          discussionMatter: newDiscussionMatter,
          specificOption: newSpecificOption,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      // reset & close
      setNewDiscussionMatter("");
      setNewSpecificOption("");
      setShowTechModal(false);
    } catch (err) {
      toast.error("Could not add new query");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowTechModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
        >
          New Query (New Tech)
        </button>
      </div>

      {showTechModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Technology Query</h3>

            <label className="block mb-2">Topic of Interest</label>
            <select
              value={newDiscussionMatter}
              onChange={(e) => setNewDiscussionMatter(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Topic</option>
              {discussionMatterOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {showTechSpecificOptions && (
              <>
                <label className="block mb-2">Specific Option</label>
                <select
                  value={newSpecificOption}
                  onChange={(e) => setNewSpecificOption(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="">Select Specific</option>
                  {techSpecificOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTechModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleNewTechSubmit}
                disabled={!newSpecificOption}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

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
                    {/* <button
                      onClick={() => setActiveTab("contacts")}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-colors duration-150 ${
                        activeTab === "contacts"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Contact className="h-5 w-5 mr-3 text-gray-500" />
                      Contact Persons
                    </button> */}
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
                    {/* <button
                      onClick={() => setActiveTab("techTransfer")} // ← new
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-colors duration-150 ${
                        activeTab === "techTransfer"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Package className="h-5 w-5 mr-3 text-gray-500" />{" "}
                      Tech Transfer Flows
                    </button> */}
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
                            {user.contact ||
                              user.onboarding?.contactPersons?.[0]
                                ?.mobileDetail ||
                              "Not provided"}
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
                          // {
                          //   icon: (
                          //     <Calendar className="h-5 w-5 text-indigo-600" />
                          //   ),
                          //   label: "Expected Close Date",
                          //   value: new Date(
                          //     user.onboarding.details.expectedCloseDate
                          //   ).toLocaleDateString("en-US", {
                          //     year: "numeric",
                          //     month: "long",
                          //     day: "numeric",
                          //   }),
                          // },
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
                          {
                            icon: (
                              <MapPin className="h-5 w-5 text-indigo-600" />
                            ),
                            label: "Address",
                            value:
                              user.onboarding.details.address || "Not provided",
                          },
                          {
                            icon: <User className="h-5 w-5 text-indigo-600" />,
                            label: "Gender",
                            value:
                              user.onboarding.details.gender || "Not provided",
                          },
                          {
                            icon: <Globe className="h-5 w-5 text-indigo-600" />,
                            label: "Country",
                            value:
                              user.onboarding.details.country || "Not provided",
                          },
                          {
                            icon: <Tag className="h-5 w-5 text-indigo-600" />,
                            label: "Category",
                            value:
                              user.onboarding.details.category ||
                              "Not provided",
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
                                  Field
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  Project Type
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {user.onboarding.details.projectMode ===
                                  "collaborative"
                                    ? "Collaborative Project"
                                    : "Technology Transfer"}
                                </td>
                              </tr>

                              {/* Collaborative Focus Areas */}
                              {user.onboarding.details.projectMode ===
                                "collaborative" && (
                                <tr className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                    Focus Areas
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {user.onboarding.details
                                      .collaborativeOptions?.length
                                      ? user.onboarding.details.collaborativeOptions.join(
                                          ", "
                                        )
                                      : "None selected"}
                                    {user.onboarding.details.collaborativeOther
                                      ? `; Other: ${user.onboarding.details.collaborativeOther}`
                                      : ""}
                                  </td>
                                </tr>
                              )}

                              {/* Tech-Transfer Topic */}
                              {user.onboarding.details.projectMode ===
                                "transfer" && (
                                <>
                                  <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                      Topic of Interest
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                      {user.onboarding.details
                                        .discussionMatter || "Not selected"}
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                      Specific Option
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                      {user.onboarding.details.specificOption ||
                                        "Not selected"}
                                    </td>
                                  </tr>
                                </>
                              )}

                              {/* existing tech fields */}
                              {/* <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  Category
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {user.onboarding.details.specificOption}
                                </td>
                              </tr> */}
                              <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  Type
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {user.onboarding.details.type}
                                </td>
                              </tr>

                              {user.onboarding.technologies.map((tech, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {tech.category}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {tech.item}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "techTransfer" && user.onboarding && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 p-6 flex items-center">
                      <Package className="h-6 w-6 mr-2 text-indigo-600" />
                      <h2 className="text-xl font-bold text-gray-800">
                        Tech Transfer Flows
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      {user.onboarding.techTransferLogs?.length > 0 ? (
                        user.onboarding.techTransferLogs.map((log, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">
                                {log.actionType}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(log.date).toLocaleDateString()}
                              </span>
                            </div>
                            {log.details && (
                              <p className="text-sm text-gray-700 mb-1">
                                {log.details}
                              </p>
                            )}
                            {log.transactionId && (
                              <p className="text-sm">
                                <strong>Transaction ID:</strong>{" "}
                                {log.transactionId}
                              </p>
                            )}
                            {log.amount != null && (
                              <p className="text-sm">
                                <strong>Amount:</strong> {log.amount}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No tech transfer flows logged yet.
                        </p>
                      )}
                    </div>
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
                          <label className="block text-sm font-medium text-gray-700 mb-2 items-center">
                            <MapPin className="h-4 w-4 mr-2" /> Address
                          </label>
                          <input
                            type="text"
                            name="onboarding.details.address"
                            value={
                              editFormData.onboarding.details.address || ""
                            }
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter address"
                          />
                        </div>
                        {/* ⬆️ Gender */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <User className="h-4 w-4 mr-2" /> Gender
                          </label>
                          <select
                            name="onboarding.details.gender"
                            value={editFormData.onboarding.details.gender || ""}
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        {/* ⬆️ Country */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Globe className="h-4 w-4 mr-2" /> Country
                          </label>
                          <input
                            type="text"
                            name="onboarding.details.country"
                            value={
                              editFormData.onboarding.details.country || ""
                            }
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter country"
                          />
                        </div>
                        {/* ⬆️ Category */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Tag className="h-4 w-4 mr-2" /> Category
                          </label>
                          <select
                            name="onboarding.details.category"
                            value={
                              editFormData.onboarding.details.category || ""
                            }
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Select category</option>
                            <option value="SC/ST">SC/ST</option>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                          </select>
                        </div>

                        {/* <div>
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
                        </div> */}
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
                              label = "Discussion Matter	";
                              options = broadAreaOptions;
                            } else if (idx === 1) {
                              label = "Category";
                              options = commoditiesOptions;
                            } else if (idx === 2) {
                              label = "Type";
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
