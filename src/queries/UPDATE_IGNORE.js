import { gql } from "@apollo/client";

export const UPDATE_IGNORE = gql`
  mutation updateIgnore($ignore: jsonb!, $id: uuid!) {
    update_users(
      where: { id: { _eq: $id } }
      _append: { ignored_ad: $ignore }
    ) {
      affected_rows
    }
  }
`;
