
import { Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import Room from "./ContentElements/Room.jsx";
import "./Content.css";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Content = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(12);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user); // Access user data from the Redux store
    const role = user?.role;

    useEffect(() => {
        fetch('https://localhost:7153/api/Room/getAllRooms')
            .then(response => response.json())
            .then(data => {
                setRooms(data.values || []);
            })
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (roomId) => {
        try {
            const response = await fetch(`https://localhost:7153/api/Room/delete-room/${roomId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            alert("Room deleted successfully!");
            setRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== roomId));
        } catch (error) {
            console.error("Error deleting room:", error);
            alert(`Error: ${error.message}`);
        }
    };



    const handleAddRoom = () => {
        navigate("/create-room");
    };

    return (
        <div>
            <div className="ContentPlusNav">
                {user ? (
                    role === 'Admin' && (
                        <>
                            <Button onClick={handleAddRoom} style={{ maxWidth: '150px', width: '100%' }}>Add Room</Button>
                        </>
                    )
                ) : null}

                <div className="Content">
                    {currentRooms.map(room => (
                        <div key={room.roomId} className="room-container">
                            <Room
                                roomId={room.roomId}
                                roomType={room.roomType}
                                capacity={room.capacity}
                                isAvailable={room.isAvailable}
                                pricePerAdult={room.pricePerAdult}
                                pricePerChild={room.pricePerChild}
                                roomNumber={room.roomNumber}
                                handleDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                defaultCurrent={1}
                total={rooms.length}
                onChange={handlePageChange}
                pageSize={roomsPerPage}
                align="center"
            />
        </div>
    );
}

export default Content;

