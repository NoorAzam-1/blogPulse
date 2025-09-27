// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />

//       <main className="flex-grow flex items-center justify-center p-6">
//         {/* Main Content Area */}
//         <div className="text-center max-w-2xl px-4">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-wide">
//             Welcome to Our Blog Community
//           </h1>
//           <p className="mt-4 text-lg md:text-xl text-gray-600">
//             Share your thoughts, connect with other writers, and discover inspiring stories.
//           </p>

//           <div className="mt-8">
//             <Link
//               to="/create-post"
//               className="inline-block px-8 py-4 bg-green-500 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-600 transition-colors"
//             >
//               Start Your Journey
//             </Link>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="text-white pt-32 pb-40 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-24 text-center relative z-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
                Discover captivating reads,
              </span>
              <br />
              <span className="text-white">and share your unique voice.</span>
            </h1>
            <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
              Explore insightful articles, tutorials, and personal stories from a
              community of passionate writers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mt-12">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Find topics, tags, or authors..."
                  className="w-full pl-12 pr-6 py-4 outline-none text-base bg-white/5 text-gray-200 placeholder-gray-500 rounded-full border border-gray-700 backdrop-blur-sm focus:border-sky-500 transition-colors"
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        ---
        {/* Featured Posts Section */}

{/* <MyPosts/> */}

       <NewsLetter/>
        ---
        {/* Community Call-to-Action */}
{/*         <section className="py-20 px-4">
          <div className="mx-auto max-w-4xl text-center bg-gray-800 p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to share your story?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Join our community of writers and start publishing your unique voice today.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300"
            >
              Become a Member
            </Link>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
