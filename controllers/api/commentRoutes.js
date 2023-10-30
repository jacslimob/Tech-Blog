// Need a Post'/' and Put'/' for updates
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')
// api/comments/:postId
router.post('/:postId', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body, 
            user_id: req.session.user_id,
            post_id: req.params.postId
            
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;