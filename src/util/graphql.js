import gql from "graphql-tag";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
