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
`

const GROUP = gql`
query group($token: String!, $id: ID!) {
    group(token: $token, id: $id) {
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
        avatarUrl
        createdAt
    }
}
`

export {
    USER, GROUP
}