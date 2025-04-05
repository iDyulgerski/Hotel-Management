import { useEffect, useState } from "react";
import "./CreateUserForm.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const CreateUserForm = () => {
    const location = useLocation();
    const userFromState = location.state?.user || null;
    const navigate=useNavigate();

    // User state initialization with data from userFromState
    const [user, setUser] = useState({
        username: userFromState?.username || "",
        firstName: userFromState?.firstName || "",
        middleName: userFromState?.middleName || "",
        lastName: userFromState?.lastName || "",
        egn: userFromState?.egn || "",
        phone: userFromState?.phone || "",
        email: userFromState?.email || "",
        password: userFromState?.password || "", // Adding password field
        hireDate: userFromState?.hireDate ? new Date(userFromState.hireDate).toISOString().split('T')[0] : "",
        role: userFromState?.role || "User",
        isActive: userFromState?.isActive || true,
    });

    // Roles for user selection
    const roles = ["Admin", "User"];


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = userFromState ? "PUT" : "POST";
        const url = userFromState
            ? `https://localhost:7153/api/User/update-user/${userFromState.userId}`
            : "https://localhost:7153/api/User/create-user";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 409) {
                    alert(errorData.message); // Handle specific error like duplicate email, etc.
                } else {
                    throw new Error("Failed to submit user.");
                }
            } else {
                alert(`User ${userFromState ? "updated" : "created"} successfully!`);
                navigate(`/userAdminConsole`)
            }
        } catch (error) {
            console.error("Error submitting user:", error);
        }
    };
    return (
        <div>
            <Header />
            <div className="user-form-container">
                <h2>{userFromState ? "Update User" : "Create User"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="middleName"
                        placeholder="Middle Name"
                        value={user.middleName}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="egn"
                        placeholder="EGN"
                        value={user.egn}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={user.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="hireDate">Hire Date</label>
                    <input
                        type="date"
                        name="hireDate"
                        placeholder="Hire Date"
                        value={user.hireDate}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="role">Role</label>
                    <select name="role" value={user.role} onChange={handleChange} required>
                        {roles.map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>

                    <button type="submit">{userFromState ? "Update" : "Create"} User</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreateUserForm;
