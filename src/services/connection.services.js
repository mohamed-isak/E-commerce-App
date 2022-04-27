import axios from "axios"
const base_url = 'https://api.zigners.ae' // 'http://13.212.188.7:4000'

//mock API

   export default function callApi(endpoint, method = 'GET', body, authenticated = false) {  
       let headers; 
       if(authenticated) {
            headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : ''
           }
       } else {
        headers = {
            'Content-Type': 'application/json'
        }
       }   
       return axios({
           method,
           url: `${base_url}${endpoint}`,          
           headers,
           data: body
       }).catch(error => {
           console.log(error.toJSON());
           if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            throw error.response.data
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }

          return Promise.reject(error);
       });
}
