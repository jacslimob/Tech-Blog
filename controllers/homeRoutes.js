const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Post} = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage',{logged_in: req.session.logged_in})
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
       attributes: { exclude: ['password'] },
      // include: [{ model: Post }]
    });

    const user = userData.get({plain:true});
    res.render('dashboard', {user, logged_in: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    // This can be changed to post/profile/user page
    res.redirect('/profile');
    return;
    }
  
  res.render('login');
});

module.exports = router;