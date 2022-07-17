import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query getAllAds {
    ads {
      company
      company_name
      content
      id
      link
      status
      target_age_from
      target_age_to
      target_country
      target_gender
      visited
    }
  }
`;
