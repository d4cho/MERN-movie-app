import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

const LikeDislike = (props) => {
  const [likes, setLikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikes, setDislikes] = useState(0);
  const [dislikeAction, setDislikeAction] = useState(null);

  let variable = {};
  if (props.movie) {
    variable = {
      movieId: props.movieId,
      userId: props.userId
    };
  } else {
    variable = {
      commentId: props.commentId,
      userId: props.userId
    };
  }

  useEffect(() => {
    Axios.post('/api/like/getLikes', variable).then((response) => {
      if (response.data.success) {
        // how many likes does this movie or comment already have?
        setLikes(response.data.likes.length);

        // is like button clicked?
        response.data.likes.forEach((like) => {
          if (like.userId === props.userId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Failed to get likes');
      }
    });

    Axios.post('/api/like/getDislikes', variable).then((response) => {
      if (response.data.success) {
        // how many dislikes does this movie or comment already have?
        setDislikes(response.data.dislikes.length);

        // is dislike button clicked?
        response.data.dislikes.forEach((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Failed to get dislikes');
      }
    });
  }, []);

  const onLike = () => {
    if (likeAction === null) {
      Axios.post('/api/like/upLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(likes + 1);
          setLikeAction('liked');

          // if dislike button is already clicked
          if (dislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(dislikes - 1);
          }
        } else {
          alert('Failed to like');
        }
      });
    } else {
      Axios.post('/api/like/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        } else {
          alert('Failed to unlike');
        }
      });
    }
  };

  const onDislike = () => {
    if (dislikeAction !== null) {
      Axios.post('/api/like/unDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(dislikes - 1);
          setDislikeAction(null);
        } else {
          alert('failed to remove dislike');
        }
      });
    } else {
      Axios.post('/api/like/upDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(dislikes + 1);
          setDislikeAction('disliked');

          // if dislike button is already clicked
          if (likeAction !== null) {
            setLikeAction(null);
            setLikes(likes - 1);
          }
        } else {
          alert('failed to dislike');
        }
      });
    }
  };

  return (
    <div
      style={{
        paddingRight: '15px',
        paddingLeft: '15px',
        border: '1px solid gray'
      }}>
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          <Icon
            type='like'
            theme={likeAction === 'liked' ? 'filled' : 'outlined'}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key='comment-basic-dislike'>
        <Tooltip title='Dislike'>
          <Icon
            type='dislike'
            theme={dislikeAction === 'disliked' ? 'filled' : 'outlined'}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{dislikes}</span>
      </span>
    </div>
  );
};

export default LikeDislike;
