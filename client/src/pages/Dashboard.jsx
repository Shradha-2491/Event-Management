import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { Pencil, Trash2, Users, Loader } from "lucide-react";
import { attendEvent, deleteEvent, getEventByUser, getEvents, updateEvent } from "../api/events";
import UpdateEventModal from "../components/UpdateEventModal";
import socket from "../socket";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filters, setFilters] = useState({
        status: "all", category: "all", fromDate: "",
        toDate: ""
    });
    const navigate = useNavigate();
    const fetchUserEvent = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const response = await getEventByUser(Number(storedUser?.user?.id));
            const eventIds = response?.data.map(item => item.event_id);
            setUserEvents(eventIds)
        } catch (error) {
            console.error("Failed to fetch attendees:", error);
        }
    }

    useEffect(() => {
        fetchUserEvent();
    }, [user])

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(storedUser);
        }
        loadData();
        socket.connect();

        socket.on("eventCreated", (newEvent) => {
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        });

        socket.on("eventUpdated", (updatedEvent) => {
            setEvents((prevEvents) =>
                prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
            );
        });

        socket.on("eventDeleted", (eventId) => {
            setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
        });

        socket.on("eventAttended", (updatedAttendee) => {
            fetchUserEvent();
        });

        return () => {
            socket.off("eventCreated");
            socket.off("eventUpdated");
            socket.off("eventDeleted");
            socket.off("eventAttended");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        console.log("Filters changed:", filters);
        loadData();
    }, [filters]);

    const loadData = () => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const data = await getEvents(filters);
                setEvents(data.events);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    };

    if (loading) {
        return (
            <div className="loader-container">
                <Loader className="loading-spinner" size={50} />
                <p>Loading event details...</p>
            </div>
        );
    }

    const handleDelete = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteEvent(eventId, user?.token);
                setEvents(events.filter(event => event.id !== eventId));
            } catch (error) {
                console.error("Failed to delete event:", error);
            }
        }
    };
    const openUpdateModal = (event) => {
        setSelectedEvent(event);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateEvent = async (updatedEvent) => {
        try {
            await updateEvent(updatedEvent.id, updatedEvent, user?.token);
            loadData();
            setIsUpdateModalOpen(false);
        } catch (error) {
            console.error("Failed to update event:", error);
        }
    };

    const handleAttend = async (eventId) => {
        try {
            await attendEvent(eventId, user?.user?.id, user?.token);
            loadData();
        } catch (error) {
            console.error("Failed to attend event:", error);
        }
    };

    const handleCardClick = (eventId) => {
        navigate(`/event/${eventId}`);
    };
    const handleGuest = () => {
        navigate(`/login`);
    };

    return (
        <div className="dashboard-container">
            <div className="filter-container">
                <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                    <option value="all">All Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                </select>

                <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                    <option value="all">All Categories</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Networking">Networking</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Business">Business</option>
                </select>

                <div className="date-filters">
                    <label htmlFor="from-date">From:</label>
                    <input
                        type="date"
                        id="from-date"
                        value={filters.fromDate || ""}
                        className="date-input"
                        onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                    />

                    <label htmlFor="to-date">To:</label>
                    <input
                        type="date"
                        id="to-date"
                        value={filters.toDate || ""}
                        className="date-input"
                        onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                    />
                </div>

            </div>

            <div className="events-grid">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="event-card" >

                            <h3 className="event-title" title={event.title}>{event.title}</h3>
                            <p className="event-description">
                                {event.description}
                            </p>
                            <p className="event-category"><strong>Category:</strong> {event.category}</p>
                            <p className="event-date"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                            <p className={`event-status ${event.status?.toLowerCase()}`}>
                                <strong>Status:</strong> {event.status || "Pending"}
                            </p>


                            <div className="event-actions">
                                <div className="event-actions">
                                    {user?.user?.id ? <button
                                        className="attend-button"
                                        onClick={() => handleAttend(event.id)}
                                        disabled={userEvents.includes(event.id)}
                                    >
                                        {userEvents.includes(event.id) ? "Attending" : "Attend"}
                                    </button> : <button
                                        className="attend-button"
                                        onClick={() => handleGuest()}
                                    >
                                        Attend
                                    </button>}
                                    <button
                                        className="attend-button"
                                        onClick={() => handleCardClick(event.id)}
                                    >
                                        Details
                                    </button>
                                </div>
                                <div className="event-actions">
                                    {event.status !== "Completed" && user?.user?.id === event.created_by_id && (
                                        <>
                                            <Pencil className="edit-icon" size={20} onClick={() => openUpdateModal(event)} />
                                            <Trash2 className="delete-icon" size={20} onClick={() => handleDelete(event.id)} />
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className="no-events">No events available.</p>
                )}
            </div>

            <UpdateEventModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                eventData={selectedEvent}
                onUpdate={handleUpdateEvent}
            />
        </div>
    );
};

export default Dashboard;
