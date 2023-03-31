const Post = require('../models/post');
const successHandler = require('../service/successHandler');
const errorHandler = require('../service/errorHandler');
const headers = require('../service/headers');

const posts = {
  async getPosts({ req, res }) {
    const post = await Post.find();
    successHandler(res, post);
  },
  async createPosts({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      const { name, content, image, createdAt, likes } = data;
      const newPost = await Post.create({
        name,
        content,
        image,
        createdAt,
        likes,
      });
      successHandler(res, newPost);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  async deletePost({ req, res }) {
    const id = req.url.split('/').pop();
    const post = await Post.findByIdAndDelete(id);
    successHandler(res, post);
  },
  async deletePosts({ req, res }) {
    await Post.deleteMany({});
    successHandler(res, []);
  },
  async editPost({ body, req, res }) {
    try {
      const id = req.url.split('/').pop();
      const data = JSON.parse(body);
      const { name, content, image, createdAt, likes } = data;
      const post = await Post.findByIdAndUpdate(id, {
        $set: {
          name,
          content,
          image,
          createdAt,
          likes,
        },
      });
      successHandler(res, post);
    } catch (error) {
      errorHandler(res, error);
    }
  },
};

module.exports = posts;
