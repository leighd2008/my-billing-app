import React from 'react';
import { useSelector } from 'react-redux';

import { ClientsList } from './ClientsList';

import TrustInGod from "Images/Trust_In_God.jpg";

const Clients = () => {
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="container">
          <section className="hero is-danger">
            <div className="hero-body">
              <img src={TrustInGod} alt="Trust in God" />
              <p className="title">Manage client information</p>
              <div>
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