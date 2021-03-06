import gql from 'graphql-tag'

const USER = gql`
query user($token: String!) {
    user(token: $token) {
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
                groupId
                name
                words
                results {
                    id
                    wordsLearnt
                    user {
                        id
                        name
                        wordsLearnt
                        avatarUrl
                    }
                    percentage
                }
                attempts
                deadline
                createdAt
            }
            users {
                id
                name
                avatarUrl
            }
            isPersonal
            avatarUrl
            superUsers
            createdAt
        }
        avatarUrl
        createdAt
    }
}
`

const GROUP = gql`
query group($token: String!, $id: ID!) {
    group(token: $token, id: $id) {
        error
        group {
            id
            name
            tasks {
                id
                groupId
                name
                words
                results {
                    id
                    wordsLearnt
                    user {
                        id
                        name
                        wordsLearnt
                        avatarUrl
                    }
                    percentage
                }
                attempts
                deadline
                createdAt
            }
            users {
                id
                name
                createdAt
                avatarUrl
            }
            superUsers
            isPersonal
            avatarUrl
            createdAt
        }
    }
}
`

const SUITABLE_USERS = gql`
query suitableUsers($token: String!, $query: String!, $groupId: ID!) {
    suitableUsers(token: $token, query: $query, groupId: $groupId) {
        id
        name
        username
        avatarUrl
    }
}
`

export {
    USER, GROUP,
    SUITABLE_USERS, 
}