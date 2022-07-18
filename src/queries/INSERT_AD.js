import { gql } from "@apollo/client";

export const INSERT_ADS = gql`
  mutation insertAd(
    $company: uuid!
    $content: String!
    $link: String!
    $status: Boolean!
    $target_country: jsonb!
    $target_gender: jsonb!
    $company_name: String
    $target_age_from: Int
    $target_age_to: Int
  ) {
    insert_ads(
      objects: {
        content: $content
        link: $link
        status: $status
        target_country: $target_country
        target_gender: $target_gender
        company: $company
        company_name: $company_name
        target_age_from: $target_age_from
        target_age_to: $target_age_to
      }
    ) {
      returning {
        company
        content
        id
        link
        status
        company_name
        target_country
        target_gender
        target_age_from
        target_age_to
        visited
      }
    }
  }
`;
