test

AuthenticationError is not defined

http://localhost:4000/graphql

{
    signIn("rwieruch","rwieruch")
}

  mutation($login: String!, $password: String!) {
    signIn("rwieruch": $login, "rwieruch": $password) {
      token
    }
  }