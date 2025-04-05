import React, { useEffect, useState } from "react";
import "./CreateClientForm.css";
import { useLocation, useNavigate } from "react-router-dom"; // To navigate between routes
import { Button, Input, Checkbox } from "antd";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const CreateClientForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const clientFromState = location.state || null; // if there's no state, it's creating a new client
    // Client state initialization
    const [client, setClient] = useState({
        firstName: clientFromState?.firstName || "",
        lastName: clientFromState?.lastName || "",
        phone: clientFromState?.phone || "",
        email: clientFromState?.email || "",
        isAdult: clientFromState?.isAdult || false,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    // Handle checkbox change for isAdult
    const handleCheckboxChange = (e) => {
        setClient((prevClient) => ({
            ...prevClient,
            isAdult: e.target.checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = clientFromState ? "PUT" : "POST"; // PUT for updating and POST for creating
        const url = clientFromState
            ? `https://localhost:7153/api/Client/updateClient/${clientFromState.clientId}`
            : "https://localhost:7153/api/Client/createClient";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(client),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 409) {
                    alert(errorData.message); // Show error message if client already exists
                } else {
                    throw new Error("Failed to submit client.");
                }
            } else {
                alert(`Client ${clientFromState ? "updated" : "created"} successfully!`);
                navigate("/clientConsole"); // Redirect to client list after success
            }
        } catch (error) {
            console.error("Error submitting client:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div> <Header></Header>
        <div className="create-client-form">
            <h2>{clientFromState ? "Update Client" : "Create Client"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <Input
                        type="text"
                        name="firstName"
                        value={client.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <Input
                        type="text"
                        name="lastName"
                        value={client.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone:</label>
                    <Input
                        type="text"
                        name="phone"
                        value={client.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <Input
                        type="email"
                        name="email"
                        value={client.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Adult:</label>
                    <Checkbox
                        checked={client.isAdult}
                        onChange={handleCheckboxChange}
                    />
                </div>

                <Button type="primary" htmlType="submit">
                    {clientFromState ? "Update" : "Create"} Client
                </Button>
            </form>
        </div>
            <Footer></Footer>
        </div>
    );
};

export default CreateClientForm;
