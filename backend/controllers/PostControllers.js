import  {Post} from "../models/PostModel.js";
import  errorHandler  from "../utils/error.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to create a post", false)
    );
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "please provide all required fields", false));
  }
  const slug = req.body.title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
    category: req.body.category,
  });
  try {
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIdx = parseInt(req.query.startIdx) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIdx)
      .limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    return next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(
        errorHandler(403, "You are not allowed to delete this post", false)
      );
    }
    await Post.findByIdAndDelete(req.params.postId);
    return res.status(200).json("The post has been deleted");
  } catch (error) {
    return next(error);
  }
};

export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.params.userId != req.user.id) {
    return next(
      errorHandler(400, "you are not allowed to update this user", false)
    );
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
          category: req.body.category,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedPost)
  } catch (error) {
    return next(error);
  }
};


