const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/blog')
const { format, initialUsers, existingId, usersInDb } = require('./test_helper');

beforeAll(async () => {
    await User.remove({});
    await User.insertMany(initialUsers);
})

describe('user creation', () => {
    test('POST api/users can create valid user', async () => {
        const user = {
            username: 'Kalle Käyttäjä 3',
            name: 'Maria Tavis',
            adult: true,
            password: 'IloveDogs'
        }
        const res = await api
            .post('/api/users')
            .send(user)
            .expect(200)

        delete user.password;
        expect(res.body.username).toBe(user.username);
        expect(res.body.name).toBe(user.name);
        expect(res.body.adult).toBe(user.adult);
        users = await usersInDb();
        expect(users.length).toToBe(initialUsers.length+1);
    })

    test('POST api/users returns error if username exists', async () => {
        const user = initialUsers[0];
        const res = await api
            .post('/api/users')
            .send(user)
            .expect(400)

        expect(res.body.error).toBe('username already taken')
    })

    test('POST api/users returns error if password too short', async () => {
        const user = {
            username: 'Kalle Käyttäjä 2',
            name: 'Maria Tavis',
            adult: true,
            password: '123'
        }
        const res = await api
            .post('/api/users')
            .send(user)
            .expect(400)

        expect(res.body.error).toBe('password too short')
        const currentUsers = await usersInDb();
        expect(currentUsers.length).toBe(initialUsers.length)
    })
})

afterAll(() => {
    server.close()
})
