import gql from 'graphql-tag'

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        token
        error
        user {
            id
            name
            username
            email
            wordsLearnt
            groups {
                id
                name
                users {
                    id
                    name
                    createdAt
                }
                tasks {
                    id
                    name
                    words
                    results {
                        id
                        wordsLearnt
                        user {
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

const SIGN_UP = gql`
mutation signup($username: String!, $name: String!, $email: String!, $password: String!) {
    signup(email: $email, password: $password, name: $name, username: $username) {
        token
        error
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
                users {
                    id
                    name
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

const CREATE_GROUP = gql`
mutation createGroup($name: String!, $usersIds: [ID!]!, $superUsers: [ID!]!) {
    createGroup(name: $name, usersIds: $usersIds, superUsers: $superUsers) {
        id
        name
        tasks {
            id
            name
        }
        users {
            id
            name
        }
        superUsers
        createdAt
    }
}
`

const UPDATE_GROUP = gql`
mutation updateGroup($id: ID!, $input: GroupInput!) {
    updateGroup(id: $id, input: $input) {
        id
        name
        tasks {
            id
            name
        }
        users {
            id
            name
        }
        superUsers
        createdAt
    }
}
`

const CHECK_USERNAME = gql`
mutation checkUsername($username: String!) {
    checkUsername(username: $username) {
        valid
        error
    }
}
`

const CHECK_EMAIL = gql`
mutation checkEmail($email: String!) {
    checkEmail(email: $email) {
        valid
        error
    }
}
`

export {
    LOGIN, SIGN_UP,
    CREATE_GROUP, UPDATE_GROUP,
    CHECK_USERNAME, CHECK_EMAIL
}