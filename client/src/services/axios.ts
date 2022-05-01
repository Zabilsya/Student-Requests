import axios from 'axios';
import browserHistory from '../routes/history'

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

apiClient.interceptors.request.use(config => {
    if (config.headers && localStorage.getItem('jwtToken')) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken')
    }
    return config
})

apiClient.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        browserHistory.push('/login')
        return Promise.reject()
    }

    if (error.response.status >= 500) {
        window.alert('Произошла ошибка загрузки данных. Пожалуйста, обновите страницу или попробуйте позже!')
        return Promise.reject()
    }

    return Promise.reject(error)
})

export default apiClient