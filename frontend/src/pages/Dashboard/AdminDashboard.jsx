import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaCheckCircle,
  FaBan,
  FaTrashAlt,
  FaArrowUp,
  FaArrowDown,
  FaPenNib,
  FaHeart,
  FaCommentAlt,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [openRow, setOpenRow] = useState(null);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const currentUserId = localStorage.getItem("userId");

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/admin/analytics");
      setStats(res.data);
    } catch {
      toast.error("Failed to fetch analytics");
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    fetchUsers();
  }, []);

  const handleBlock = async (user) => {
    if (user._id === currentUserId) {
      toast.error("You cannot block/unblock yourself");
      return;
    }
    try {
      const res = await axios.put(`/admin/users/${user._id}/block`);
      toast.success(res.data.message);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, blocked: res.data.blocked } : u
        )
      );
    } catch {
      toast.error("Failed to block/unblock user");
    }
  };

  const handleToggleRole = async (user) => {
    if (user._id === currentUserId) {
      toast.error("You cannot change your own role");
      return;
    }
    try {
      const res = await axios.put(`/admin/users/${user._id}/role`);
      toast.success(res.data.message);
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (user) => {
    if (user._id === currentUserId) {
      toast.error("You cannot delete yourself");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`))
      return;
    try {
      const res = await axios.delete(`/admin/users/${user._id}`);
      toast.success(res.data.message);
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (filterRole === "all" || user.role === filterRole) &&
      (filterStatus === "all" ||
        (filterStatus === "active" ? !user.blocked : user.blocked)) &&
      (user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Admin Dashboard
      </h1>

      {stats ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {[
            { icon: <FaUser />, label: "Total Users", value: stats.totalUsers },
            { icon: <FaPenNib />, label: "Total Posts", value: stats.totalPosts },
            { icon: <FaHeart />, label: "Total Likes", value: stats.totalLikes },
            {
              icon: <FaCommentAlt />,
              label: "Total Comments",
              value: stats.totalComments || "N/A",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 md:p-6 rounded-xl shadow-lg flex items-center gap-3 md:gap-4"
            >
              <div className="text-green-600 text-2xl md:text-3xl">
                {item.icon}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-600">
                  {item.label}
                </h2>
                <p className="text-xl md:text-3xl font-bold text-gray-800">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mb-6">Loading analytics...</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-gray-700 w-full sm:w-auto flex-1"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-gray-700 w-full sm:w-auto flex-1"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-gray-700 flex-1"
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Users</h2>

      {loadingUsers ? (
        <p className="text-gray-600 text-center">Loading users...</p>
      ) : (
        <div>
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-y-auto">
            <table className="min-w-full text-gray-800 text-sm md:text-base">
              <thead className="bg-gray-200 border-b-2 border-gray-300">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-gray-200 hover:bg-gray-100 transition"
                    >
                      <td className="p-3 font-semibold break-words">{user.name}</td>
                      <td className="p-3 break-words">{user.email}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "admin"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-gray-300 text-gray-700"
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${user.blocked
                            ? "bg-red-200 text-red-800"
                            : "bg-green-200 text-green-800"
                            }`}
                        >
                          {user.blocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2 flex-wrap">
                          <button
                            className={`text-white px-3 py-1 rounded-full ${user.blocked
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-yellow-500 hover:bg-yellow-600"
                              } transition ${user._id === currentUserId
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                              }`}
                            onClick={() => handleBlock(user)}
                            disabled={user._id === currentUserId}
                          >
                            {user.blocked ? <FaCheckCircle /> : <FaBan />}
                          </button>

                          <button
                            className={`text-white px-3 py-1 rounded-full ${user.role === "admin"
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-blue-500 hover:bg-blue-600"
                              } transition ${user._id === currentUserId
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                              }`}
                            onClick={() => handleToggleRole(user)}
                            disabled={user._id === currentUserId}
                          >
                            {user.role === "admin" ? <FaArrowDown /> : <FaArrowUp />}
                          </button>

                          <button
                            className={`text-white px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-800 transition ${user._id === currentUserId
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                              }`}
                            onClick={() => handleDelete(user)}
                            disabled={user._id === currentUserId}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-600">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => (
                <div
                  key={user._id}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-gray-600 text-sm break-words">{user.email}</p>
                    </div>

                    <button
                      onClick={() => setOpenRow(openRow === idx ? null : idx)}
                      className="text-purple-600 text-lg focus:outline-none"
                    >
                      {openRow === idx ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>

                  <div className="flex justify-between mt-2 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "admin"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-300 text-gray-700"
                        }`}
                    >
                      {user.role}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${user.blocked
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                        }`}
                    >
                      {user.blocked ? "Blocked" : "Active"}
                    </span>
                  </div>

                  {openRow === idx && (
                    <div className="mt-3 flex justify-center gap-2 flex-wrap border-t border-gray-200 pt-3 transition-all duration-300">
                      <button
                        className={`text-white px-3 py-1 rounded-full ${user.blocked
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                          } transition`}
                        onClick={() => handleBlock(user)}
                      >
                        {user.blocked ? <FaCheckCircle /> : <FaBan />}
                      </button>

                      <button
                        className={`text-white px-3 py-1 rounded-full ${user.role === "admin"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-blue-500 hover:bg-blue-600"
                          } transition`}
                        onClick={() => handleToggleRole(user)}
                      >
                        {user.role === "admin" ? <FaArrowDown /> : <FaArrowUp />}
                      </button>

                      <button
                        className="text-white px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-800 transition"
                        onClick={() => handleDelete(user)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No users found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminDashboard;
