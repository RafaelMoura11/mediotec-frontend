import api from "../api";

const BASE_URL = '/auth/login';

const login = async (loginFields) => {
    const response = await api.post(BASE_URL, loginFields);
    return response;
};

const loginFunctions = {
    login,
};

export default loginFunctions;
