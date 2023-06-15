const fs = require('fs')
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.log(`Error reading ${path}:`)
            console.log(error)
            process.exit(1)
        }
        console.log(data)
    })

}

async function webCat(url){
    try{
        console.log(await axios.get(url))
    }
    catch (error) {
        console.log(`Error fetching ${url}:`)
        console.log(error)
        process.exit(1)
    }

}

if(process.argv[2].indexOf('.txt') >= 0){
    cat(process.argv[2])
} else {
    webCat(process.argv[2])
}
