import React, { useEffect, useState } from 'react';
import './favorite.css';
import axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_URL } from '../../Config';

const FavoritePage = () => {
  const [FavoritedMovies, setFavoritedMovies] = useState([]);

  const variables = { userFrom: localStorage.getItem('userId') };

  const fetchFavoritedMovies = () => {
    axios
      .post('/api/favorite/getFavoritedMovies', variables)
      .then((response) => {
        if (response.data.success) {
          // console.log(response);
          setFavoritedMovies(response.data.favorites);
        } else {
          alert('Failed to get favorited movies');
        }
      });
  };

  useEffect(() => {
    fetchFavoritedMovies();
  }, []);

  const onClickRemove = (movieId) => {
    const variables = {
      movieId: movieId,
      userFrom: localStorage.getItem('userId')
    };

    axios
      .post('/api/favorite/removeFromFavorites', variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoritedMovies();
        } else {
          alert('Failed to remove from Favorites');
        }
      });
  };

  const renderTableBody = FavoritedMovies.map((movie, index) => {
    const content = (
      <div>
        {movie.movieImage ? (
          <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt='movieImage' />
        ) : (
          'no image'
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime} mins</td>
        <td>
          <button onClick={() => onClickRemove(movie.movieId)}>Remove</button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h3>My Favorite Movies</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>

        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
};

export default FavoritePage;
