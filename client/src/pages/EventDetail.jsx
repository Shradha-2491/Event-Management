import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById, getUserByEvent } from "../api/events";
import "../styles/EventDetail.css"; // Import the updated CSS
import { Loader, Users } from "lucide-react";
import { io } from "socket.io-client";

const EventDetail = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [attendeeCount, setAttendeeCount] = useState(0);
    const [attendee, setAttendee] = useState([]);
    const [loading, setLoading] = useState(true);
    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

    const fetchEventDetails = async () => {
        try {
            const eventData = await getEventById(eventId);
            setEvent(eventData.event);

            // Fetch number of attendees
            const attendeesData = await getUserByEvent(eventId);
            console.log(attendeesData)
            setAttendeeCount(attendeesData.data.length);
            setAttendee(attendeesData.data)
        } catch (error) {
            console.error("Error fetching event details:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        socket.connect();
        socket.on("eventAttended", (updatedAttendee) => {
            fetchEventDetails();
        });

        return () => {
            socket.off("eventAttended");
            socket.disconnect();
        };
    }, [])

    useEffect(() => {
        fetchEventDetails();
    }, [eventId]);

    if (loading) {
        return (
            <div className="loader-container">
                <Loader className="loading-spinner" size={50} />
                <p>Loading event details...</p>
            </div>
        );
    }

    if (!event) {
        return <p className="error-message">Event not found!</p>;
    }

    return (
        <div className="event-detail-wrapper">
            <div className="event-detail-card">
                <div className="event-title-container"><h2 className="event-title">{event.title}</h2></div>
                <div className="attendeesection">
                    <Users className="attendee-icon" size={20} />
                    <p><strong>Attendees:</strong> {attendeeCount}</p>
                </div>
                <div className="eventinfo">
                    <p className="eventcategory"><strong>Category:</strong> {event.category}</p>
                    <p className="eventdate"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                </div>
                <p className="description">{event.description}</p>
                <div className="attendee-list">
                    <h3>Attendees:</h3>
                    <ul>
                        {attendeeCount > 0 ? (
                            attendee.map((attendee) => (
                                <li key={attendee.id} className="attendee-item">
                                    {attendee?.User?.name}
                                </li>
                            ))
                        ) : (
                            <p>No attendees yet.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
