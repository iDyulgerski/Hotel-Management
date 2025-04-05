import React, { useEffect, useState } from "react";
import {Button, Card, Modal, Pagination} from "antd";
import "./UserAdminConsole.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {useNavigate} from "react-router-dom";

const UserAdminConsole = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8); // Adjust number of users per page
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
        fetch("https://localhost:7153/api/User/getAllUsers")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users.");
                }
                return response.json();
            })
            .then(data => {
                setUsers(data || []); // Set users from the response
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleResign = async (userId) => {
        try {
            const response = await fetch(`https://localhost:7153/api/User/resign/${userId}`, {
                method: "PUT",
            });

            if (!response.ok) {
                throw new Error("Failed to resign user.");
            }

            setUsers(users.map(user =>
                user.userId === userId ? { ...user, isActive: false, releaseDate: new Date().toISOString() } : user
            ));
        } catch (error) {
            console.error("Error resigning user:", error);
        }
    };

    const handleHireAgain = async (userId) => {
        try {
            const response = await fetch(`https://localhost:7153/api/User/hire-again/${userId}`, {
                method: "PUT",
            });

            if (!response.ok) {
                throw new Error("Failed to rehire user.");
            }

            setUsers(users.map(user =>
                user.userId === userId ? { ...user, isActive: true, releaseDate: null } : user
            ));
        } catch (error) {
            console.error("Error rehiring user:", error);
        }
    };
    const handleAddUser = () =>
    {
        navigate(`/addUser`);
    }
    const handleUpdateUser = (user) => {
        navigate(`/updateUser`, { state: { user } });
    };

    const handleDeleteUser = (userId) => {
        Modal.confirm({
            title: "Are you sure you want to delete this user?",
            content: "This action cannot be undone.",
            onOk: async () => {
                try {
                    const response = await fetch(`https://localhost:7153/api/User/delete-user/${userId}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        throw new Error("Failed to delete user.");
                    }

                    setUsers(users.filter((user) => user.userId !== userId)); // Remove deleted user from state
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            },
        });
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Header />
            <div className="user-admin-container">
                <h1>User Admin Console</h1>
                <Button
                    onClick={() => handleAddUser()}
                    style={{ width: '200px', height: '80px' }}
                >
                    Add User
                </Button>
                <div className="user-list">
                    {currentUsers.map((user) => (
                        <Card key={user.userId} className="user-card">
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Name:</strong> {user.firstName} {user.middleName ? user.middleName + " " : ""} {user.lastName}</p>
                            <p><strong>EGN:</strong> {user.egn}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Hire Date:</strong> {new Date(user.hireDate).toLocaleDateString()}</p>

                            {user.isActive ? (
                                <Button type="primary" danger onClick={() => handleResign(user.userId)}>
                                    Resign
                                </Button>
                            ) : (
                                <>
                                    <p><strong>Release Date:</strong> {new Date(user.releaseDate).toLocaleDateString()}</p>
                                    <Button type="primary" onClick={() => handleHireAgain(user.userId)}>
                                        Hire Again
                                    </Button>
                                </>
                            )}
                            <Button type="default" onClick={() => handleUpdateUser(user)}>
                                Update User
                            </Button>
                            <Button type="danger" onClick={() => handleDeleteUser(user.userId)}>
                                Delete User
                            </Button>
                        </Card>
                    ))}
                </div>
                <Pagination
                    current={currentPage}
                    total={users.length}
                    onChange={handlePageChange}
                    pageSize={usersPerPage}
                    align="center"
                />
            </div>
            <Footer />
        </div>
    );
};

export default UserAdminConsole;
