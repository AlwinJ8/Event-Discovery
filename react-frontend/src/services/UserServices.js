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
    addEvent(userID, name, location, date, description, inviteOnly, capacity) {
        const body = {"name": name, "location": location, "date": date, "description": description, "inviteOnly": inviteOnly, "capacity": capacity}
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

    editEvent(userID, eventID, name, location, date, description, inviteOnly, capacity) {
        const headers = {"CurrentID": userID}
        const body = {"name": name, "location": location, "date": date, "description": description, "inviteOnly": inviteOnly, "capacity": capacity} 
        alert(inviteOnly)
        return axios.put(USER_API_URL + "/events/" + eventID, body, {headers: headers}) 
    }

    rsvpEvent(userID, eventID, status) {
        const headers =  {"CurrentID": userID}
        const body = {"status": status}
        return axios.post(USER_API_URL + "/rsvp/" + eventID, body, {headers: headers})
    }

    getPeople(userID, eventID, status) {
        const headers =  {"CurrentID": userID}
        return axios.get(USER_API_URL + "/attendees/" + eventID + "?status=" + status, {headers: headers})
    }

    editRsvp(userID, eventID, status) {
        const headers = {"CurrentID": userID}
        const body = {"status": status}
        return axios.put(USER_API_URL + "/rsvp/" + eventID, body, {headers: headers})
    }

    checkRsvp(userID, eventID) {
        const headers = {"CurrentID": userID}
        return axios.get(USER_API_URL + "/rsvp/check?eventid=" + eventID, {headers: headers})
    }

    removeRsvp(userID, eventID, removedID) {
        const headers = {"CurrentID": userID}
        return axios.delete(USER_API_URL + "/rsvp/" + eventID + "/" + removedID, {headers: headers})
    }
}

export default new UserServices()