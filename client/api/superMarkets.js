import axios from 'axios'

export function getNewWorldData() {
    return axios.get('/api/v1/scraper/newworld')
        .then(res => console.log(res.body))
}

export function getCountdownData() {
    return axios.get('/api/v1/scraper/countdown')
        .then(res => (res.body))
}

export function getPakSaveData() {
    return axios.get('/api/v1/scraper/pakandsave')
        .then(res => (res.body))
}


