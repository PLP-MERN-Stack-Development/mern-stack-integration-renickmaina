import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) navigate("/login");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/posts", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
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
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
