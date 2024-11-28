import api from "../api";

const BASE_URL = '/mediotec/usuarios';

const getAllUsers = async (token) => {
    try {
        const response = await api.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message); // Exibe o erro para ajudar no debug
    }
};

const getAllTeachers = async (token) => {
    try {
        const response = await api.get(`${BASE_URL}/role/TEACHER`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Retorna os dados
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message); // Exibe o erro para ajudar no debug
    }
};

const getUserById = async (userId, token) => {
    try {
        const response = await api.get(`${BASE_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message);
    }
};

const getUserByName = async (userName, token) => {
    try {
        const response = await api.get(`${BASE_URL}/name/${userName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message);
    }
};

const getUserByEmail = async (email, token) => {
    try {
        const response = await api.get(`${BASE_URL}/email/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message);
    }
};

const getAllUsersOfClass = async (classId, token) => {
    try {
        const response = await api.get(`${BASE_URL}/class/${classId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message);
    }
};

const getAllUsersOfCourse = async (courseId, token) => {
    try {
        const response = await api.get(`${BASE_URL}/course/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message);
    }
};

const updateUserById = async (userId, userData, token) => {
    try {
        const response = await api.put(`${BASE_URL}/update/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message);
    }
};

const deleteUserById = async (userId, token) => {
    try {
        const response = await api.delete(`${BASE_URL}/delete/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log("Something went wrong.");
        console.log(e.message);
    }
};

const usersFunctions = {
    getAllUsers,
    getAllTeachers,
    getUserById,
    getUserByName,
    getUserByEmail,
    getAllUsersOfClass,
    getAllUsersOfCourse,
    updateUserById,
    deleteUserById,
};

export default usersFunctions;
