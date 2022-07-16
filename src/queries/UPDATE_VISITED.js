import { gql } from "@apollo/client";

export const UPDATE_VISITED = gql`
  mutation updateVisited($id: uuid!, $visited: Int!) {
    update_ads_by_pk(pk_columns: { id: $id }, _set: { visited: $visited }) {
      visited
      link
      id
      content
      company
    }
  }
`;
