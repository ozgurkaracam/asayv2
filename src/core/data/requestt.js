import axios from "axios";
import JwtService from "@/core/services/JwtService";

export default axios.create({
  baseURL: process.env.baseURL,
  headers: {
    Authorization: `Bearer ${JwtService.getToken()}`,
    Accept: "application/json",
  },
});
