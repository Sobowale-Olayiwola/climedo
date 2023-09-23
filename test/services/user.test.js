import userService from "../../src/services/user";
import UserRepo from "../../src/repository/user";

jest.mock("bcrypt", () => ({
    genSalt: jest.fn().mockReturnValue(8),
    hash: jest.fn().mockReturnValue("tdyfhyhfdh356784949i39fhjfhyr7hf"),
    compare: jest.fn().mockReturnValue(true),
}));

describe("Test UserService", () => {
    beforeEach(() => {
        UserRepo.createUser = jest.fn(({ data }) => {
            if (!Object.keys(data).length) {
                return { failed: true, error: "Just a random error" };
            }
            return {
                _id: "62d31ad3f51c80c444423f83",
                firstName: "Olayiwola",
                lastName: "Sobowale",
                email: "golang@gmail.com",
                role: "regular",
            };
        });
        UserRepo.getUserByEmail = jest.fn(({ email }) => {
            if (email !== "golang@gmail.com") {
                return null;
            }
            return {
                _id: "62d31ad3f51c80c444423f83",
                firstName: "Olayiwola",
                lastName: "Sobowale",
                email: "golang@gmail.com",
                role: "regular",
            };
        });
        UserRepo.getUserById = jest.fn(({ id }) => {
            if (id !== "62d31ad3f51c80c444423f83") {
                return null;
            }
            return {
                _id: "62d31ad3f51c80c444423f83",
                firstName: "Olayiwola",
                lastName: "Sobowale",
                email: "golang@gmail.com",
                role: "regular",
            };
        });
        UserRepo.updateUserById = jest.fn(({ id, data }) => {
            if (id !== "62d31ad3f51c80c444423f83") {
                return null;
            }
            return {
                _id: "62d31ad3f51c80c444423f83",
                firstName: "Olayiwola",
                lastName: "Sobowale",
                email: "golang@gmail.com",
                role: "regular",
            };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Create User", () => {
        it("Returns validation error", async () => {
            const data = {
                firstName: "Olayiwola",
                lastName: "Sobowale",
                role: "regular",
                password: "Password@007",
            };
            const result = await userService.createUser({ data });
            expect(result.error).toEqual("email is required");
            expect(result.status).toEqual(412);
        });
        it("Returns weak password error", async () => {
            const data = {
                firstName: "Olayiwola",
                lastName: "Sobowale",
                role: "regular",
                email: "fake@gmail.com",
                password: "password",
            };
            const result = await userService.createUser({ data });
            expect(result.error).toEqual("password is too weak");
            expect(result.status).toEqual(412);
        });
        it("Returns error for existing email", async () => {
            const data = {
                firstName: "Olayiwola",
                lastName: "Sobowale",
                role: "regular",
                email: "golang@gmail.com",
                password: "Password@0072",
            };
            const result = await userService.createUser({ data });
            expect(result.error).toEqual("User exists with email.");
            expect(result.status).toEqual(400);
        });
        it("Successfully creates a user", async () => {
            const data = {
                firstName: "Olayiwola",
                lastName: "Sobowale",
                role: "regular",
                email: "new@gmail.com",
                password: "Password@007",
            };
            const result = await userService.createUser({ data });
            expect(result.error).toEqual(null);
            expect(result.status).toEqual(201);
        });
    });
    describe("Login User", () => {
        it("Returns validation error", async () => {
            const data = {
                password: "Password@007",
            };
            const result = await userService.loginUser({ data });
            expect(result.error).toBe("email is required");
            expect(result.status).toEqual(412);
        });
        it("Returns error for non-existing user", async () => {
            const data = {
                email: "donotexist@gmail.com",
                password: "Password@007",
            };
            const result = await userService.loginUser({ data });
            expect(result.error).toBe("Kindly register. User not found");
            expect(result.status).toEqual(404);
        });
        it("Successfully logs a user", async () => {
            const data = {
                email: "golang@gmail.com",
                password: "Password@007",
            };
            const result = await userService.loginUser({ data });
            expect(result.error).toEqual(null);
            expect(result.message).toBe("successfully logged in");
            expect(result.status).toEqual(200);
        });
    });
    describe("Get User by Id", () => {
        it("Returns error for non-existing user id", async () => {
            const id = "abcdefghytidodkd";
            const result = await userService.getUserById({ id });
            expect(result.error).toEqual("Kindly register. User not found");
        });
        it("Successfully return existing user by id", async () => {
            const id = "62d31ad3f51c80c444423f83";
            const result = await userService.getUserById({ id });
            expect(result.message).toEqual("user found");
            expect(result.status).toEqual(200);
        });
    });
    describe("Update User by Id", () => {
        it("Returns validation error", async () => {
            const id = "62d31ad3f51c80c444423f83";
            const data = {
                firstName: "Olayiwola",
                lastName: "Sobowale",
                role: "regular",
                password: "Password@007",
                fakeField: "",
            };
            const result = await userService.updateUserById({ id, data });
            expect(result.error).toBe("fakeField is not allowed");
            expect(result.status).toEqual(412);
        });
        it("Returns weak password validation error", async () => {
            const id = "62d31ad3f51c80c444423f83";
            const data = {
                firstName: "Olayiwola",
                lastName: "Sobowale",
                role: "regular",
                password: "password",
            };
            const result = await userService.updateUserById({ id, data });
            expect(result.error).toBe("password is too weak");
            expect(result.status).toEqual(412);
        });
        it("Returns error for non-existing user id", async () => {
            const data = {
                firstName: "Olayiwola",
                lastName: "Sobowale",
                role: "regular",
                password: "Password@007",
            };
            const id = "abcdefghytidodkd";
            const result = await userService.updateUserById({ id, data });
            expect(result.error).toBe("User update failed");
            expect(result.status).toEqual(400);
        });
        it("Succesfully updates existing user by id", async () => {
            const data = {
                firstName: "Olayiwola",
                lastName: "Sobowale",
                role: "regular",
                password: "Password@007",
            };
            const id = "62d31ad3f51c80c444423f83";
            const result = await userService.updateUserById({ id, data });
            expect(result.error).toEqual(null);
            expect(result.message).toBe("User update succesful");
            expect(result.status).toEqual(200);
        });
    });
});
