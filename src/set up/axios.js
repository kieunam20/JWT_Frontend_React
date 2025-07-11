import axios from "axios";
import { toast } from "react-toastify";


// Set config defaults when create the instance 
const instance = axios.create({
    baseURL: 'http://localhost:8080'
    //   baseURL: process.evn.REACT_APP_BACKEND_URL  //use when deploy
});

instance.defaults.withCredentials = true;
//after defalts after instance has been created


//Add a request interceptor
instance.interceptors.request.use(function (config) {
    //do some thing before request this sent 
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},function (error){
//Do something with request error
    return Promise.reject(error);
}); 

//Add a response interceptor 
instance.interceptors.response.use( function (response) {
    //Do something with response data
    return response.data;
}, function (error){
//Do something with request error

const status = error && error.response && error.response.status || 500;
switch(status){
        //ahthentication(token related issues)
    case 401: {
        if(window.location.pathname !== '/' && window.location.pathname !== '/login'
            && window.location.pathname !== '/register' 
         ){
             toast.error(`Authorized the user. Please login...`);
        }
       
          return error.response.data;
    }
    //forbidden (permission related issues)
    case 403 : {
        toast.error(`You don't permission to access this resource...`);
         return Promise.reject(error);
    }
    //bad request
    case 400 : {
         return Promise.reject(error);
    }

    //not found
     case 404 : {
         return Promise.reject(error);
    }
    //conflict
     case 409 : {
         return Promise.reject(error);
    }
    //unprocessable
     case 422 : {
         return Promise.reject(error);
    }
    //generic api error (server related ) unexpected
     default : {
         return Promise.reject(error);
    }

}

});

export default instance;