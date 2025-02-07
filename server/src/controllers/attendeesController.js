import { createAttendee, getAttendeesByUserId, getAttendeesByEventId } from "../services/attendeesService.js";

export const attendEvent = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        const existingAttendee = await getAttendeesByUserId(userId);
        if (existingAttendee.some(attendee => attendee.event_id === eventId)) {
            return res.status(400).json({ success: false, message: "Already attending this event" });
        }

        const newAttendee = await createAttendee(userId, eventId);

        const io = req.app.get("socketio");
        io.emit("eventAttended", newAttendee);
        res.status(201).json({ success: true, message: "Attendee registered successfully", data: newAttendee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error registering attendee", error });
    }
};

export const getUserAttendees = async (req, res) => {
    try {
        const userId = req.params.userId;
        const attendees = await getAttendeesByUserId(userId);
        res.status(200).json({ success: true, data: attendees });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching attendees", error });
    }
};

export const getEventAttendees = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const attendees = await getAttendeesByEventId(eventId);
        res.status(200).json({ success: true, data: attendees });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching attendees", error });
    }
};
