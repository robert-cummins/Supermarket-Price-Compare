import request from 'superagent'

export function getNewWorldData() {
    return request
        .get('/api/v1/scraper/newworld')
        .then(res => (res.body))
}

export function getCountdownData() {
    return request
        .get('/api/v1/scraper/countdown')
        .then(res => (res.body))
}

export function getPakSaveData() {
    return request
        .get('/api/v1/scraper/pakandsave')
        .then(res => (res.body))
}


