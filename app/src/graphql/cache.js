import gql from 'graphql-tag'

const USER_CACHE = gql`
query user {
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
`

const TOKEN_CACHE = gql`
query token {
    token
}
`

export {
    USER_CACHE, TOKEN_CACHE
}