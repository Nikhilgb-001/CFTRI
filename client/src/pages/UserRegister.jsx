import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// Discussion Matter Options with their respective sub-options
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

const commoditiesOptions = [...broadAreaOptions];

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    onboarding: {
      details: {
        subject: "",
        discussionMatter: "",
        type: "",
        expectedCloseDate: "",
        state: "",
        place: "",
        address: "",
        gender: "",
        country: "",
        category: "",
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
      technologies: [{ item: "" }, { item: "" }, { item: "" }],
    },
  });

  const [step, setStep] = useState(1);
  const [showSpecificOptions, setShowSpecificOptions] = useState(false);
  const [specificOptions, setSpecificOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set specific options based on selected discussion matter
    switch (formData.onboarding.details.discussionMatter) {
      case "Bakery Products":
        setSpecificOptions(bakeryProductOptions);
        setShowSpecificOptions(true);
        break;
      case "Beverage Products":
        setSpecificOptions(beverageProductOptions);
        setShowSpecificOptions(true);
        break;
      case "Cereal Products":
        setSpecificOptions(cerealProductOptions);
        setShowSpecificOptions(true);
        break;
      case "Convenience Products":
        setSpecificOptions(convenienceProductOptions);
        setShowSpecificOptions(true);
        break;
      case "Food Machinery":
        setSpecificOptions(foodMachineryOptions);
        setShowSpecificOptions(true);
        break;
      case "Fruits & Vegetable Products":
        setSpecificOptions(fruitsVegetableProductOptions);
        setShowSpecificOptions(true);
        break;
      case "Meat & Marine Products":
        setSpecificOptions(meatMarineProductOptions);
        setShowSpecificOptions(true);
        break;
      case "Microbiology & Fermentation":
        setSpecificOptions(microbiologyFermentationOptions);
        setShowSpecificOptions(true);
        break;
      case "Plantation & Spice Products":
        setSpecificOptions(plantationSpiceProductOptions);
        setShowSpecificOptions(true);
        break;
      case "Protein Specialty Products":
        setSpecificOptions(proteinSpecialtyProductOptions);
        setShowSpecificOptions(true);
        break;
      default:
        setShowSpecificOptions(false);
        break;
    }
  }, [formData.onboarding.details.discussionMatter]);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    } else if (name.startsWith("onboarding.contactPersons")) {
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
    } else if (name.startsWith("onboarding.technologies")) {
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

  const today = new Date().toISOString().split("T")[0];

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
    //   <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
    //     <div className="p-6">
    //       <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
    //         User Onboarding
    //       </h2>
    //       <form onSubmit={handleSubmit}>
    //         {step === 1 && (
    //           <div>
    //             <h3 className="text-xl font-semibold text-blue-800 mb-4">
    //               Step 1: Basic Details
    //             </h3>
    //             <div className="space-y-4">
    //               <input
    //                 type="text"
    //                 name="name"
    //                 placeholder="Name"
    //                 value={formData.name}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               />
    //               <input
    //                 type="email"
    //                 name="email"
    //                 placeholder="Email"
    //                 value={formData.email}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               />
    //               <input
    //                 type="password"
    //                 name="password"
    //                 placeholder="Password"
    //                 value={formData.password}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               />
    //               <input
    //                 type="text"
    //                 name="onboarding.details.subject"
    //                 placeholder="Subject"
    //                 value={formData.onboarding.details.subject}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               />

    //               {/* State */}
    //               <input
    //                 type="text"
    //                 name="onboarding.details.state"
    //                 placeholder="State"
    //                 value={formData.onboarding.details.state}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
    //               />

    //               {/* Address */}
    //               <input
    //                 type="text"
    //                 name="onboarding.details.address"
    //                 placeholder="Address"
    //                 value={formData.onboarding.details.address}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
    //               />

    //               {/* Gender */}
    //               <select
    //                 name="onboarding.details.gender"
    //                 value={formData.onboarding.details.gender}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
    //               >
    //                 <option value="">Select Gender</option>
    //                 <option value="Male">Male</option>
    //                 <option value="Female">Female</option>
    //                 <option value="Other">Other</option>
    //               </select>

    //               {/* Country */}
    //               <input
    //                 type="text"
    //                 name="onboarding.details.country"
    //                 placeholder="Country"
    //                 value={formData.onboarding.details.country}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
    //               />

    //               {/* Category */}
    //               <select
    //                 name="onboarding.details.category"
    //                 value={formData.onboarding.details.category}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
    //               >
    //                 <option value="">Select Category</option>
    //                 <option value="SC/ST">SC/ST</option>
    //                 <option value="General">General</option>
    //                 <option value="OBC">OBC</option>
    //               </select>

    //               {/* Place */}
    //               <input
    //                 type="text"
    //                 name="onboarding.details.place"
    //                 placeholder="Place"
    //                 value={formData.onboarding.details.place}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
    //               />

    //               <input
    //                 type="date"
    //                 name="onboarding.details.expectedCloseDate"
    //                 value={formData.onboarding.details.expectedCloseDate}
    //                 onChange={handleChange}
    //                 min={today}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               />
    //             </div>
    //             <div className="flex justify-end mt-6">
    //               <button
    //                 type="button"
    //                 onClick={handleNext}
    //                 className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
    //               >
    //                 Next
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //         {step === 2 && (
    //           <div>
    //             <h3 className="text-xl font-semibold text-blue-800 mb-4">
    //               Step 2: Contact Person
    //             </h3>
    //             <div className="space-y-4">
    //               <input
    //                 type="text"
    //                 name="onboarding.contactPersons[0].name"
    //                 placeholder="Contact Person Name"
    //                 value={formData.onboarding.contactPersons[0].name}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               />
    //               <select
    //                 name="onboarding.contactPersons[0].emailType"
    //                 value={formData.onboarding.contactPersons[0].emailType}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               >
    //                 <option value="">Select Email Type</option>
    //                 <option value="personal">Personal</option>
    //                 <option value="work">Work</option>
    //                 <option value="other">Other</option>
    //               </select>
    //               {formData.onboarding.contactPersons[0].emailType && (
    //                 <input
    //                   type="email"
    //                   name="onboarding.contactPersons[0].emailDetail"
    //                   placeholder="Enter Email Detail"
    //                   value={formData.onboarding.contactPersons[0].emailDetail}
    //                   onChange={handleChange}
    //                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                 />
    //               )}
    //               <select
    //                 name="onboarding.contactPersons[0].contactNumberType"
    //                 value={
    //                   formData.onboarding.contactPersons[0].contactNumberType
    //                 }
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               >
    //                 <option value="">Select Contact Number Type</option>
    //                 <option value="mobile">Mobile</option>
    //                 <option value="landline">Landline</option>
    //                 <option value="other">Other</option>
    //               </select>
    //               {formData.onboarding.contactPersons[0].contactNumberType && (
    //                 <input
    //                   type="text"
    //                   name="onboarding.contactPersons[0].mobileDetail"
    //                   placeholder="Enter Mobile Detail"
    //                   value={formData.onboarding.contactPersons[0].mobileDetail}
    //                   onChange={handleChange}
    //                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                 />
    //               )}
    //               <input
    //                 type="text"
    //                 name="onboarding.contactPersons[0].organization"
    //                 placeholder="Organization"
    //                 value={formData.onboarding.contactPersons[0].organization}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               />
    //             </div>
    //             <div className="flex justify-between mt-6">
    //               <button
    //                 type="button"
    //                 onClick={handlePrev}
    //                 className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
    //               >
    //                 Back
    //               </button>
    //               <button
    //                 type="button"
    //                 onClick={handleNext}
    //                 className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
    //               >
    //                 Next
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //         {step === 3 && (
    //           <div>
    //             <h3 className="text-xl font-semibold text-blue-800 mb-4">
    //               Step 3: Technologies
    //             </h3>
    //             {/* Dropdown for Broad Area */}
    //             <div className="space-y-4">
    //               {/* Discussion Matter Dropdown */}
    //               <select
    //                 name="onboarding.details.discussionMatter"
    //                 value={formData.onboarding.details.discussionMatter}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               >
    //                 <option value="">Select Topic of Interest</option>
    //                 {discussionMatterOptions.map((topic, i) => (
    //                   <option key={i} value={topic}>
    //                     {topic}
    //                   </option>
    //                 ))}
    //               </select>

    //               {showSpecificOptions && (
    //                 <select
    //                   name="onboarding.details.specificOption"
    //                   value={formData.onboarding.details.specificOption}
    //                   onChange={handleChange}
    //                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                 >
    //                   <option value="">
    //                     Select {formData.onboarding.details.discussionMatter}
    //                   </option>
    //                   {specificOptions.map((option, idx) => (
    //                     <option key={idx} value={option}>
    //                       {option}
    //                     </option>
    //                   ))}
    //                 </select>
    //               )}
    //             </div>
    //             <div className="space-y-4 mt-4">
    //               <select
    //                 name="onboarding.details.type"
    //                 value={formData.onboarding.details.type}
    //                 onChange={handleChange}
    //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               >
    //                 <option value="">Select Type</option>
    //                 {typeOptions.map((t, i) => (
    //                   <option key={i} value={t}>
    //                     {t}
    //                   </option>
    //                 ))}
    //               </select>
    //             </div>
    //             <div className="flex justify-between mt-6">
    //               <button
    //                 type="button"
    //                 onClick={handlePrev}
    //                 className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
    //               >
    //                 Back
    //               </button>
    //               <button
    //                 type="submit"
    //                 className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
    //               >
    //                 Submit
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              User Onboarding
            </h2>
            <p className="text-gray-500">
              Complete your profile in just 2 simple steps
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="text-2xl font-semibold text-blue-700 flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 mr-3">
                      1
                    </span>
                    Personal & Technical Details
                  </h3>
                  <p className="text-gray-500 ml-11">
                    Tell us about yourself and your interests
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.subject"
                      placeholder="Your subject"
                      value={formData.onboarding.details.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="onboarding.details.gender"
                      value={formData.onboarding.details.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="onboarding.details.category"
                      value={formData.onboarding.details.category}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="SC/ST">SC/ST</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.country"
                      placeholder="Country"
                      value={formData.onboarding.details.country}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.state"
                      placeholder="State"
                      value={formData.onboarding.details.state}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Place
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.place"
                      placeholder="Place"
                      value={formData.onboarding.details.place}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.address"
                      placeholder="Full Address"
                      value={formData.onboarding.details.address}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="onboarding.details.expectedCloseDate"
                      value={formData.onboarding.details.expectedCloseDate}
                      onChange={handleChange}
                      min={today}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Moved from step 3 */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topic of Interest
                    </label>
                    <select
                      name="onboarding.details.discussionMatter"
                      value={formData.onboarding.details.discussionMatter}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Topic of Interest</option>
                      {discussionMatterOptions.map((topic, i) => (
                        <option key={i} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  {showSpecificOptions && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specific {formData.onboarding.details.discussionMatter}
                      </label>
                      <select
                        name="onboarding.details.specificOption"
                        value={formData.onboarding.details.specificOption}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">
                          Select {formData.onboarding.details.discussionMatter}
                        </option>
                        {specificOptions.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      name="onboarding.details.type"
                      value={formData.onboarding.details.type}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Type</option>
                      {typeOptions.map((t, i) => (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    Next Step <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="text-2xl font-semibold text-blue-700 flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 mr-3">
                      2
                    </span>
                    Contact Information
                  </h3>
                  <p className="text-gray-500 ml-11">Who should we contact?</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      name="onboarding.contactPersons[0].name"
                      placeholder="Contact Person Name"
                      value={formData.onboarding.contactPersons[0].name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Type
                      </label>
                      <select
                        name="onboarding.contactPersons[0].emailType"
                        value={formData.onboarding.contactPersons[0].emailType}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select Email Type</option>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {formData.onboarding.contactPersons[0].emailType && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="onboarding.contactPersons[0].emailDetail"
                          placeholder="Enter Email Detail"
                          value={
                            formData.onboarding.contactPersons[0].emailDetail
                          }
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number Type
                      </label>
                      <select
                        name="onboarding.contactPersons[0].contactNumberType"
                        value={
                          formData.onboarding.contactPersons[0]
                            .contactNumberType
                        }
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select Contact Number Type</option>
                        <option value="mobile">Mobile</option>
                        <option value="landline">Landline</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {formData.onboarding.contactPersons[0]
                      .contactNumberType && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="onboarding.contactPersons[0].mobileDetail"
                          placeholder="Enter Mobile Detail"
                          value={
                            formData.onboarding.contactPersons[0].mobileDetail
                          }
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="onboarding.contactPersons[0].organization"
                      placeholder="Organization"
                      value={formData.onboarding.contactPersons[0].organization}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    <ChevronLeftIcon className="w-5 h-5 mr-2" /> Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    Complete Registration <CheckIcon className="w-5 h-5 ml-2" />
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
