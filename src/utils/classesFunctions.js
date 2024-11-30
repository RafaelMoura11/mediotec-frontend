import api from "../api";

const BASE_URL = "/mediotec/turmas";

// Buscar todas as turmas
const getAllClasses = async () => {
  try {
    const response = await api.get(BASE_URL);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while fetching all classes.");
  }
};

// Criar uma nova turma
const createNewClass = async (newClass) => {
  try {
    const response = await api.post(BASE_URL, newClass);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while creating a new class.");
  }
};

// Buscar turma pelo ID
const getClassById = async (classId) => {
  try {
    const response = await api.get(`${BASE_URL}/id/${classId}`);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while fetching the class by ID.");
  }
};

// Buscar turma pelo nome
const getClassByName = async (className) => {
  try {
    const response = await api.get(`${BASE_URL}/className/${className}`);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while fetching the class by name.");
  }
};

// Buscar turmas por ano
const getClassesByYear = async (year) => {
  try {
    const response = await api.get(`${BASE_URL}/year/${year}`);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while fetching classes by year.");
  }
};

// Buscar todas as disciplinas de uma turma
const getAllCoursesOfClassId = async (classId) => {
  try {
    const response = await api.get(`${BASE_URL}/classCourse/${classId}`);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while fetching courses of the class.");
  }
};

// Buscar todas as turmas de um usuário
const getAllClassesOfUserId = async (userId) => {
  try {
    const response = await api.get(`${BASE_URL}/classUser/${userId}`);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while fetching classes of the user.");
  }
};

// Buscar turmas sem disciplinas cadastradas
const getClassesWithoutCourses = async () => {
  try {
    const response = await api.get(`${BASE_URL}/classwithoutCourse`);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while fetching classes without courses.");
  }
};

// Atualizar turma pelo ID
const updateClass = async (classId, updatedClassData) => {
  try {
    const response = await api.put(`${BASE_URL}/update/${classId}`, updatedClassData);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while updating the class.");
  }
};

// Deletar turma pelo ID
const deleteClass = async (classId) => {
  try {
    const response = await api.delete(`${BASE_URL}/delete/${classId}`);
    return response.data;
  } catch (e) {
    console.error("Something went wrong while deleting the class.");
  }
};

const classFunctions = {
  getAllClasses,
  createNewClass,
  getClassById,
  getClassByName,
  getClassesByYear,
  getAllCoursesOfClassId,
  getAllClassesOfUserId,
  getClassesWithoutCourses,
  updateClass,
  deleteClass,
};

export default classFunctions;
