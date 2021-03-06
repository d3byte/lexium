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
                isPersonal
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
                isPersonal
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
            isPersonal
            superUsers
            createdAt
        }
        avatarUrl
        createdAt
    }
}
`

const CREATE_GROUP = gql`
mutation createGroup($name: String!, $superUsers: [ID!]!) {
    createGroup(name: $name, superUsers: $superUsers) {
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
        isPersonal
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
        isPersonal
        superUsers
        createdAt
    }
}
`

const CREATE_TASK = gql`
mutation createTask($input: TaskInput!, $groupId: ID!, $attempts: Attempts!) {
    createTask(input: $input, groupId: $groupId, attempts: $attempts) {
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

const UPDATE_GROUP_AVATAR = gql`
mutation updateGroupAvatar($token: String!, $id: ID!, $avatarUrl: String!) {
    updateGroupAvatar(token: $token, id: $id, avatarUrl: $avatarUrl) {
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
        isPersonal
        superUsers
        createdAt
    }
}
`

const SET_RESULT = gql`
mutation setResult($id: ID!, $res: ResultInput!, $userId: ID!) {
    setResult(id: $id, res: $res, userId: $userId) {
        id
        wordsLearnt
        percentage
        user {
            id
            name
            username
            avatarUrl
        }
        createdAt
    }
}
`

const UPDATE_RESULT = gql`
mutation updateResult($id: ID!, $resultId: ID!, $res: ResultInput!, $userId: ID!) {
    updateResult(id: $id, resultId: $resultId, res: $res, userId: $userId) {
        id
        wordsLearnt
        percentage
        user {
            id
            name
            username
            avatarUrl
        }
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
    UPDATE_GROUP_AVATAR, SET_RESULT,
    UPDATE_RESULT,
}