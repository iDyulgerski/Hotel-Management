import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./MakeAReservationForm.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const MakeAReservationForm = () => {
    const [clients, setClients] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [price, setPrice] = useState(0);
    const room = rooms.find((r) => r.roomId == selectedRoomId);
    const client = clients.find((r) => r.clientId == selectedClientId);
    const navigate = useNavigate();
    const [includesBreakfast, setIncludesBreakfast] = useState(false);
    const [allInclusive, setAllInclusive] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            const res = await fetch("https://localhost:7153/api/Client/getAllClients");
            const data = await res.json();
            setClients(data || []);
        };

        const fetchRooms = async () => {
            const res = await fetch("https://localhost:7153/api/Room/getAllRooms");
            const data = await res.json();
            setRooms(data.values || []);
        };

        fetchClients();
        fetchRooms();
    }, []);

    useEffect(() => {
        if (!checkIn || !checkOut || !selectedRoomId) return;

        if (!room) return;

        const days = Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        );

        const calcPrice =
            days * (adults * room.pricePerAdult + children * room.pricePerChild);

        setPrice(calcPrice);
    }, [checkIn, checkOut, selectedRoomId, adults, children, rooms]);

    const showClientInfoPopup = (client) => {
        if(client!=null)
        {
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
        }
        else
        {
            return 0;
        }
    };

    const showRoomInfoPopup = (room) => {
        console.log(room);
        if(room!=null)
        {
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
        }
        else
        {
            return 0;
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const totalPeople = parseInt(adults) + parseInt(children);
        if (totalPeople > room.capacity) {
            alert(`Total guests (${totalPeople}) exceed room capacity (${room.capacity}).`);
            return;
        }
        const reservationPayload = {
            roomId: parseInt(selectedRoomId),
            createdByClientId: parseInt(selectedClientId),
            checkIn,
            checkOut,
            includesBreakfast,
            allInclusive,
            numberOfAdults: adults,
            numberOfChildren: children,
            totalPrice: parseFloat(price.toFixed(2))
        };
        console.log(reservationPayload);
        try {
            const res = await fetch("https://localhost:7153/api/Reservation/createReservation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationPayload),
            });

            if (res.ok) {
                alert("Reservation created successfully!");
                navigate("/reservationsConsole");
            } else {
                const errorText = await res.text();
                alert("Failed to create reservation:\n" + errorText);
            }
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("An error occurred while creating the reservation.");
        }
    };

    return (
        <div>
        <Header></Header>
        <div className="make-reservation-form">
        <div style={{ padding: "2rem" }}>
            <h2>Make a Reservation</h2>
            <form onSubmit={handleSubmit}>
                <label>Client:</label>
                <select
                    value={selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    required
                >
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                        <option key={client.clientId} value={client.clientId}>
                            {client.firstName} {client.lastName}
                        </option>
                    ))}
                </select>
                <Button onClick={() => showClientInfoPopup(client)}>
                    Show Client Info
                </Button>
                <div
                    onClick={() => navigate("/addClient")}
                    style={{color: "blue", cursor: "pointer", marginBottom: "1rem"}}
                >
                    Client isn’t registered yet?
                </div>

                <label>Room:</label>
                <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    required
                >
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                        <option key={room.roomId} value={room.roomId}>
                            {room.roomNumber} - {room.roomType}
                        </option>
                    ))}
                </select>
                <Button onClick={() => showRoomInfoPopup(room)}>
                    Show Room Info
                </Button>
                <div
                    onClick={() => navigate("/create-room")}
                    style={{color: "blue", cursor: "pointer", marginBottom: "1rem"}}
                >
                    Room doesn’t exist yet?
                </div>

                <label>Check-in:</label>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                />

                <label>Check-out:</label>
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                />

                <label>Adults:</label>
                <input
                    type="number"
                    min="1"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                    required
                />

                <label>Children:</label>
                <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                />

                <p><strong>Total Price:</strong> {price.toFixed(2)} лв</p>
                <div style={{marginTop: "1rem", marginBottom: "1rem"}}>
                    <label>
                        <input
                            type="checkbox"
                            checked={includesBreakfast}
                            onChange={(e) => {
                                setIncludesBreakfast(e.target.checked);
                                if (e.target.checked) setAllInclusive(false);
                            }}
                        />
                        Includes Breakfast
                    </label>
                    <br/>
                    <label>
                        <input
                            type="checkbox"
                            checked={allInclusive}
                            onChange={(e) => {
                                setAllInclusive(e.target.checked);
                                if (e.target.checked) setIncludesBreakfast(false);
                            }}
                        />
                        All-Inclusive
                    </label>
                </div>


                <Button type="primary" htmlType="submit">
                    Confirm Reservation
                </Button>
            </form>
        </div>
        </div>
            <Footer></Footer>
        </div>
    );
};

export default MakeAReservationForm;
