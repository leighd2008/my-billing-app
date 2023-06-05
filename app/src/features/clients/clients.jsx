import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


import { ClientsList } from './ClientsList';

const Clients = () => {
  const navigate = useNavigate()
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="">
              <p className="title">Manage client information</p>
              <div>
                <ClientsList />
              </div>
              <button type='submit' onClick={() => {navigate(`/addNewClient`)}}>Add Client</button>
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