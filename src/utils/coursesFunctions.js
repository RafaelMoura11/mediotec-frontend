import api from "../api"

const BASE_URL = '/mediotec/disciplinas';

const getAllCourses = async () => {
    try {
        const courses = api.get(BASE_URL);
        return courses;
    } catch (e) {
        console.log("Something went wrong.")
    }
}

const coursesFunctions = {
    getAllCourses
}

export default coursesFunctions;
