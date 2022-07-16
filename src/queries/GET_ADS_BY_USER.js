import { gql } from "@apollo/client";

export const GET_ADS_BY_USER = gql`
  query getAdsByUser(
    $ignore: [uuid!]
    $country: jsonb!
    $gender: jsonb!
    $age: Int
  ) {
    ads(
      where: {
        status: { _eq: true }
        target_country: { _contains: $country }
        target_gender: { _contains: $gender }
        id: { _nin: $ignore }
        target_age_from: { _lte: $age }
        target_age_to: { _gte: $age }
      }
    ) {
      company
      content
      link
      visited
      id
      company_name
    }
  }
`;
