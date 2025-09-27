import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700 py-4 px-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-wide transition-colors duration-300 hover:text-sky-300"
                >
                    Blogging
                </Link>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link
                                to="/my-posts"
                                className="text-lg font-medium transition-colors duration-300 hover:text-sky-300"
                            >
                                My Posts
                            </Link>
                            <Link
                                to="/create-post"
                                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-700 transition-colors duration-300"
                            >
                                Create Post
                            </Link>
                            <button
                                onClick={logout}
                                className="text-lg font-medium transition-colors duration-300 hover:text-red-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/auth"
                                className="text-lg font-medium transition-colors duration-300 hover:text-sky-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth"
                                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-700 transition-colors duration-300"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;