import axios from "axios";

export const baseURL = "http://localhost:8000/"

export function getUniversitySpec(type) {
    const path = `${baseURL}universities_spec/${type}`
    return axios.get(path);
}

export function getSpecializationsForUniversity(id) {
    const path = `${baseURL}university/${id}/specializations`
    return axios.get(path);
}