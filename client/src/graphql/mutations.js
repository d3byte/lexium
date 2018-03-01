import gql from 'graphql-tag'

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        token
        user {
            id
            name
            username
            email
            wordsLearnt
            groups {
                id
                name
                tasks {
                    id
                    name
                    words
                    results {
                        id
                        wordsLearnt
                        user {
                            id
                            name
                            wordsLearnt
                        }
                        percentage
                    }
                    deadline
                    createdAt
                }
                superUsers
                createdAt
            }
            avatarUrl
            createdAt
        }
    }
}
`

export const SIGNUP = gql`
mutation signup($username: String!, $name: String!, $email: String!, $password: String!) {
    signup(email: $email, password: $password, name: $name, username: $username) {
        token
        user {
            id
            name
            username
            email
            wordsLearnt
            groups {
                id
                name
                tasks {
                    id
                    name
                    words
                    results {
                        id
                        wordsLearnt
                        user {
                            id
                            name
                            wordsLearnt
                        }
                        percentage
                    }
                    deadline
                    createdAt
                }
                superUsers
                createdAt
            }
            avatarUrl
            createdAt
        }
    }
}
`

export const createGroup = gql`
mutation createGroup($name: String!, $usersIds: [ID!]!, $superUsers: [ID!]!) {
    createGroup(name: $name, usersIds: $usersIds, superUsers: $superUsers) {
         id
        name
        users {
            id
            name
        }
        superUsers
        createdAt
    }
}
`

export const updateGroup = gql`
mutation updateGroup($id: ID!, $input: GroupInput!) {
    updateGroup(id: $id, input: $input) {
        id
        name
        users {
            id
            name
        }
        superUsers
        createdAt
    }
}
`