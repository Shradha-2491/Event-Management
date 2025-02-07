import express from "express";
import { createEventHandler, getEventsHandler, getEventByIdHandler, updateEventHandler, deleteEventHandler } from "../controllers/eventsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const eventRouter = express.Router();

eventRouter.post("/", authMiddleware, createEventHandler);
eventRouter.get("/", getEventsHandler);
eventRouter.get("/:id", getEventByIdHandler);
eventRouter.put("/:id", authMiddleware, updateEventHandler);
eventRouter.delete("/:id", authMiddleware, deleteEventHandler);

export default eventRouter;
