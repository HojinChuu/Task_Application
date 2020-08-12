import axios from 'axios';

const DOMAIN = 'http://localhost/restapi'
const UNAUTHORIZED = 401

const serverRequest = (method, url, data, headers) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
        headers
    })
    .then(response => response.data)
    .catch(err => {
        const {status} = err.response
        if (status === UNAUTHORIZED){
            console.log('401 ERR')
        }
    })
}

export const auth = {
    register(register_info) {
        return serverRequest('post', '/users', register_info.data, register_info.headers)
    },
    login(login_info) {
        return serverRequest('post', '/sessions', login_info)
    }
}