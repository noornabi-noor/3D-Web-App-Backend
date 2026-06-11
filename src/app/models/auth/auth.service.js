import { getDB } from "../../db.js";

const createUser = async (userData) => {
    const db = getDB();
    const result = await db.collection("users").insertOne(userData);
    return result;
};

const findUser = async (email) => {
    const db = getDB();
    const user = await db.collection("users").findOne({email});
    return user;
}

export const authService = {
    createUser,
    findUser
};