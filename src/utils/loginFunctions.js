import api from "../api";

const LOGIN_BASE_URL = '/auth/login';
const REGISTER_BASE_URL = '/auth/register';

const login = async (loginFields) => {
    const response = await api.post(LOGIN_BASE_URL, loginFields);
    return response;
};

const register = async (registerFields) => {
    const response = await api.post(REGISTER_BASE_URL, registerFields);
    return response;
}

const loginFunctions = {
    login,
    register
};

export default loginFunctions;
