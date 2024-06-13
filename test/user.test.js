const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('User API', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('John Doe');
        expect(res.body.email).toBe('john@example.com');
    });

    it('should fetch all users', async () => {
        const users = [
            { name: 'John Doe', email: 'john@example.com', password: 'password123' },
            { name: 'Jane Doe', email: 'jane@example.com', password: 'password456' },
        ];
        await User.insertMany(users);

        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
        expect(res.body[0].name).toBe('John Doe');
        expect(res.body[1].name).toBe('Jane Doe');
    });

    it('should update an existing user', async () => {
        const user = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
        await user.save();

        const res = await request(app)
            .put(`/api/users/${user._id}`)
            .send({
                name: 'John Smith',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('John Smith');
    });

    it('should delete an existing user', async () => {
        const user = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
        await user.save();

        const res = await request(app).delete(`/api/users/${user._id}`);
        expect(res.statusCode).toEqual(204);

        const userInDb = await User.findById(user._id);
        expect(userInDb).toBeNull();
    });

    it('should return 404 if user not found for update', async () => {
        const invalidId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .put(`/api/users/${invalidId}`)
            .send({
                name: 'John Smith',
            });
        expect(res.statusCode).toEqual(404);
    });

    it('should return 404 if user not found for delete', async () => {
        const invalidId = new mongoose.Types.ObjectId();
        const res = await request(app).delete(`/api/users/${invalidId}`);
        expect(res.statusCode).toEqual(404);
    });
});
