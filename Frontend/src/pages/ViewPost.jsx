import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
