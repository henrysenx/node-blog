const { getCategoryById } = require('./categories');
const { addPostsTags } = require('./tags');
const Model = require('../database/models');
const Op = Model.Sequelize.Op;

const { posts, users, categories, posts_categories, tags, comments } = Model.sequelize.models;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: posts } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, posts, totalPages, currentPage };
};

const getPosts = async ({ page, size, slug }) => {
  const { limit, offset } = getPagination(page, size);
  var condition = slug ? { slug: { [Op.eg]: `${slug}` } } : null;
  const post = await posts.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { slug: { [Op.like]: `%${slug}%` } },
    include: [
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
    ],
    order: [['createdAt', 'ASC']],
  });

  const paginatedPost = getPagingData(post, page, limit);

  return paginatedPost;
};

const addPosts = async (user, payload) => {
  console.log(user);
  const { id } = user;
  const { categoryId, tagId, title, slug, short_desc, content } = payload;
  const post = await posts.create({ categoryId, tagId, userId: id, title, slug, short_desc, content });
  await posts_categories.create({
    postId: post.id,
    categoryId,
  });
  return post;
};

const getPostsById = async (id) => {
  const post = await posts.findOne({
    where: { id },
    include: [
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
      {
        model: tags,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
    ],
  });
  return post;
};

const getPostsBySlug = async (slug) => {
  const post = await posts.findOne({
    where: { slug: slug },
    include: [
      'comments',
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
      {
        model: tags,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
    ],
  });
  return post;
};

module.exports = {
  getPosts,
  addPosts,
  getPostsById,
  getPostsBySlug,
};
