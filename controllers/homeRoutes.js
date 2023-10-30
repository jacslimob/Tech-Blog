const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Post, Comment} = require('../models');
const sequelize = require("../config/connection");


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include:[ 
        {
          model:User,
          attributes: ['name'],
          
        } 
      ],
      
    }
    );

    const posts = postData.map(post => post.get({ plain: true }));
    
    res.render('homepage', {posts, logged_in: req.session.logged_in})
  } catch (err) {
    res.status(500).json(err);
  }
    
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: 
        {
          model: Post,
          attributes: ['id','title','content','date_created']
        }
      
    });

    const user = userData.get({plain:true});
    
    res.render('dashboard', {user, logged_in: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/dashPost/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const postData = await Post.findByPk(postId, {
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['body', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    const data = postData.get({ plain: true });
    

    // Pass the data to your Handlebars template
    res.render('dashPost', { data, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// display one post
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const postData = await Post.findByPk(postId, {
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['body', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    const data = postData.get({ plain: true });
    

    // Pass the data to your Handlebars template
    res.render('post', { data, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    // This can be changed to post/profile/user page
    res.redirect('/');
    return;
    }
  
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = router;