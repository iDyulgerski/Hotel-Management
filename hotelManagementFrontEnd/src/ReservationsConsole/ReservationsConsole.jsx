import React, { useEffect, useState } from "react";
import "./ReservationsConsole.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Button, Input, message} from "antd";
import {useNavigate} from "react-router-dom"; // Ant Design Button and Input

const ReservationsConsole = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // For search input
    const [filteredReservations, setFilteredReservations] = useState([]); // For filtered results
    const navigate= useNavigate();
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch("https://localhost:7153/api/Reservation/getAllReservations");
                const data = await response.json();
                setReservations(data);
                setFilteredReservations(data); // Initially, all reservations are visible
            } catch (error) {
                console.error("Failed to fetch reservations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    // Format date to dd-mm-yy
    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear().toString().slice(-2)}`;
    };

    // Filter reservations based on search term
    const handleSearch = () => {
        if (!searchTerm) {
            setFilteredReservations(reservations); // If the search is empty, show all reservations
        } else {
            const filtered = reservations.filter((res) => {
                const clientFullName = `${res.createdByClient.firstName} ${res.createdByClient.lastName}`.toLowerCase();
                const roomNumber = res.room.roomNumber.toLowerCase();
                const checkInDate = formatDate(res.checkIn).toLowerCase();
                const checkOutDate = formatDate(res.checkOut).toLowerCase();
                const totalPrice = res.totalPrice.toFixed(2).toLowerCase();

                // Check if the search term is found in any of the fields
                return (
                    clientFullName.includes(searchTerm.toLowerCase()) ||
                    roomNumber.includes(searchTerm.toLowerCase()) ||
                    checkInDate.includes(searchTerm.toLowerCase()) ||
                    checkOutDate.includes(searchTerm.toLowerCase()) ||
                    totalPrice.includes(searchTerm.toLowerCase())
                );
            });
            setFilteredReservations(filtered);
        }
    };

    const showClientInfoPopup = (client) => {
        const clientInfo = `
            <h2>Client Info</h2>
            <p><strong>Name:</strong> ${client.firstName} ${client.lastName}</p>
            <p><strong>Email:</strong> ${client.email}</p>
            <p><strong>Phone:</strong> ${client.phone}</p>
            <p><strong>Is Adult:</strong> ${client.isAdult ? "Yes" : "No"}</p>
        `;
        const newWindow = window.open("", "ClientInfo", "width=400,height=300");
        newWindow.document.write(clientInfo);
        newWindow.document.close();
    };

    const showRoomInfoPopup = (room) => {
        const roomInfo = `
            <h2>Room Info</h2>
            <p><strong>Room Number:</strong> ${room.roomNumber}</p>
            <p><strong>Room Type:</strong> ${room.roomType}</p>
            <p><strong>Capacity:</strong> ${room.capacity}</p>
            <p><strong>Price per Adult:</strong> ${room.pricePerAdult} лв</p>
            <p><strong>Price per Child:</strong> ${room.pricePerChild} лв</p>
        `;
        const newWindow = window.open("", "RoomInfo", "width=400,height=300");
        newWindow.document.write(roomInfo);
        newWindow.document.close();
    };

    const handleMakeAReservation = () =>
    {
        navigate(`/makeAReservationForm`);
    }

    const handleDeleteReservation = async (reservationId) => {
        try {
            const response = await fetch(`https://localhost:7153/api/Reservation/deleteReservation/${reservationId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Successfully deleted
                setReservations(reservations.filter(res => res.reservationId !== reservationId));
                setFilteredReservations(filteredReservations.filter(res => res.reservationId !== reservationId));
                message.success("Reservation deleted successfully!");
            } else {
                message.error("Failed to delete the reservation.");
            }
        } catch (error) {
            console.error("Error deleting reservation:", error);
            message.error("An error occurred while deleting the reservation.");
        }
    };
    return (
<div>
    <Header />
    
    <Button className="make-reservation" onClick={handleMakeAReservation}>
        Make a reservation
    </Button>

    <div className="reservations-console-container">
        <h2>All Reservations</h2>

        <div className="search-bar">
            <Input
                placeholder="Search by client name, room number, date, or total price"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
        </div>

        {loading ? (
            <p>Loading reservations...</p>
        ) : (
            <table className="reservations-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client Name</th>
                        <th>Show More (Client)</th>
                        <th>Show More (Room)</th>
                        <th>Room Number</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Breakfast</th>
                        <th>All Inclusive</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map((res) => (
                        <tr key={res.reservationId}>
                            <td>{res.reservationId}</td>
                            <td>{`${res.createdByClient.firstName} ${res.createdByClient.lastName}`}</td>
                            <td>
                                <Button onClick={() => showClientInfoPopup(res.createdByClient)}>
                                    Show More
                                </Button>
                            </td>
                            <td>
                                <Button onClick={() => showRoomInfoPopup(res.room)}>
                                    Show More
                                </Button>
                            </td>
                            <td>{res.room.roomNumber}</td>
                            <td>{formatDate(res.checkIn)}</td>
                            <td>{formatDate(res.checkOut)}</td>
                            <td>{res.includesBreakfast ? "Yes" : "No"}</td>
                            <td>{res.allInclusive ? "Yes" : "No"}</td>
                            <td>{res.numberOfAdults}</td>
                            <td>{res.numberOfChildren}</td>
                            <td>{res.totalPrice.toFixed(2)} лв</td>
                            <td>
                                <Button onClick={() => handleDeleteReservation(res.reservationId)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>

    <Footer />
</div>

    );
};

export default ReservationsConsole;
