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

const usersFunctions = {
    getAllUsers
}

export default usersFunctions;
