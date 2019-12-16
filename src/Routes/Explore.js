import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import { POST_FRAGMENT } from "./Fragments";
import Post from "../Components/Post/index";

const SEE_FULLPOST = gql `
  query seeFullPost($post_id: String!){
    seeFullPost(id: $post_id){
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

//내가 원하는 props를 가져오기 위해서 console.log(props)를 하고 원하는 정보만 파싱을 해야한다.

export default withRouter(({ match: { params: { post_id } } }) => {
  const { data, loading } = useQuery(SEE_FULLPOST, { variables: { post_id } });
  console.log(data);
  if(loading){
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  else{
    const {
      seeFullPost: {
        id,
        user,
        location,
        caption,
        files,
        likeCount,
        isLiked,
        comments,
        createdAt
      }
    } = data;
  }
  return (
    <Wrapper>
      <Post
        key={data.seeFullPost.id}
        id={data.seeFullPost.id}
        user={data.seeFullPost.user}
        location={data.seeFullPost.location}
        caption={data.seeFullPost.caption}
        files={data.seeFullPost.files}
        likeCount={data.seeFullPost.likeCount}
        isLiked={data.seeFullPost.isLiked}
        comments={data.seeFullPost.comments}
        createdAt={data.seeFullPost.createdAt}
      />
    </Wrapper>
  );
});
