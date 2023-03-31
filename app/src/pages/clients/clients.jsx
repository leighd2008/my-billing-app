import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"

// import { fetchClients } from '../../redux/components/Clients/clients.api';
import ClientsList from '../../../features/clients/ClientsList';

import TrustInGod from "Images/Trust_In_God.jpg";


import { Link } from "react-router-dom";

const Clients = () => {
  const clients = useSelector(state => state.clients)
  
  // useEffect(() => {
  //   fetchClients().then(clients => {
  //   });
  // }, [])
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="container">
          <section className="hero is-danger">
            <div className="hero-body">
              <img src={TrustInGod} alt="Trust in God" />
              <p className="title">Manage client information</p>
              <div>
                {clients.map((client, i) => (
                  <h3 key={i}>{client.name}</h3>
                ))}
                <ClientsList />
              </div>
              <button type='submit' onClick={() => {}}>Add Client</button>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Clients;
// HOW TO USE FIREBASE V 9
// https://travis.media/how-to-use-firebase-with-react/