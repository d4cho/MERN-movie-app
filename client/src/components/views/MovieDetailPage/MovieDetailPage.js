import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions, Button, Row } from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorite from './Sections/Favorite';

const { Item } = Descriptions;

const MovieDetailPage = (props) => {
  const [Movie, setMovie] = useState({});
  const [Cast, setCast] = useState([]);
  const [ActorToggle, SetActorToggle] = useState(false);

  const movieId = props.match.params.movieId;

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response.cast);
            setCast(response.cast);
          });
      });
  }, []);

  const handleClick = () => {
    SetActorToggle(!ActorToggle);
  };

  return (
    <div>
      <MainImage
        image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite
            userFrom={localStorage.getItem('userId')}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>
      </div>

      <Descriptions title='Movie Info' bordered>
        <Item label='Title'>{Movie.original_title}</Item>
        <Item label='Release Date'>{Movie.release_date}</Item>
        <Item label='Revenue'>$ {Movie.revenue}</Item>
        <Item label='Runtime'>{Movie.runtime} minutes</Item>
        <Item label='Average Score' span={2}>
          {Movie.vote_average} / 10
        </Item>
        <Item label='Number of Votes'>{Movie.vote_count}</Item>
        <Item label='Status'>{Movie.status}</Item>
        <Item label='Popularity'>{Movie.popularity}</Item>
      </Descriptions>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick}>Toggle Actor View</Button>
      </div>
      <br />
      <br />
      {ActorToggle && (
        <Row gutter={[16, 16]}>
          {Cast.map((crew, index) => (
            <React.Fragment key={index}>
              {crew.profile_path && (
                <GridCard
                  actor
                  image={`${IMAGE_URL}w500${crew.profile_path}`}
                />
              )}
            </React.Fragment>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MovieDetailPage;
