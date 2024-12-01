import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ClassesPage from './pages/ClassesPage';
import UsersPage from './pages/UsersPage';
import ConceptsPage from './pages/ConceptsPage'; // Nova página
import NotificationsPage from './pages/NotificationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/disciplinas" element={<CoursesPage />} />
                <Route path="/turmas" element={<ClassesPage />} />
                <Route path="/usuarios" element={<UsersPage />} />
                <Route path="/conceitos/:studentId" element={<ConceptsPage />} />
                <Route path="/notificacoes" element={<NotificationsPage />} />
                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
