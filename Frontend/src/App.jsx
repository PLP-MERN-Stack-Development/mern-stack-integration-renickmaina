import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import ViewPost from "./pages/ViewPost.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/posts/:id" element={<ViewPost />} />
      </Routes>
    </div>
  );
}

export default App;
