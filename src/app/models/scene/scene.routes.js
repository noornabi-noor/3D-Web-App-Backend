import express from "express";
import { sceneController } from "./scene.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-object", verifyToken, sceneController.addObject);
router.get("/load", verifyToken, sceneController.loadScene);
router.post("/save", verifyToken, sceneController.saveScene);
router.post("/update-object-position", verifyToken, sceneController.updateObjectPosition);

export const sceneRoutes = router;