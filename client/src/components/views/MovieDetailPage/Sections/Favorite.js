import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorite = (props) => {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime
  };

  useEffect(() => {
    axios.post('/api/favorite/favoriteNumber', variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert('Failed to get favoriteNumber');
      }
    });

    axios.post('/api/favorite/favorited', variables).then((response) => {
      console.log(response.data.favorited);
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert('Failed to get favorite info');
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      // When already added

      axios
        .post('/api/favorite/removeFromFavorites', variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert('Failed to remove from Favorites');
          }
        });
    } else {
      // When not added yet

      axios.post('/api/favorite/addToFavorites', variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('Failed to add to Favorites');
        }
      });
    }
  };

  return (
    <div>
      <button onClick={onClickFavorite}>
        {Favorited ? 'Remove from Favorites' : 'Add to Favorites'}{' '}
        {FavoriteNumber}
      </button>
    </div>
  );
};

export default Favorite;
