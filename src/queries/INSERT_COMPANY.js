import { gql } from "@apollo/client";

export const INSERT_COMPANY = gql`
  mutation MyMutation($company_name: String) {
    insert_client_company(objects: { company_name: $company_name }) {
      affected_rows
      returning {
        company_name
        id
      }
    }
  }
`;
