import express from "express";
import userRouter from "./usersRoute.js";
import eventRouter from "./eventsRoute.js";
import attendeeRouter from "./attendeesRoute.js"

let router = express.Router();
router.get("/", (req, res, next) => {
    res.end("Server Working");

});

export const registerRoutes = (app) => {
    console.log("Got Request")
    app.use('/api/auth', userRouter)
    app.use('/api/event', eventRouter)
    app.use('/api/attendee', attendeeRouter)
};

export default registerRoutes;