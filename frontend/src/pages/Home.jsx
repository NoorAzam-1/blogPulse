import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
                    {/* Background Blobs */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                    </div>

                    {/* Main Content */}
                    <div className="mx-auto w-full text-center relative z-10 px-3 sm:px-6 lg:px-12">
                        {/* Heading */}
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-balance">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
                                Discover captivating reads,
                            </span>
                            <br />
                            <span className="text-white">and share your unique voice.</span>
                        </h1>

                        {/* Description */}
                        <p className="mt-4 sm:mt-6 md:mt-8 max-w-2xl mx-auto text-gray-400 text-sm xs:text-base sm:text-lg leading-relaxed px-2 sm:px-4">
                            Explore insightful articles, tutorials, and personal stories from a
                            community of passionate writers.
                        </p>

                        {/* Search Bar */}
                        <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xl mx-auto mt-8 sm:mt-12 px-3 sm:px-2">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Find topics, tags, or authors..."
                                    className="w-full pl-10 sm:pl-12 pr-6 py-3 sm:py-4 outline-none text-sm sm:text-base bg-white/5 text-gray-200 placeholder-gray-500 rounded-full border border-gray-700 backdrop-blur-sm focus:border-sky-500 transition-colors"
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-500"
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
                                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 ease-in-out cursor-pointer shadow-md hover:shadow-xl text-sm sm:text-base"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </section>

                {/* Newsletter Section */}
                <NewsLetter />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
