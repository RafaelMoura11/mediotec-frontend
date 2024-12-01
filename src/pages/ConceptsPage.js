import React from 'react';
import NavBar from '../components/NavBar';
import ConceptsSection from '../components/ConceptsSection';


const ConceptsPage = () => {


    return (
        <div>
            <NavBar />
            <br />
            <div className='container'>
                <ConceptsSection />
            </div>
        </div>
    );
};

export default ConceptsPage;
