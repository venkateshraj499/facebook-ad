import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation addPost($author_name: String, $content: String, $created_by: uuid) {
    insert_post(
      objects: {
        author_name: $author_name
        content: $content
        created_by: $created_by
      }
    ) {
      returning {
        content
        author_name
        created_at
        created_by
        id
      }
    }
  }
`;
