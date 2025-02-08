import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../services/eventsService.js";
import { Op } from "sequelize";

export const createEventHandler = async (req, res) => {
    try {
        const event = await createEvent(req.body);

        const io = req.app.get("socketio");
        io.emit("eventCreated", event);
        res.status(201).json({ success: true, event });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating event", error });
    }
};

export const getEventsHandler = async (req, res) => {
    try {
        const { status, category, fromDate, toDate } = req.query;
        let filters = {};

        if (status && status !== "all") filters.status = status;
        if (category && category !== "all") filters.category = category;
        if (fromDate) filters.date = { [Op.gte]: new Date(fromDate) };
        if (toDate) {
            filters.date = {
                ...(filters.date || {}),
                [Op.lte]: new Date(toDate),
            };
        }
        const events = await getAllEvents(filters);
        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching events", error });
    }
};

export const getEventByIdHandler = async (req, res) => {
    try {
        const event = await getEventById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });
        res.status(200).json({ success: true, event });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching event", error });
    }
};

export const updateEventHandler = async (req, res) => {
    try {
        console.log("User", req.user);

        const response = await updateEvent(req.params.id, req.body);

        const io = req.app.get("socketio");
        io.emit("eventUpdated", response);
        res.status(200).json({ success: true, message: "Event updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating event", error });
    }
};

export const deleteEventHandler = async (req, res) => {
    try {
        await deleteEvent(req.params.id);

        const io = req.app.get("socketio");
        io.emit("eventDeleted", req.params.id);

        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting event", error });
    }
};
