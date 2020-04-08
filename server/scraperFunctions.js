const puppeteer = require('puppeteer');

async function scrapeSites() {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setRequestInterception(true);

    page.on('request', request => {
        if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
            request.abort();
        else
            request.continue();
    });

    function seperatePakSavePriceFromType(arr, arrIndex){
        let numLettterSplitArr = arr[arr.length-arrIndex].match(/[a-zA-Z]+|[0-9]+/g)
        productObject.type = numLettterSplitArr[1]
        if(numLettterSplitArr[0].length == 3){
                productObject.price = `${numLettterSplitArr[0].slice(0, 1)}.${numLettterSplitArr[0].slice(1, 3)}` 
            } else{
                productObject.price = `${numLettterSplitArr[0].slice(0, 2)}.${numLettterSplitArr[0].slice(2, 4)}` 
            }
    }

    await page.goto(`https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=1`, { waitUntil: 'networkidle2' })
    // console.log(page)
    const pakSaveElementTextArr = await scrapeNewworldTextData(page, ".fs-product-card")
    let obj = pakSaveElementTextArr.map(arr => {
        productObject = { name: arr[0], price: '', type: '' }
        if(arr[arr.length-4].charAt(0) == '$'){
            seperatePakSavePriceFromType(arr, 5)
            
        } else {
            seperatePakSavePriceFromType(arr, 4)

        }
        return productObject
        
        
        
        
        
    })
    console.log(obj)

    // let newWorldDataArray = []
    // let countdownDataArray = []
    // for (let i = 1; i <= 4; i++) {
    //     if (i <= 3) {
    //         await page.goto(`https://shop.countdown.co.nz/shop/browse/fruit-vegetables?ps=120&page=${i}`, { waitUntil: 'networkidle2' })
    //         const countdownElementTextArr = await scrapeNewworldTextData(page, ".product-entry")
    //         let countdownData = getCountdownDataObject(countdownElementTextArr)
    //         countdownDataArray.push(countdownData)
    //     }
    //     await page.goto(`https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, { waitUntil: 'networkidle2' })
    //     const newWorldElementTextArr = await scrapeNewworldTextData(page, ".fs-product-card")
    //     const newWorldData = await getNewworldDataObject(newWorldElementTextArr)
    //     newWorldDataArray.push(newWorldData)
    // }

    // console.log(newWorldDataArray)
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    // console.log(countdownDataArray)
}


function getCountdownDataObject(trimedArr) {
    let dataArray = []
    trimedArr.map(el => {
        productObject = { name: el[0], price: '', type: '' }
        if (!isNaN(el[el.length - 1])) {
            productObject.price = `${el[el.length - 2]}.${el[el.length - 1]}`
            productObject.type = 'ea'
        } else {
            productObject.price = `${el[el.length - 3]}.${el[el.length - 2]}`
            productObject.type = 'kg'
        }
        return dataArray.push(productObject)
    })
    return dataArray
}




function getNewworldDataObject(trimedArr) {
    let dataArray = []
    trimedArr.map((el) => {
        productObject = { name: el[0], price: '', type: '' }
        if ((el[el.length - 1] == 'ea' || el[el.length - 1] == 'kg')) {
            productObject.type = el[el.length - 1]
            productObject.price = `${el[el.length - 3]}.${el[el.length - 2]}`
        } else if ((el[el.length - 2] == 'ea' || el[el.length - 2] == 'kg')) {
            productObject.type = el[el.length - 2]
            productObject.price = `${el[el.length - 4]}.${el[el.length - 3]}`
        }
        return dataArray.push(productObject)
    })
    return dataArray
}



async function scrapeNewworldTextData(page, element) {
    const elements = await page.$$(element)
    const elementHandles = await Promise.all(elements.map(handle => {
        return handle.getProperty('innerText')
    }))

    const elementText = await Promise.all(elementHandles.map(handle => {
        return handle.jsonValue()
    }))

    return elementText.map(el => {
        return el.split(/\r?\n/)
    })
}

scrapeSites()


module.exports = {
    scrapeSites
}

