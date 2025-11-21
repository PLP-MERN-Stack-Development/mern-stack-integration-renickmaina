import { useEffect, useState, useContext } from "react";
import API from "../api/axios.js";
import PostCard from "../components/PostCard.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 grid gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}
