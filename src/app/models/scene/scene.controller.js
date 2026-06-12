import { sceneService } from "./scene.service.js";
import { v4 as uuidv4 } from "uuid";

const addObject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { type, position, rotation, scale } = req.body;

        const object = {
            id: uuidv4(),
            type,
            position: position || { x: 0, y: 0, z: 0 },
            rotation: rotation || { x: 0, y: 0, z: 0 },
            scale: scale || { x: 1, y: 1, z: 1 }
        };

        await sceneService.addObject(userId, object);

        res.status(200).json({
            status: "Success",
            message: "Object added successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

const loadScene = async (req, res) => {
    try {
        const userId = req.user.id;

        const scene = await sceneService.getSceneByUser(userId);

        if (!scene) {
            return res.status(200).json({
                status: "Success",
                message: "No scene found",
                data: { objects: [] }
            });
        }

        res.status(200).json({
            status: "Success",
            data: scene.objects
        });

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

const saveScene = async (req, res) => {
    try {
        const userId = req.user.id;
        const { objects } = req.body;

        if (!Array.isArray(objects)) {
            return res.status(400).json({
                status: "Error",
                message: "Objects must be an array"
            });
        }

        await sceneService.saveScene(userId, objects);

        res.status(200).json({
            status: "Success",
            message: "Scene saved successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

const updateObjectPosition = async (req, res) => {
    try {
        const userId = req.user.id;

        const { objectId, position } = req.body;

        await sceneService.updateObjectPosition(
            userId,
            objectId,
            position
        );

        res.status(200).json({
            status: "Success",
            message: "Object position updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

export const sceneController = {
    addObject,
    loadScene,
    saveScene,
    updateObjectPosition
};