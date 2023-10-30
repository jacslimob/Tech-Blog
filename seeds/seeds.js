const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./User.json');
const comment = require('./Comment.json');
const post = require('./Post.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(post);

  await Comment.bulkCreate(comment);
  
  process.exit(0);
};

seedDatabase();
