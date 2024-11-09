import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ClassesPage from './pages/ClassesPage';
import UsersPage from './pages/UsersPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/disciplinas" element={<CoursesPage />} />
                <Route path="/turmas" element={<ClassesPage />} />
                <Route path="/usuarios" element={<UsersPage />} />
                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
