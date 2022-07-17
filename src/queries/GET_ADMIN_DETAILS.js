import { gql } from "@apollo/client";

export const GET_ADMIN_DETAILS = gql`
  query getAdminDetails($username: String, $password: String) {
    admin(
      where: { password: { _eq: $password }, username: { _eq: $username } }
    ) {
      id
      username
    }
  }
`;
