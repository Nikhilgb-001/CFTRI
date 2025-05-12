// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FlaskConical,
//   ArrowRight,
//   Users,
//   Shield,
//   UserCog,
//   BookOpen,
//   CalendarCheck,
//   BarChart2,
//   User, // Added the missing User icon import
// } from "lucide-react";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//       {/* Hero Section */}
//       <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
//         <div className="bg-white p-4 rounded-full shadow-lg mb-6">
//           {/* <FlaskConical className="h-12 w-12 text-blue-600" /> */}
//           <img
//             src="https://cftri.res.in/assets/user/images/Logo.png"
//             alt="CFTRI Logo"
//             className="h-8 w-auto"
//           />
//         </div>
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//           Welcome to <span className="text-blue-600">CFTRI</span>
//         </h1>
//         <p className="text-xl text-gray-600 mb-8 max-w-2xl">
//           Central Food Technological Research Institute - Your premier platform
//           for food technology research and collaboration
//         </p>

//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           <Link
//             to="/login/user"
//             className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-blue-50"
//           >
//             <User className="h-5 w-5 mr-2 text-blue-600" />
//             <span>User Login</span>
//             <ArrowRight className="h-4 w-4 ml-2" />
//           </Link>
//           <Link
//             to="/login/admin"
//             className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-blue-50"
//           >
//             <Shield className="h-5 w-5 mr-2 text-blue-600" />
//             <span>Admin Login</span>
//             <ArrowRight className="h-4 w-4 ml-2" />
//           </Link>
//           <Link
//             to="/login/coordinator"
//             className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-blue-50"
//           >
//             <UserCog className="h-5 w-5 mr-2 text-blue-600" />
//             <span>Coordinator Login</span>
//             <ArrowRight className="h-4 w-4 ml-2" />
//           </Link>
//         </div>
//       </div>

//       {/* Features Section */}
//       {/* <div className="bg-white py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Our <span className="text-blue-600">Features</span>
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-blue-50 p-6 rounded-xl text-center">
//               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <BookOpen className="h-8 w-8 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">
//                 Research Management
//               </h3>
//               <p className="text-gray-600">
//                 Comprehensive tools for managing all aspects of food technology
//                 research projects
//               </p>
//             </div>

//             <div className="bg-purple-50 p-6 rounded-xl text-center">
//               <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CalendarCheck className="h-8 w-8 text-purple-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Project Tracking</h3>
//               <p className="text-gray-600">
//                 Monitor project timelines and milestones with our intuitive
//                 tracking system
//               </p>
//             </div>

