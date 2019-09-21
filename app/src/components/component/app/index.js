import gql from 'graphql-tag'

export const GetLocale = gql`
    query getLocale {
        locale @client
    }
`

export const GetMaintabIndex = gql`
    query getMaintabIndex {
        maintabIndex @client
    }
`

export const GetStatusbar = gql`
    query getstatusbar {
        statusbar @client
    }
`