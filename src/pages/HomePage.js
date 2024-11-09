import React from 'react';
import NavBar from '../components/NavBar';
import NotificationsSection from '../components/NotificationsSection';
import HomeSection from '../components/HomeSection';


const HomePage = () => {
    

    return (
        <div>
            <NavBar />
            <br />
            <HomeSection />
            <NotificationsSection />
        </div>
    );
};

export default HomePage;
