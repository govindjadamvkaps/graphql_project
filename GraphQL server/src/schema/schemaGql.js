import { gql } from "apollo-server";

const typeDefs = gql`

type Query {
    users:[UserModel]
    user(_id:ID!):UserModel
    quotes:[QuotesWithName]
    iquotes(by:ID):Quote
    singleuser:UserById
    myprofile:UserModel
}

type QuotesWithName{
    name:String
    by:IdName

}
type IdName{
    _id: String
    firstName:String
    lastName:String
}

type UserModel{
    _id:ID
    firstName:String
    lastName: String
    email: String
    password: String
    quotes:[Quote]
    
}


type Quote{
    by:ID
    name: String
}

type Token{
    token:String
    firstName:String
    lastName:String
    _id:ID
}

type UserById{
    firstName:String,
    lastName:String,
    _id:ID
}

    type Qute{
        name: String
    }


    type Mutation{
        signupUser(userNew:UserInput!):UserModel
        singinUser(usersignIn:UserSignInInput!):Token
        createQuote(name:String!):String
    }

    input UserInput{
        firstName: String!
        lastName: String!
        email:String!
        password:String!
    }

    input UserSignInInput{
        
        email:String!
        password:String!
    }

`

export default typeDefs