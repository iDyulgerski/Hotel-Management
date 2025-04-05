import React, { useState, useEffect } from 'react';
import './ClientConsole.css';
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const ClientConsole = () => {
    const [clients, setClients] = useState([]); // State to hold clients data
    const [loading, setLoading] = useState(true); // State to handle loading status
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching clients data from the actual API endpoint
        fetch('https://localhost:7153/api/Client/getAllClients')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                return response.json();
            })
            .then(data => {
                setClients(data); // Set the fetched data to state
                setLoading(false); // Stop loading
            })
            .catch(error => {
                setError(error.message); // Set error message
                setLoading(false); // Stop loading
            });
    }, []); // Empty dependency array ensures this runs only once after component mounts

    // Handle delete client by ID
    const handleDeleteClient = (clientId) => {
        // Making DELETE request to the backend API
        fetch(`https://localhost:7153/api/Client/deleteClient/${clientId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting client');
                }
                // If successful, remove the client from the state
                setClients(clients.filter(client => client.clientId !== clientId));
            })
            .catch(error => {
                setError(error.message); // Handle error
            });
    };

    const handleAddClient = () =>
    {
        navigate(`/addClient`);
    }

    const handleUpdateClient = (client) =>
    {
        navigate(`/updateClient`, { state: client });
    }

    if (loading) {
        return <p className="loading">Loading clients...</p>;
    }

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

    return (
        <div>
        <Header></Header>
            <Button
                onClick={() => handleAddClient()}
                style={{ width: '200px', height: '80px' }}
            >
                Add Client
            </Button>

            <div className="client-console-container">
            <h1>Client Console</h1>

            {clients.length === 0 ? (
                <p className="no-clients-message">No clients available.</p>
            ) : (
                <ul className="client-list">
                    {clients.map((client) => (
                        <li key={client.clientId} className="client-item">
                            <div className="client-details">
                                <p><strong>{client.firstName} {client.lastName}</strong></p>
                                <p>Email: {client.email}</p>
                                <p>Phone: {client.phone}</p>
                                <p>{client.isAdult ? 'Adult' : 'Child'}</p>
                            </div>
                            <div className="client-buttons">
                                <Button className="update-btn" onClick={() => handleUpdateClient(client)} >Update Client</Button>
                                <Button className="delete-btn" onClick={() => handleDeleteClient(client.clientId)}>
                                    Delete Client
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
            <Footer></Footer>
        </div>
    );
};

export default ClientConsole;
