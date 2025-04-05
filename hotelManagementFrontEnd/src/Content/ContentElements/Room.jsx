import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Assuming you're using Redux for user state
import './Room.css';

function Room({ roomId, roomType, capacity, isAvailable, pricePerAdult, pricePerChild, roomNumber, handleDelete }) {
    const navigate = useNavigate();  // Initialize the navigate function

    // Assuming user data is in Redux state (you can adjust this if you're using context or other methods)
    const user = useSelector((state) => state.user.user); // Access user data from the Redux store
    const role = user?.role;

    // Handle Update Room
    const handleUpdateRoom = () => {
        navigate(`/update-room/${roomId}`, { state: { roomId, roomType, capacity, isAvailable, pricePerAdult, pricePerChild, roomNumber } });
    };

    return (
        <div className="Room">
            <div className="room-details">
                <h3 className="room-type">{roomType}</h3>
                <p className="room-capacity">Capacity: {capacity}</p>
                <p className="room-number">Room Number: {roomNumber}</p>
                <p className="room-availability">
                    Availability: {isAvailable ? "Available" : "Occupied"}
                </p>
                <p className="room-price">Price (Adult): ${pricePerAdult}</p>
                <p className="room-price-child">Price (Child): ${pricePerChild}</p>
            </div>
            {user ? (
                role === 'Admin' && (
                    <div className="room-buttons">
                        <Button
                            type="primary"
                            danger
                            onClick={() => handleDelete(roomId)}
                        >
                            Delete Room
                        </Button>

                        <Button
                            onClick={handleUpdateRoom}  // Button to update room
                        >
                            Update Room
                        </Button>
                    </div>
                )
            ) : null}
        </div>
    );
}

export default Room;

