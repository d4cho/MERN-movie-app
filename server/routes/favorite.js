const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { Favorite } = require('../models/Favorite');
const { json } = require('body-parser');

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', auth, (req, res) => {
  // find favorite information inside favorite collection by movieId

  Favorite.find({ movieId: req.body.movieId }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: favorite.length });
  });
});

router.post('/favorited', auth, (req, res) => {
  // Find favorite information inside favorite collection by movieId AND userFrom

  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom
  }).exec((err, favorite) => {
    // console.log(favorite.length);
    if (err) return res.status(400).send(err);

    // How can we know if I already favorited this movie or not?
    let result = false; // didnt add movie as fave
    if (favorite.length !== 0) {
      result = true; // already added movie as fave
    }

    res.status(200).json({
      success: true,
      favorited: result
    });
  });
});

router.post('/addToFavorites', auth, (req, res) => {
  // Save the information about the movie and userId inside the favorite collection

  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/removeFromFavorites', auth, (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success });
    res.status(200).json({ success: true, doc });
  });
});

router.post('/getFavoritedMovies', (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    console.log(favorites);
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;
