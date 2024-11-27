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

const createNewCourse = async (newCourse) => {
    try {
        const response = api.post(BASE_URL, newCourse);
        return response;
    } catch (e) {
        console.log("Something went wrong.")
    }
}


const deleteCourse = async (courseId) => {
    try {
        const response = await api.delete(`${BASE_URL}/coursedelete/${courseId}`);
        return response;
    } catch (e) {
        console.log("Something went wrong while deleting.");
    }
};


const updateCourse = async (courseId, updatedCourseData) => {
    try {
        const response = await api.put(`${BASE_URL}/courseupdate/${courseId}`, updatedCourseData);
        return response;
    } catch (e) {
        console.log("Something went wrong while updating.");
    }
};

const coursesFunctions = {
    getAllCourses,
    createNewCourse,
    deleteCourse,
    updateCourse
};

export default coursesFunctions;
