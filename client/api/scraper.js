import request from 'superagent'

export default function scrapeMarkets() {
    console.log('api call')
    return request
        .get('/api/v1/scraper/data')
        .then(res => (res.body))
}