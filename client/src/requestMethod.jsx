import axios from "axios"


const BASE_URL = "http://localhost:5000/api"
let TOKEN;
try {
    const persistRoot = localStorage.getItem('persist:root');
    if (persistRoot) {
      const persistRootParsed = JSON.parse(persistRoot);
      if (persistRootParsed.user) {
        const user = JSON.parse(persistRootParsed.user);
        if (user.currentUser && user.currentUser.token) {
          TOKEN = user.currentUser.token;
        }
      }
    }
  } catch (error) {
    console.error('Error parsing token from localStorage', error);
  }
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token || []

console.log(TOKEN)

export const publicRequest = axios.create({
    baseURL : BASE_URL
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    // header: {token:`Bearer ${TOKEN}`}
})