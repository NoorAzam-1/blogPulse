import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [openRow, setOpenRow] = useState(null); 

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/posts");
      setPosts(res.data);
    } catch {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get("/admin/tags");
      setTags(res.data);
    } catch {
      toast.error("Failed to fetch tags");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`/admin/posts/${id}`);
      toast.success("Post deleted successfully");
      fetchPosts();
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const handleEditTags = (post) => {
    setEditingPostId(post._id);
    setSelectedTags(post.tags || []);
  };

  const handleSaveTags = async (postId) => {
    try {
      await axios.put(`/admin/posts/${postId}/tags`, { tags: selectedTags });
      toast.success("Tags updated successfully");
      setEditingPostId(null);
      setSelectedTags([]);
      fetchPosts();
    } catch {
      toast.error("Failed to update tags");
    }
  };

  const toggleTag = (tagName) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Posts</h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading posts...</p>
      ) : (
        <>
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full table-auto text-gray-800">
              <thead className="bg-gray-200 border-b-2 border-gray-300">
                <tr>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-left">Tags</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <tr
                      key={post._id}
                      className="border-t border-gray-200 hover:bg-gray-100 transition"
                    >
                      <td className="p-4">{post.title}</td>
                      <td className="p-4">{post.author?.name || "Unknown"}</td>
                      <td className="p-4">
                        {editingPostId === post._id ? (
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span
                                key={tag._id}
                                onClick={() => toggleTag(tag.name)}
                                className={`px-3 py-1 rounded-full cursor-pointer text-sm font-medium transition-colors ${selectedTags.includes(tag.name)
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                  }`}
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {post.tags?.length > 0 ? (
                              post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="py-1 rounded-full text-sm font-medium text-gray-700"
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 italic">
                                No tags
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {editingPostId === post._id ? (
                          <div className="flex justify-center gap-2">
                            <button
                              className="text-white px-3 py-1 rounded-full bg-green-600 hover:bg-green-700"
                              onClick={() => handleSaveTags(post._id)}
                              title="Save Tags"
                            >
                              <FaSave />
                            </button>
                            <button
                              className="text-white px-3 py-1 rounded-full bg-gray-500 hover:bg-gray-600"
                              onClick={() => setEditingPostId(null)}
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center gap-2">
                            <button
                              className="text-white px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleEditTags(post)}
                              title="Edit Tags"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-white px-3 py-1 rounded-full bg-red-600 hover:bg-red-700"
                              onClick={() => handleDelete(post._id)}
                              title="Delete Post"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {posts.length > 0 ? (
              posts.map((post, idx) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {post.author?.name || "Unknown"}
                      </p>
                    </div>
                    <button
                      onClick={() => setOpenRow(openRow === idx ? null : idx)}
                      className="text-purple-600 text-lg"
                    >
                      {openRow === idx ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>

                  <div className="mt-3">
                    {editingPostId === post._id ? (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag._id}
                            onClick={() => toggleTag(tag.name)}
                            className={`px-3 py-1 rounded-full cursor-pointer text-sm font-medium transition-colors ${selectedTags.includes(tag.name)
                              ? "bg-green-600 text-white"
                              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                              }`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {post.tags?.length > 0 ? (
                          post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="py-1 rounded-full text-sm font-medium  text-gray-700"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 italic">No tags</span>
                        )}
                      </div>
                    )}
                  </div>

                  {openRow === idx && (
                    <div className="mt-3 flex justify-center gap-2 flex-wrap border-t border-gray-200 pt-3 transition-all duration-300">
                      {editingPostId === post._id ? (
                        <>
                          <button
                            className="text-white px-3 py-1 rounded-full bg-green-600 hover:bg-green-700"
                            onClick={() => handleSaveTags(post._id)}
                          >
                            <FaSave />
                          </button>
                          <button
                            className="text-white px-3 py-1 rounded-full bg-gray-500 hover:bg-gray-600"
                            onClick={() => setEditingPostId(null)}
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="text-white px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleEditTags(post)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-white px-3 py-1 rounded-full bg-red-600 hover:bg-red-700"
                            onClick={() => handleDelete(post._id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