//             <div className="bg-indigo-50 p-6 rounded-xl text-center">
//               <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <BarChart2 className="h-8 w-8 text-indigo-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
//               <p className="text-gray-600">
//                 Powerful analytics to derive insights from your food technology
//                 research data
//               </p>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Footer */}
//       <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-16 pb-8">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col lg:flex-row justify-between gap-12">
//             {/* Contact Info */}
//             <div className="max-w-md">
//               <h3 className="text-2xl font-bold mb-6 text-blue-300 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-blue-500">
//                 Get In Touch
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <svg
//                     className="w-5 h-5 mt-1 text-blue-400 flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   <div>
//                     <p className="font-semibold">TTBD Department</p>
//                     <p>CSIR - Central Food Technological Research Institute</p>
//                     <p>Mysore - 570020, Karnataka, India</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <svg
//                     className="w-5 h-5 text-blue-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <a
//                     href="mailto:ttbd@cftri.res.in"
//                     className="hover:text-blue-300 transition duration-200"
//                   >
//                     ttbd@cftri.res.in
//                   </a>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <svg
//                     className="w-5 h-5 text-blue-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                   <a
//                     href="tel:+918212515670"
//                     className="hover:text-blue-300 transition duration-200"
//                   >
//                     +91 821 251 5670
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="text-2xl font-bold mb-6 text-blue-300 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-blue-500">
//                 Quick Links
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <Link
//                     to={"/"}
//                     className="hover:text-blue-300 transition duration-200"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={"/about"}
//                     className="hover:text-blue-300 transition duration-200"
//                   >
//                     About Us
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     to={"/"}
//                     className="hover:text-blue-300 transition duration-200"
//                   >
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Social & Logo */}
//             <div className="flex flex-col items-center lg:items-end space-y-6">
//               <div className="flex flex-col items-center space-y-4">
//                 <img
//                   src="https://cftri.res.in/assets/user/images/Logo.png"
//                   alt="CFTRI Logo"
//                   className="h-16 w-auto object-contain"
//                 />
//                 <p className="text-gray-400 text-sm text-center">
//                   © {new Date().getFullYear()} CSIR-CFTRI. All Rights Reserved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { User, ArrowRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  // Settings for the main full-screen slider
  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
  };

  // Settings for the testimonials slider
  const testimonialSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Main slider images
  const mainSliderImages = [
    {
      url: "https://cftri.res.in/assets/user/images/slider/slide1.jpg",
      alt: "CFTRI Research Facility",
    },
    {
      url: "https://cftri.res.in/assets/user/images/slider/slide2.jpg",
      alt: "Food Technology Research",
    },
    {
      url: "https://cftri.res.in/assets/user/images/slider/slide3.jpg",
      alt: "CFTRI Laboratories",
    },
    {
      url: "https://cftri.res.in/assets/user/images/slider/slide4.jpg",
      alt: "Food Processing Technology",
    },
  ];

  // Pterions data
  const pterions = [
    {
      image: "https://cftri.res.in/assets/user/images/research.jpg",
      title: "Advanced Research",
      description: "Cutting-edge food technology research facilities",
    },
    {
      image: "https://cftri.res.in/assets/user/images/innovation.jpg",
      title: "Innovation Hub",
      description: "Pioneering innovations in food science",
    },
    {
      image: "https://cftri.res.in/assets/user/images/collaboration.jpg",
      title: "Collaboration",
      description: "Working with industry and academia",
    },
    {
      image: "https://cftri.res.in/assets/user/images/training.jpg",
      title: "Training Programs",
      description: "Developing skilled professionals in food technology",
    },
  ];

  // Testimonial slider data
  const testimonials = [
    {
      image: "https://cftri.res.in/assets/user/images/testimonial1.jpg",
      text: "World-class research facilities",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial2.jpg",
      text: "Leading food technology institute",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial3.jpg",
      text: "Excellent research outcomes",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial4.jpg",
      text: "Innovative solutions for industry",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial5.jpg",
      text: "Collaborative research environment",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial6.jpg",
      text: "Cutting-edge technology",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial7.jpg",
      text: "Skilled researchers",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial8.jpg",
      text: "Industry partnerships",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial9.jpg",
      text: "Quality training programs",
    },
    {
      image: "https://cftri.res.in/assets/user/images/testimonial10.jpg",
      text: "National recognition",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 bg-black">
      {/* Full Screen Slider */}
      <div className="relative h-screen w-full">
        <Slider {...mainSliderSettings} className="h-full w-full">
          {mainSliderImages.map((slide, index) => (
            <div key={index} className="h-screen w-full relative">
              <img
                src={slide.url}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Central Food Technological Research Institute
                  </h1>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                    Pioneering food science and technology research since 1950
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="bg-white p-4 rounded-full shadow-lg mb-6">
          <img
            src="https://cftri.res.in/assets/user/images/Logo.png"
            alt="CFTRI Logo"
            className="h-8 w-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">CFTRI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Central Food Technological Research Institute - Your premier platform
          for food technology research and collaboration
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            to="/login/user"
            className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-blue-50"
          >
            <User className="h-5 w-5 mr-2 text-blue-600" />
            <span>User Login</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Our Pterions Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-blue-600">Pterions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pterions.map((pterion, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={pterion.image}
                  alt={pterion.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {pterion.title}
                  </h3>
                  <p className="text-gray-600">{pterion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-blue-600">Technologies</span>
          </h2>

          <Slider {...testimonialSliderSettings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                  <img
                    src={testimonial.image}
                    alt="Testimonial"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Contact Info */}
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-6 text-blue-300 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-blue-500">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 text-blue-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">TTBD Department</p>
                    <p>CSIR - Central Food Technological Research Institute</p>
                    <p>Mysore - 570020, Karnataka, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:ttbd@cftri.res.in"
                    className="hover:text-blue-300 transition duration-200"
                  >
                    ttbd@cftri.res.in
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+918212515670"
                    className="hover:text-blue-300 transition duration-200"
                  >
                    +91 821 251 5670
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-300 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-blue-500">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-blue-300 transition duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className="hover:text-blue-300 transition duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-blue-300 transition duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Logo */}
            <div className="flex flex-col items-center lg:items-end space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="https://cftri.res.in/assets/user/images/Logo.png"
                  alt="CFTRI Logo"
                  className="h-16 w-auto object-contain"
                />
                <p className="text-gray-400 text-sm text-center">
                  © {new Date().getFullYear()} CSIR-CFTRI. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
