import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home.jsx";
import LoginForm from "./LoginForm/LoginForm.jsx";
import CreateRoomForm from "./CreateRoomForm/CreateRoomForm.jsx";
import ClientConsole from "./ClientConsole/ClientConsole.jsx";
import CreateClientForm from "./CreateClientForm/CreateClientForm.jsx";
import UserAdminConsole from "./UserAdminConsole/UserAdminConsole.jsx";
import CreateUserForm from "./CreateUserForm/CreateUserForm.jsx";
import ReservationsConsole from "./ReservationsConsole/ReservationsConsole.jsx";
import MakeAReservationForm from "./MakeAReservationForm/MakeAReservationForm.jsx";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUser } from "./userSlice.js";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check if user data is stored in localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            // If user data exists, parse it and dispatch it to Redux
            dispatch(setUser(JSON.parse(savedUser)));
        }
    }, [dispatch]);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" exact element = {<LoginForm />} />
              <Route path="/home" exact element = {<Home />} />
              <Route path="/create-room" element={<CreateRoomForm />} />
              <Route path="/update-room/:id" element={<CreateRoomForm />} />
              <Route path="/clientConsole" element={<ClientConsole />} />
              <Route path="/addClient" element={<CreateClientForm />} />
              <Route path="/updateClient" element={<CreateClientForm />} />
              <Route path="/userAdminConsole" element={<UserAdminConsole/>} />
              <Route path="/addUser" element={<CreateUserForm/>} />
              <Route path="/updateUser" element={<CreateUserForm/>} />
              <Route path="/reservationsConsole" element={<ReservationsConsole/>} />
              <Route path="/makeAReservationForm" element={<MakeAReservationForm/>} />

          </Routes>
      </BrowserRouter>
  )
}

export default App
