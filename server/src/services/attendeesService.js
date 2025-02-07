import { Attendee, User } from "../models/association.js";

export const createAttendee = async (userId, eventId) => {
    return await Attendee.create({ user_id: userId, event_id: eventId });
};

export const getAttendeesByUserId = async (userId) => {
    return await Attendee.findAll({ where: { user_id: userId } });
};

export const getAttendeesByEventId = async (eventId) => {
    return await Attendee.findAll({
        where: { event_id: eventId }, include: [
            {
                model: User,
                attributes: ["name", "email"]
            },
        ],
    });
};
