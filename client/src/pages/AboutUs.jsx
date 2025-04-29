import {
  Building2,
  FlaskConical,
  Cog,
  ShieldCheck,
  BookOpen,
  Users,
  Library,
  HeartPulse,
  Laptop2,
  ClipboardList,
  Wrench,
  Handshake,
  MapPin,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <Building2 className="w-10 h-10 text-blue-600" />
          About CSIR - CFTRI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Pioneering food science and technology research since 1950
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
        <div className="p-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="bg-blue-100 p-3 rounded-full">
              <FlaskConical className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Our Legacy
              </h2>
              <p className="text-gray-600 mb-4">
                CSIR−Central Food Technological Research Institute (CFTRI),
                Mysuru (A constituent laboratory of Council of Scientific and
                Industrial Research, New Delhi) came into existence during 1950
                with the great vision of its founders, and a network of
                inspiring as well as dedicated scientists who had a fascination
                to pursue in-depth research and development in the areas of food
                science and technology.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Cog className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Research Focus Areas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg">
                  <div className="bg-white p-2 rounded-full">
                    <Cog className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Engineering Sciences</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg">
                  <div className="bg-white p-2 rounded-full">
                    <FlaskConical className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Technology Development</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg">
                  <div className="bg-white p-2 rounded-full">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Translational Research</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg">
                  <div className="bg-white p-2 rounded-full">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Food Protection and Safety
                  </span>
                </div>
              </div>
              <p className="text-gray-600">
                Food Technology being inter-disciplinary in nature, the mandate
                or vision of the Institute is fulfilled through various R&D
                Departments and Support Departments along with its Resource
                Centres at Hyderabad, Lucknow and Mumbai.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* R&D Departments */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <FlaskConical className="w-8 h-8 text-blue-600" />
          R&D Departments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Department of Biochemistry | Grain Science Technology",
            "Flour Milling, Baking & Confectionery Technologies | Meat & Marine Sciences",
            "Food Engineering | Microbiology & Fermentation Technology",
            "Food Packaging Technology | Molecular Nutrition",
            "Food Protectants & Infestation Control | Plant Cell Biotechnology",
            "Food Safety & Analytical Quality Control Laboratories | Plantation Products, Spices & Flavour Technology",
            "Fruit & Vegetable Technology | Traditional Foods & Applied Nutrition",
          ].map((dept, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FlaskConical className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {dept.split(" | ")[0]}
                </h3>
              </div>
              <p className="text-gray-600 pl-11">{dept.split(" | ")[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support Departments */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Wrench className="w-8 h-8 text-blue-600" />
          Support Departments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Laptop2 className="w-5 h-5 text-blue-600" />,
              name: "IT Services & Computational Solutions",
            },
            {
              icon: <ClipboardList className="w-5 h-5 text-blue-600" />,
              name: "Planning, Monitoring & Coordination",
            },
            {
              icon: <Wrench className="w-5 h-5 text-blue-600" />,
              name: "Construction & Civil Maintenance",
            },
            {
              icon: <Handshake className="w-5 h-5 text-blue-600" />,
              name: "Technology Transfer & Business Development",
            },
            {
              icon: <Wrench className="w-5 h-5 text-blue-600" />,
              name: "Engineering & Mechanical Maintenance",
            },
          ].map((dept, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">{dept.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {dept.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Library className="w-8 h-8 text-blue-600" />
          Facilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Cog className="w-5 h-5 text-blue-600" />,
              name: "Central Instruments Facility & Services",
            },
            {
              icon: <HeartPulse className="w-5 h-5 text-blue-600" />,
              name: "Health Centre",
            },
            {
              icon: <BookOpen className="w-5 h-5 text-blue-600" />,
              name: "Fostis- Library",
            },
            {
              icon: <Users className="w-5 h-5 text-blue-600" />,
              name: "Human Resources Development",
            },
          ].map((facility, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  {facility.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {facility.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Centers */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <MapPin className="w-8 h-8 text-blue-600" />
          Resource Centres
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Hyderabad", "Mumbai", "Lucknow"].map((center, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{center}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
