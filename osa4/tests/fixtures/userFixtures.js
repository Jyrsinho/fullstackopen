const initialUsers = [
    {
        name: 'John Doe',
        username: 'johnnybones',
        passwordHash: '123salainen'
    },
    {
        name: 'Jane Doe',
        username: 'janejane',
        passwordHash: 'tosisalainen'
    },
    {
        name: 'Kevin Programmer',
        username: 'bigkev',
        passwordHash: 'salasana123'
    }
]

const blogCreatorUser = {
    name: 'Tim Testuser',
    username: 'testuser',
    password: '123abc321'
}

const testUserToAdd = {
    name: 'Jane Doe',
    username: 'janejane',
    password: 'salasana1111'
}

module.exports = {
    initialUsers,
    blogCreatorUser,
    testUserToAdd
}