import api from "../api";

const BASE_URL = '/mediotec/relacionamento';

const createRelationship = async (relationship) => {
    try {
        const response = await api.post(BASE_URL, relationship);
        return response.data;
    } catch (e) {
        console.error("Erro ao criar relacionamento:", e);
    }
};

const getAllRelationships = async () => {
    try {
        const response = await api.get(BASE_URL);
        return response.data;
    } catch (e) {
        console.error("Erro ao obter todos os relacionamentos:", e);
    }
};

const getRelationshipById = async (id) => {
    try {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (e) {
        console.error(`Erro ao obter o relacionamento com ID ${id}:`, e);
    }
};

const updateRelationship = async (id, updatedRelationship) => {
    try {
        const response = await api.put(`${BASE_URL}/${id}`, updatedRelationship);
        return response.data;
    } catch (e) {
        console.error(`Erro ao atualizar o relacionamento com ID ${id}:`, e);
    }
};

const deleteRelationship = async (id) => {
    try {
        const response = await api.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (e) {
        console.error(`Erro ao deletar o relacionamento com ID ${id}:`, e);
    }
};

const relationshipFunctions = {
    createRelationship,
    getAllRelationships,
    getRelationshipById,
    updateRelationship,
    deleteRelationship,
};

export default relationshipFunctions;
