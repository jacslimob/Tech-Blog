// Just the associations
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User);

Post.hasMany(Comment);

Comment.belongsTo(Post);

Comment.belongsTo(User);

User.hasMany(Comment);

module.exports = { User, Post, Comment };