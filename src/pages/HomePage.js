import React from 'react';
import NavBar from '../components/NavBar';
import NotificationsSection from '../components/NotificationsSection';
import NotificationsCard from '../components/NotificationsCard'
import HomeSection from '../components/HomeSection';
import CalendarSection from '../components/CalendarSection';


const HomePage = () => {


    return (
        <div>
            <NavBar />
            <br />
            <div className="container">
                <div className="row custom-row icones-calendario">
                    <div className="quadrados">
                        <HomeSection />
                    </div>
                    <div className="container-calendario">
                        <CalendarSection />
                    </div>
                </div>

                <br />
                <NotificationsCard />
            </div>
        </div>
    );
};

export default HomePage;
