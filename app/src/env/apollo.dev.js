import gql from "graphql-tag"

export const typeDefs = gql`
    extend type User {
        _id: ID!
        email: String!
        password: String!
        name: String!
        token: String!
        loginSuccess: Boolean!
    }

    extend type Goods {
        _id: ID!
        name: String!
        desc: String!
        parameter: String!
        pics: [String]!
        category: [GoodsCategory]!
        reviews: [review]!
    }

    extend type Category {
        _id: ID!
        name: String!
        price: Float!
        discount: Float!
    }

    extend type Reviews {
        _id: ID!
        author: User!
        content: String!
        pics: [String]!
    }

    # extend type Query {
    #     goods: [Goods]!
    # }

    extend type Query {
        isLoggedIn: Boolean!
    }

    extend type Mutation {
        signIn(email: String!, password: String!): User
    }
  
`;

export const resolvers = {
    Mutation: {
        signIn: (parent, { email, password }) => ({
            email,
            password,
            loginSuccess: true,
            token: `${email}`,
            __typename: 'userLogin'
        })
    },
    Query: {
        // goods: (_, args, { cache }) => {},
        // isLoggedIn: (_, args, { cache }) => { console.log('isLoggedIn!')}
    },
};

export const initState = {
    locale: 'zh-cn',
    maintabIndex: 0,
    statusbar: 22,
    userLogin: {
        loginSuccess: false,
        __typename: 'userLogin'
    },
    Goods: [{
        _id: 1,
        name: 'mate 30 pro',
        desc: '华为',
        parameter: 'markdown',
        pics: [
            'https://img.alicdn.com/imgextra/i1/1800399917/O1CN01w6x3Fz2N82LRqSmBC_!!1800399917.jpg', 
        ],
        __typename: 'Goods'
    }],
    Category: [{
        _id: 1,
        name: 'mate20',
        price: 3400,
        discount: 3200,
        __typename: 'Category'
    }],
    Reviews: [{
        _id: 1,
        author: '3@qq.com',
        content: 'very good',
        pics: [
            'https://img.alicdn.com/bao/uploaded/i4/O1CN01SFIUCI1Ub4aKEeOCJ_!!0-rate.jpg_40x40.jpg'
        ],
        __typename: 'Reviews'
    }]
}




