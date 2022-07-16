import { gql } from "@apollo/client";

export const GET_USER_DETAILS = gql`
  query getUserDetails($username: String, $password: String) {
    users(
      where: { username: { _eq: $username }, password: { _eq: $password } }
    ) {
      age
      country
      gender
      id
      ignored_ad
      username
      name
    }
  }
`;
