import React from 'react';
import NavBar from '../components/NavBar';
import ClassesSection from '../components/ClassesSection';


const ClassesPage = () => {


    return (
        <div>
            <NavBar />
            <br />
            <div className='container'>
                <ClassesSection />
            </div>
        </div>
    );
};

export default ClassesPage;
