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

const updateObjectPosition = async (userId, objectId, position) => {
    const db = getDB();

    const scene = await db.collection("scenes").findOne({ userId });

    if (!scene) {
        throw new Error("Scene not found");
    }

    const updatedObjects = scene.objects.map((object) => {
        if (object.id === objectId) {
            return {
                ...object,
                position
            };
        }

        return object;
    });

    return await db.collection("scenes").updateOne(
        { userId },
        {
            $set: {
                objects: updatedObjects,
                updatedAt: new Date()
            }
        }
    );
};

export const sceneService = {
    addObject,
    getSceneByUser,
    saveScene,
    updateObjectPosition
};  