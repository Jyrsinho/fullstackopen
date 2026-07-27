const testPassword =  'testPassword'

const initialUsers = [
    {
        name: 'John Doe',
        username: 'johnnybones',
        password: testPassword
    },
    {
        name: 'Jane Doe',
        username: 'janejane',
        password: testPassword
    },
    {
        name: 'Kevin Programmer',
        username: 'bigkev',
        password: testPassword
    }
]

const blogCreatorUser = {
    name: 'Tim Testuser',
    username: 'testuser',
    password: testPassword
}

const testUserToAdd = {
    name: 'Jane Doe',
    username: 'janejane',
    password: testPassword
}

module.exports = {
    initialUsers,
    blogCreatorUser,
    testUserToAdd
}