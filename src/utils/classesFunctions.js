import api from "../api"

const BASE_URL = '/mediotec/turmas';

const getAllClasses = async () => {
    try {
        const classes = api.get(BASE_URL);
        return classes;
    } catch (e) {
        console.log("Something went wrong.")
    }
}

const classesFunctions = {
    getAllClasses
}

export default classesFunctions;
