import { gql } from "@apollo/client";

export const DELETE_AD = gql`
  mutation MyMutation2($id: uuid!) {
    delete_ads_by_pk(id: $id) {
      id
    }
  }
`;
