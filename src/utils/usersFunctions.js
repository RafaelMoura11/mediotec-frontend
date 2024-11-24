import api from "../api"

const BASE_URL = '/mediotec/usuarios';

const getAllUsers = async () => {
    try {
        const users = api.get(BASE_URL);
        return users;
    } catch (e) {
        console.log("Something went wrong.")
    }
}

const getAllTeachers = async (token) => {
    try {
        const response = await api.get(`${BASE_URL}/role/TEACHER`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // Retorna os dados
    } catch (e) {
        console.log("Something went wrong.");
        console.log(token); // Exibe o erro para ajudar no debug
    }
}

const usersFunctions = {
    getAllUsers,
    getAllTeachers
}

export default usersFunctions;
