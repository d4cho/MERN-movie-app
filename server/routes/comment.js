const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');
const { auth } = require('../middleware/auth');

//=================================
//             Comment
//=================================

router.post('/saveComment', auth, (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: doc._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.post('/getComments', (req, res) => {
  // console.log(req.body.movieId);
  Comment.find({ movieId: req.body.movieId })
    .populate('writer')
    .exec((err, comments) => {
      console.log(comments);
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
