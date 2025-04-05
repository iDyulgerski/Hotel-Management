import { useEffect, useState } from "react";
import "./CreateRoomForm.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useLocation } from "react-router-dom";

const CreateRoomForm = () => {
    const location = useLocation();
    const roomFromState = location.state || null;

    // Room state
    const [room, setRoom] = useState({
        roomType: roomFromState?.roomType || "",
        capacity: roomFromState?.capacity || "",
        pricePerAdult: roomFromState?.pricePerAdult || "",
        pricePerChild: roomFromState?.pricePerChild || "",
        roomNumber: roomFromState?.roomNumber || "",
        isAvailable: roomFromState?.isAvailable || true,
    });

    // Room Types
    const roomTypes = ["Deluxe", "Family Suite", "Single", "Triple", "Double", "Penthouse", "Standard", "Luxury Suite", "Budget", "Business Class"];

    const handleChange = (e) => {
        setRoom({ ...room, [e.target.name]: e.target.value });
    };

    const handleAvailabilityChange = () => {
        setRoom(prevRoom => ({ ...prevRoom, isAvailable: !prevRoom.isAvailable }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = roomFromState ? "PUT" : "POST";
        const url = roomFromState
            ? `https://localhost:7153/api/Room/update-room/${roomFromState.roomId}`
            : "https://localhost:7153/api/Room/create-room";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(room),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 409) {
                    alert(errorData.message); // Show error message from backend if room number is taken
                } else {
                    throw new Error("Failed to submit room.");
                }
            } else {
                alert(`Room ${roomFromState ? "updated" : "added"} successfully!`);
            }
        } catch (error) {
            console.error("Error submitting room:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="room-form-container">
                <h2>{roomFromState ? "Update Room" : "Create Room"}</h2>
                <form onSubmit={handleSubmit}>
                    <select name="roomType" value={room.roomType} onChange={handleChange} required>
                        <option value="">Select Room Type</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="capacity"
                        placeholder="Capacity"
                        value={room.capacity}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="pricePerAdult"
                        placeholder="Price Per Adult"
                        value={room.pricePerAdult}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="pricePerChild"
                        placeholder="Price Per Child"
                        value={room.pricePerChild}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="roomNumber"
                        placeholder="Room Number"
                        value={room.roomNumber}
                        onChange={handleChange}
                        required
                    />

                    <div className="availability-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={room.isAvailable}
                                onChange={handleAvailabilityChange}
                            />
                            Available
                        </label>
                    </div>

                    <button type="submit">{roomFromState ? "Update" : "Create"} Room</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreateRoomForm;
