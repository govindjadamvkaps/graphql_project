import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation createUser($userNeww: UserInput!) {
    user: signupUser(userNew: $userNeww) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation singinUser($userlogin: UserSignInInput!) {
    user: singinUser(usersignIn: $userlogin) {
      token
    }
  }
`;


export const CREATE_QUOTES = gql`
mutation createQuote($name:String!){
    createQuote: createQuote(name:$name) 
  }
`