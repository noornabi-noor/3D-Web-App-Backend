import { getDB } from "../../db.js";

const addObject = async (userId, object) => {
    const db = getDB();

    const result = await db.collection("scenes").updateOne(
        { userId },
        {
            $push: {
                objects: object
            },
            $set: {
                updatedAt: new Date()
            }
        },
        { upsert: true }
    );

    return result;
};

const getSceneByUser = async (userId) => {
    const db = getDB();
    return await db.collection("scenes").findOne({ userId });
};

const saveScene = async (userId, objects) => {
    const db = getDB();

    return await db.collection("scenes").updateOne(
        { userId },
        {
            $set: {
                userId,
                objects: objects || [],
                updatedAt: new Date()
            }
        },
        { upsert: true }
    );
};

export const sceneService = {
    addObject,
    getSceneByUser,
    saveScene
};