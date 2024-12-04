import React from 'react';
import NavBar from '../components/NavBar';
import NotificationsSection from '../components/NotificationsSection';


const NotificationsPage = () => {


    return (
        <div>
            <NavBar />
            <br />
            <div className='container'>
                <NotificationsSection />
            </div>
        </div>
    );
};

export default NotificationsPage;
