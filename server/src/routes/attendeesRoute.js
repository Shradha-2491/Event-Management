import express from "express";
import { attendEvent, getUserAttendees, getEventAttendees } from "../controllers/attendeesController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const attendeeRouter = express.Router();

attendeeRouter.post("/", authMiddleware, attendEvent);
attendeeRouter.get("/user/:userId", getUserAttendees);
attendeeRouter.get("/event/:eventId", getEventAttendees);

export default attendeeRouter;
