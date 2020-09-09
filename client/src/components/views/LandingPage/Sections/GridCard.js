import React from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';

const GridCard = (props) => {
  if (props.actor) {
    return (
      <div>
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: 'relative' }}>
            <img
              style={{ width: '100%', height: '320px' }}
              alt='img'
              src={props.image}
            />
          </div>
        </Col>
      </div>
    );
  } else {
    return (
      <div>
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: 'relative' }}>
            <Link to={`/movie/${props.movieId}`}>
              <img
                style={{ width: '100%', height: '320px' }}
                alt='img'
                src={props.image}
              />
            </Link>
          </div>
        </Col>
      </div>
    );
  }
};

export default GridCard;
