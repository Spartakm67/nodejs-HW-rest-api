/*
Unit tests for the login controller if the response is successful:
1.The response should have a status code of 200.
2.The response should include a token.
3.The response should include a user object with two fields: "email" and "subscription", both of type String.
 */

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { DB_HOST_TEST, PORT } = process.env;
const { User } = require("../../models/user");

describe("test register rout", () => {
    let server = null;
    beforeAll(async () => {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST);
    });

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    });

    afterEach(async () => { 
        await User.deleteMany({});
    });

    test("test register with correct data", async () => {
        const registerData = {
            name: "Dan Boss",
            email: "danboss@gmail.com",
            password: "123456"
        };

        const {statusCode, body} = await request(app).post("/api/auth/register").send(registerData);
        expect(statusCode).toBe(201);
        // expect(body.user.name).toBe(registerData.name);
        // expect(body.user.email).toBe(registerData.email);

        const user = await User.findOne({email: registerData.email, name: registerData.name});
        expect(user.email).toBe(registerData.email);
        expect(user.name).toBe(registerData.name);
    });
});