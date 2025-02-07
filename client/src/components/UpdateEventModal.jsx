import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../styles/Modal.css";

Modal.setAppElement("#root");

const UpdateEventModal = ({ isOpen, onClose, eventData, onUpdate }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");

    const categories = ["Conference", "Workshop", "Meetup", "Webinar", "Networking", "Technology", "Health", "Business"];

    useEffect(() => {
        if (eventData) {
            setTitle(eventData.title);
            setDescription(eventData.description);
            setDate(eventData.date);
            setCategory(eventData.category);
            setLocation(eventData.location);
            setStatus(eventData.status || "Upcoming");
        }
    }, [eventData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        onUpdate({
            ...eventData,
            title,
            description,
            date,
            category,
            location,
            status
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <h2>Update Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <div className="select-container">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <button type="submit" className="submit-button">Update Event</button>
                <button type="button" className="close-button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default UpdateEventModal;
