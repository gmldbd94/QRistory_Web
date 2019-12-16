import { gql } from "apollo-boost";

export const FOLLOW = gql`
  mutation follow($id: String!) {
    followUser(id: $id)
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollowUser(id: $id)
  }
`;
