import React, { useEffect, useState } from 'react';
import coursesFunctions from '../utils/coursesFunctions';

export default function CoursesSection() {
    const [courses, setCourses] = useState([]);

    const getAllCourses = async () => {
        const { data } = await coursesFunctions.getAllCourses();
        setCourses(data);
      };
    
      useEffect(() => {
        getAllCourses();
      }, []);
    return (
        <div>
            <h3>Gerenciamento de Disciplinas</h3>
            <ul>
                {
                    courses.map((course) => (
                        <li>
                            <h5>{course.courseName}</h5>
                            <p>{course.workload}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}