import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

const ReplyComment = (props) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentList.forEach((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentList, props.parentCommentId]);

  const renderReplyComment = (parentCommentId) => {
    return props.commentList.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.responseTo === props.parentCommentId && (
          <div style={{ marginLeft: '50px', width: '80%' }}>
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
          </div>
        )}
      </React.Fragment>
    ));
  };

  const handleClick = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: '14px', margin: 0, color: 'gray' }}
          onClick={handleClick}>
          View {childCommentNumber} more comment(s)
        </p>
      )}

      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
};

export default ReplyComment;
