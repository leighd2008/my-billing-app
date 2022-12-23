import React /*{useState, useEffect}*/ from 'react';
// import {loadSavedData, saveDataInStorage} from "../renderer"
// import ClientList from "./ClientList";
import { Link } from "react-router-dom";
// const { ipcRenderer } = require("electron");
// const { HANDLE_FETCH_DATA, HANDLE_SAVE_DATA} = require("../utils/constants");

const Clients = () => {
//   const [val, setVal] = useState([]);
//   const [clientsToTrack, setClients] = useState([]);
  
//   // Grab the user's saved clientsToTrack after the app loads
//   useEffect(() => {
//     loadSavedData();
//   }, []);
  
//   // Listen for handler
//   useEffect(() => {
//     ipcRenderer.on(HANDLE_FETCH_DATA, handleReceivedData)
//     return () => {
//       ipcRenderer.removeListener(HANDLE_FETCH_DATA, handleReceivedData)
//     }
//   });
  
//   const handleReceivedData = (event, data) => {
//     console.log('data received')
//     // setClients([...data.message])
//   }
  
//   // Save a client
//   const addClient = (client) => {
//     console.log("react triggered addClient with", client)
//     saveDataInStorage(client)
//     setVal('')
//   };
  
//   // Listen for handler
//   useEffect(() => {
//     ipcRenderer.on(HANDLE_SAVE_DATA, handleNewClient)
//     return () => {
//       ipcRenderer.removeListener(HANDLE_SAVE_DATA, handleNewClient)
//     }
//   });
  
//   const handleNewClient = (event, data) => {
//     console.log("Renderer received new client", data.message)
//     setClients([...clientsToTrack, data.message])
//   }
  
//   // Manage input field
//   const handleChange = e => {
//     setVal(e.target.value)
//   }
  
//   // Handle submit
//   const handleSubmit = e => {
//     e.preventDefault()
//     addClient(val)
//   }
  
  return (
    <div>
      <h1>Manage client information</h1>
      <div>
        <Link to="/">Go back to home</Link>
        <br />
        <Link to="/invoice">Go to invoice page</Link>
      </div>
      {/* <button type='submit' onClick={handleSubmit}>Add Client</button>
      <input type="text" onChange={handleChange} value={val} />
      {clientsToTrack.length ? (
        <ClientList clientsToTrack={clientsToTrack} />
      ) : (
        <p>Add a client to get started</p>
      )} */}
    </div>
  );
};

export default Clients;