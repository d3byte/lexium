import gql from 'graphql-tag'

const USER = gql`
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

export {
    USER,
}