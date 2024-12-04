import React from 'react';
import NavBar from '../components/NavBar';
import UsersSection from '../components/UsersSection';


const UsersPage = () => {


    return (
        <div>
            <NavBar />
            <br />
            <div className='container'>
                <UsersSection />
            </div>
        </div>
    );
};

export default UsersPage;
