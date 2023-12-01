const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');


//new post route
router.post('/', withAuth, async (req,res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      ...req.body,
      user_id: req.session.user_id
    },
    {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(postData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete route 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;