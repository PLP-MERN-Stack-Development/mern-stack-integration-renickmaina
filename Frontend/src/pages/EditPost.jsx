import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) navigate("/login");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setForm({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.put(`/posts/${id}`, form);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="border px-3 py-2 rounded h-40"
          required
        />
        <button
          type="submit"
          className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
