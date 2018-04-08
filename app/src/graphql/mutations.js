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
                    avatarUrl
                }
                tasks {
                    id
                    groupId
                    name
                    words
                    results {
                        id
                        wordsLearnt
                        user {
                            name
                            wordsLearnt
                            avatarUrl
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
                createdAt
            }
            avatarUrl
            createdAt
        }
    }
}
`

const UPDATE_AVATAR = gql`
mutation updateUserAvatar($token: String!, $avatarUrl: String!) {
    updateUserAvatar(token: $token, avatarUrl: $avatarUrl) {
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
                avatarUrl
            }
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

const CREATE_GROUP = gql`
mutation createGroup($name: String!, $usersIds: [ID!]!, $superUsers: [ID!]!) {
    createGroup(name: $name, usersIds: $usersIds, superUsers: $superUsers) {
        id
        name
        tasks {
            id
            groupId
            name
        }
        users {
            id
            name
            avatarUrl
        }
        superUsers
        avatarUrl
        createdAt
    }
}
`

const UPDATE_GROUP = gql`
mutation updateGroup($id: ID!, $input: GroupInput!) {
    updateGroup(id: $id, input: $input) {
        id
        name
        users {
            id
            name
            createdAt
            avatarUrl
        }
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
            deadline
            createdAt
        }
        superUsers
        createdAt
    }
}
`

const CREATE_TASK = gql`
mutation createTask($input: TaskInput!, $words: [WordPairInput!]!, $groupId: ID!, $attempts: Attempts!) {
    createTask(input: $input, words: $words, groupId: $groupId, attempts: $attempts) {
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

const ADD_USERS_TO_GROUP = gql`
mutation addUsersToGroup($token: String!, $id: ID!, $users: [ID!]!) {
    addUsersToGroup(token: $token, id: $id, users: $users) {
        id
        name
        createdAt
    }
}
`

const UPDATE_TASK = gql`
mutation updateTask($id: ID!, $input: TaskInput!) {
    updateTask(id: $id, input: $input) {
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
        deadline
        createdAt
    }
}
`

export {
    LOGIN, SIGN_UP,
    CREATE_GROUP, UPDATE_GROUP,
    CHECK_USERNAME, CHECK_EMAIL,
    UPDATE_AVATAR, CREATE_TASK,
    ADD_USERS_TO_GROUP, UPDATE_TASK,
    
}