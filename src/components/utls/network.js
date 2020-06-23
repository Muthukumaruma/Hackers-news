
import axios from "axios";

const NETWORK = axios.create({
    baseURL: 'http://hn.algolia.com/api/',
    withCredentials: false,
  })

  // Add a request interceptor
  NETWORK.interceptors.request.use(

    function(config) {
    //add any api headers or config
      return config;
    },
  
    function(error) {
      return Promise.reject(error);
    }
  
  );

  NETWORK.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      try {
        //handile API errors 
  
      } catch (error) {
  
      }
  
  
      return Promise.reject(error);
    }
  );
  
  export default NETWORK;