const Post = require('../models/post');
const successHandler = require('../service/successHandler')
const errorHandler = require('../service/errorHandler')
const headers = require('../service/headers');

const posts = {
  async getPosts({ req, res }) {
    const post = await Post.find();
    successHandler(res, post);
  },
  async createPosts({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      const newPost = await Post.create({
        name: data.name,
        content: data.content,
      });
      successHandler(res, newPost);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  async deletePost({ req, res }) {
    const id = url.split('/').pop();
    const post = await Post.findByIdAndDelete(id);
    successHandler(res, post);
  }
};

module.exports = posts;
