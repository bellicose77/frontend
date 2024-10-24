import Axios from "axios";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const _axios = Axios.create({
  baseURL: "",
  headers: {},
});
_axios.interceptors.request.use((config) => {
  // Your logic to set the authorization token
//   if (UserService.isLoggedIn
//     ()
//   ) {  // Your condition here
//     const cb = () => {
//       config.headers.Authorization = `Bearer ${UserService.getToken()}`;
//       return Promise.resolve(config);  // Resolve with the updated config
//     };
//     return cb();  // Return the updated config after setting the Authorization header
//   }
  return config;  // Always return config at the end
},
(error) => {
  // Handle errors, like refreshing tokens on 401 Unauthorized
  if (error.response && error.response.status === 401) {
    // Handle token expiration or re-authentication
  }
  return Promise.reject(error); // Return the error
});

const getAxiosClient = () => _axios;

const mulRequestAxios = (requests) => {
  return Axios.all(requests);
};

const HttpService = {
  HttpMethods,
  getAxiosClient,
  mulRequestAxios,
};

export default HttpService;
