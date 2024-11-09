import React, { useEffect, useState } from 'react';
import classesFunctions from '../utils/classesFunctions';

export default function ClassesSection() {
    const [classes, setClasses] = useState([]);

    const getAllClasses = async () => {
        const { data } = await classesFunctions.getAllClasses();
        setClasses(data);
      };
    
      useEffect(() => {
        getAllClasses();
      }, []);
    return (
        <div>
            <h3>Gerenciamento de Turmas</h3>
            <ul>
                {
                    classes.map((notification) => (
                        <li>
                            <h5>{notification.title}</h5>
                            <p>{notification.content}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}