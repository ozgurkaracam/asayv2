import axios from "axios";
import JwtService from "@/core/services/JwtService";
import Swal from "sweetalert2";

const requestt = axios.create({
  baseURL: process.env.baseURL,
  headers: {
    Authorization: `Bearer ${JwtService.getToken()}`,
    Accept: "application/json",
  },
});

requestt.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response?.data?.message) {
      Swal.fire({
        text: response.data.message,
        icon: "success",
      });
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default requestt;
