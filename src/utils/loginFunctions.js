import api from "../api";

const BASE_URL = '/auth/login';

const login = async (loginFields) => {
    try {
        const response = await api.post(BASE_URL, loginFields);
        console.log(response);
        return response;
    } catch (e) {
        console.error("Something went wrong.", e);
    }
};

const loginFunctions = {
    login,
};

export default loginFunctions;
