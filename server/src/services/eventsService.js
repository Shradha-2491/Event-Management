import Event from "../models/Event.js";

export const createEvent = async (eventData) => {
    return await Event.create(eventData);
};

export const getAllEvents = async (filters) => {
    return await Event.findAll({ where: filters, order: [['date', 'DESC']], });
};

export const getEventById = async (id) => {
    return await Event.findByPk(id);
};

export const updateEvent = async (id, eventData) => {
    const updatedRows = await Event.update(eventData, { where: { id } });

    if (updatedRows === 0) return null;


    const updatedEvent = await Event.findByPk(id);
    return updatedEvent;
};

export const deleteEvent = async (id) => {
    return await Event.destroy({ where: { id } });
};
