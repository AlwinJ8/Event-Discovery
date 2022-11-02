import axios from 'axios';

const USER_API_URL = "http://localhost:8080/api";

class UserServices {
    validateUser(userID) {
        return axios.get(USER_API_URL + "/validate?userID=" + userID)
    }
    addUser(userID, name, type) {
        const body = {"name": name, "type": type}
        const headers = {"CurrentID": userID};
        axios.post(USER_API_URL + "/users", body, {headers: headers})
    }
    addEvent(userID, name, location, date, description) {
        const body = {"name": name, "location": location, "date": date, "description": description}
        const headers = {"CurrentID": userID};
        return axios.post(USER_API_URL + "/events", body, {headers: headers})
    }
    showEvents(userID) {
        const headers = {"CurrentID": userID}
        return axios.get(USER_API_URL + "/events", {headers: headers})
    }
    removeEvent(userID, eventID) {
        const headers = {"CurrentID": userID}
        return axios.delete(USER_API_URL + "/events/" + eventID, {headers: headers})
    }

    editEvent(userID, eventID, name, location, date, description) {
        const headers = {"CurrentID": userID}
        const body = {"name": name, "location": location, "date": date, "description": description}
        return axios.put(USER_API_URL + "/events/" + eventID, body, {headers: headers}) 
    }
}

export default new UserServices()