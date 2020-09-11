import React, { useState } from 'react';
import { Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

const Comments = (props) => {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: comment,
      writer: user.userData._id,
      movieId: props.movieId
    };

    Axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        // console.log(response);
        setComment('');
        props.refreshFunction(response.data.result);
      } else {
        alert('Failed to save comment in the database');
      }
    });
  };

  return (
    <div>
      <br />
      {/* root comment form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={comment}
          placeholder='Comment on this movie'
        />
        <br />
        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </Button>
      </form>

      {/* comment lists */}

      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  movieId={props.movieId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  commentList={props.commentList}
                  movieId={props.movieId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      {/* single comment component */}
    </div>
  );
};

export default Comments;
