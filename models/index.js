// Just the associations
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User);

Post.hasOne(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post);

module.exports = { User };