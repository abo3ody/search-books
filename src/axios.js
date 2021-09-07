import axios from "axios";
const api_key = "AIzaSyAjxmopvXQlb5Y_S6a98DZT-sDITqdikJc";

const instance = axios.create({
   baseURL: "https://www.googleapis.com/books/v1/volumes",
});

export default instance;
