import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form"

import { fetchClients } from '../../redux/components/Clients/clients.api';
import TrustInGod from "Images/Trust_In_God.jpg";


import { Link } from "react-router-dom";

const Clients = () => {
  
  useEffect(() => {
    fetchClients().then(clients => {
      debugger
    });
  }, [])
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="container">
          <section className="hero is-danger">
            <div className="hero-body">
              <p className="title">Manage client information</p>
              <div>
                <Link to="/">Go back to home</Link>
                <br />
                <Link to="/invoice">Go to invoice page</Link>
              </div>
              <img src={TrustInGod} alt="Trust in God" />
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