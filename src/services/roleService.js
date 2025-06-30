import axios from "../set up/axios";

const createRoles = (roles) =>{
        return axios.post('/api/v1/role/create' , [...roles])
}

export {createRoles};
