import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: UserInfo
  }

  extend type Mutation {
    signIn(phonenumber: String!, authcode: String!): LoginResult!
    signinwithtoken(token: String!, tokentype: String!): LoginResult!
    sendauth(phonenumber: String!,authtype:String!): AuthtypeResult!
    fillprofile(username:String!):UserInfo!
  }

  type LoginResult {
    islogin: Boolean!
    msg:String,
    tokening: String,
    loginuserinfo:UserInfo
  }

  type UserInfo{
    _id:String!
    phonenumber:String!
  }

  type AuthtypeResult{
    issuc: Boolean!
    msg:String!
  }
`;