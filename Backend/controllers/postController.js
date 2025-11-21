import Post from "../models/Post.js";

// @desc   Create a new post
// @route  POST /api/posts
// @access Private
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id, // coming from authMiddleware
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get all posts
// @route  GET /api/posts
// @access Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (error) {
    console.error("Fetch Posts Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get single post
// @route  GET /api/posts/:id
// @access Public
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Fetch Single Post Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update a post
// @route  PUT /api/posts/:id
// @access Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only author can edit
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to edit this post" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete a post
// @route  DELETE /api/posts/:id
// @access Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only author can delete
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this post" });
    }

    await post.remove();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
