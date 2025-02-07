import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/Modal.css";

Modal.setAppElement("#root");

const CreateEventModal = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");

    const categories = ["Conference", "Workshop", "Meetup", "Webinar", "Networking", "Technology", "Health", "Business"];

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        onCreate({ title, description, date, category, location, created_by: user?.user?.name, created_by_id: user?.user?.id, created_at: new Date() });
        setTitle("");
        setDescription("");
        setLocation("")
        setDate("")
        setCategory("");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
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
                <button type="submit" className="submit-button">Create Event</button>
                <button type="button" className="close-button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default CreateEventModal;
