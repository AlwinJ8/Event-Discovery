import axios from 'axios';

const USER_API_URL = "http://localhost:8080/api";

class UserServices {

    validateUser(userID) {
        return axios.get(USER_API_URL + "/validate?userID=" + userID)
    }


}

export default new UserServices()