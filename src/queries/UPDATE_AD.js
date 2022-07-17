import { gql } from "@apollo/client";

export const UPDATE_AD = gql`
  mutation updateAd(
    $id: uuid!
    $content: String!
    $link: String!
    $status: Boolean!
    $target_country: jsonb!
    $target_gender: jsonb!
    $target_age_from: Int
    $target_age_to: Int
  ) {
    update_ads_by_pk(
      pk_columns: { id: $id }
      _set: {
        content: $content
        link: $link
        status: $status
        target_country: $target_country
        target_gender: $target_gender
        target_age_from: $target_age_from
        target_age_to: $target_age_to
      }
    ) {
      target_gender
      id
      content
      link
      target_age_to
      target_age_from
      target_country
      status
      company_name
      company
    }
  }
`;
