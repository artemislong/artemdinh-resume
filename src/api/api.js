import axios from 'axios'

export const baseUrl = "http://localhost:3001/api/";

const timeout = 30000;
export const getGuide = async (id) => {
    let apiUrl = baseUrl + "guides/" + id;
    return axios.get(apiUrl, { timeout: timeout });
};

export const getGuideEditor = async (id) => {
    let apiUrl = baseUrl + "guides/" + id;
    console.log("getGuideEditor content", id)
    return axios.get(apiUrl, { timeout: timeout }) //30s posting
};

export const createGuide = async (content) => {
    let apiUrl = baseUrl + "guides";
    console.log("createGuide content", content)
    return axios.post(apiUrl, content, { timeout: timeout }) //30s posting
};

export const updateGuide = async (content) => {
    let apiUrl = baseUrl + "guides/" + content._id;
    console.log("updateGuide content", content)
    return axios.put(apiUrl, content, { timeout: timeout }) //30s posting
};

export const login = async credentials => {
    let apiUrl = baseUrl + "login";
    return axios.post(apiUrl, credentials, { timeout: timeout })
}

export const getAllGuides = async () => {
    let apiUrl = baseUrl + "guides";
    return axios.get(apiUrl, { timeout: timeout });
};

export const getProfile = async (id) => {
    let apiUrl = baseUrl + "profile/" + id;
    return axios.get(apiUrl, { timeout: timeout });
};

export const updateProfile = async (content) => {
    console.log("updating profile", content)
    let apiUrl = baseUrl + "profile/" + content._id;
    return axios.put(apiUrl, content, { timeout: timeout });
};




