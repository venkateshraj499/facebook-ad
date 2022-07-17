import { gql } from "@apollo/client";

export const GET_ALL_COMPANIES = gql`
  query getAllCompany {
    client_company {
      company_name
      id
    }
  }
`;
