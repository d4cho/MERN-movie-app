import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import LikeDislike from './LikeDislike';
const { TextArea } = Input;

const SingleComment = (props) => {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState('');
  const [openReply, setOpenReply] = useState(false);

  const openReplyHandler = () => {
    setOpenReply(!openReply);
  };

  const actions = [
    <LikeDislike
      comment
      commentId={props.comment._id}
      userId={user.userData._id}
    />,
    <span
      style={{ border: '1px solid gray', padding: '2px' }}
      onClick={openReplyHandler}
      key='comment-basic-reply-to'>
      Reply
    </span>
  ];

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      movieId: props.comment.movieId,
      responseTo: props.comment._id,
      content: commentValue
    };

    Axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue('');
        setOpenReply(!setOpenReply);
        props.refreshFunction(response.data.result);
      } else {
        alert('Failed to save comment');
      }
    });
  };

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt='image' />}
        content={<p>{props.comment.content}</p>}></Comment>

      {openReply && (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={handleChange}
            value={commentValue}
            placeholder='Comment on this movie'
          />
          <br />
          <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
