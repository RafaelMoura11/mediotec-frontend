import React from "react";
import calendario from "../images/calendario.png"

export default function CalendarSection() {

    return (
        <div className='row container-calendario'>
            <div className='col-lg-12'>
                <img className='img-fluid calendario-img' src={calendario} alt="Calendário"></img>
            </div>
        </div>
    );
}
