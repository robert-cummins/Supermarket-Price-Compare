function getDate() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = dd + '/' + mm + '/' + yyyy
    return today
}


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


function trimNewWorldPakSavePicUrl(url){
    const regExp = /\(([^)]+)\)/
    url =  regExp.exec(url)
    url = url[0].replace(/[{()}]/g, '');
    url = url.replace(/'/g, '')
    url = url.replace(/"/g, '')
    return url
}


module.exports = {
    getDate,
    autoScroll,
    trimNewWorldPakSavePicUrl
}