import axios from "axios";


// Set config defaults when create the instance 
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

//after defalts after instance has been created
//

//Add a request interceptor
instance.interceptors.request.use(function (config) {
    //do some thing before request this sent 
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
    return Promise.reject(error);
});

export default instance;