import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    post {
      created_by
      created_at
      content
      id
      author_name
    }
  }
`;
