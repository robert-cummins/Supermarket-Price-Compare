import request from 'superagent'

function getNewWorldData() {
    return request
        .get('/api/v1/scraper/newworld')
        .then(res => (res.body))
}

function getCountdownData() {
    return request
        .get('/api/v1/scraper/countdown')
        .then(res => (res.body))
}

function getPakSaveData() {
    return request
        .get('/api/v1/scraper/pakandsave')
        .then(res => (res.body))
}


module.exports = {
    getNewWorldData,
    getCountdownData,
    getPakSaveData
}