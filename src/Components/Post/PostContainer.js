import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
import {DateToNow} from "../DateToNow";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isDatetoNowAt, setDateNowAt] = useState(createdAt);
  console.log(DateToNow(createdAt));
  //useState를 사용하여 비동기적으로 처리 할 수 있다.
  //useState는 마치 데이터에 반영한 것처럼 처리하는 것이다.
  //S를 붙인 이유는 앞서 prop와 겹치기 때문이다.
  //useState(isLike)는 데이터베이스을 isLikeS에 저장하고 setIsLiked를 통하여 값을 변경할 수 있다.
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);

  //댓글 또한 비동기적 처리를 위해 useState를 이용하였다.
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");

  //mutation에 필요한 value값을 연결해준다.
  // toggleLikeMutation()함수를 요청하기 위해서는 []로 감싸줘야한다.
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

//slide는 React 함수에 포함된 useEffect를 사용하여 비동기적으로 사용하였다.
//각 파일의 index를 통하여 화면에 표시 했으며, 해당하는 사진만 opacity값을 1 아닌 사진은 0으로 설정
  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };
  useEffect(() => {
    slide();
  }, [currentItem]);

  //엔터(KeyCode:13)를 눌렀을 때 동작을 한다.
  // console.log(e.keyCode);
  // 키보드에서 입력된 keyCode를 확인 할 수 있다.
  const onKeyPress = async event => {
    const { which } = event;
    if (which === 13) {
      //이벤트가 계속 이어나가지 않게 한다.
      event.preventDefault();
      try {
        //작성글 데이터베이스로 보내기
        const { data: { addComment } } = await addCommentMutation();
        //임시로 화면에 표시하는 setSelfComments함수
        setSelfComments([...selfComments, addComment]);
        comment.setValue("");
        console.log("writing!");
      } catch {
        toast.error("Cant send comment");
      }
    }
  };

  // 이해가 안된다면 7.4장을 다시 보자
  const toggleLike = () => {
    // toggleLikeMutation는 데이터베이스
    toggleLikeMutation();
    //setIsLiked는 화면 처리
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };
  return (
    <PostPresenter
      id={id}
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};
//값을 받아오는 형태를 지정해준다.
//gpl의 query를 확인해볼것!
PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
