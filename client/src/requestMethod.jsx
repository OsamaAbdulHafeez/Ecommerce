import axios from "axios"


const BASE_URL = "http://localhost:5000/api"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOiI2NjNiMTI5ZmIyZTZlNzY2MWU3ODRkZjYiLCJpYXQiOjE3MTU3MTM5MTcsImV4cCI6MTcxNTgwMDMxN30.59fi8oxR6mgkww8Dsgn19MyhOR8L-qL-5Ro9ETH08UA"

export const publicRequest = axios.create({
    baseURL : BASE_URL
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    header: {token:`Bearer ${TOKEN}`}
})