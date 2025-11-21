import { Link } from "react-router-dom";
import { cn } from "../lib/utils.js";
import API from "../api/axios.js";

export default function PostCard({ post, user, onDelete }) {
  const isAuthor = user && user.id === post.author._id;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await API.delete(`/posts/${post._id}`);
      // call parent function to remove from UI
      onDelete(post._id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  return (
    <div className={cn("border p-4 rounded shadow hover:shadow-lg transition bg-white")}>
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-2">{post.content.slice(0, 100)}...</p>
      <p className="text-sm text-gray-500 mb-2">
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="flex gap-2">
        <Link
          to={`/posts/${post._id}`}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View
        </Link>
        {isAuthor && (
          <>
            <Link
              to={`/posts/edit/${post._id}`}
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
