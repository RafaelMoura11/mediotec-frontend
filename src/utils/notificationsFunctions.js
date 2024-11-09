import api from "../api"

const BASE_URL = '/mediotec/notificacoes';

const getAllNotifications = async () => {
    try {
        const notifications = api.get(BASE_URL);
        return notifications;
    } catch (e) {
        console.log("Something went wrong.")
    }
}

const notificationsFunctions = {
    getAllNotifications
}

export default notificationsFunctions;
