import React from "react";
import calendario from "../images/calendario.png"

export default function CalendarSection() {

    return (
        <div className='row container-calendario'>
            <div className='col-lg-12'>
                <h4 className='text-uppercase fonte-calendario'>Calendário</h4>
                <img className='img img-fluid calendario-img' src={calendario} alt="Calendário"></img>
            </div>
        </div>
    );
}
