const fs = require('fs')
const axios = require('axios');

function cat(path, writePath){
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.log(`Error reading ${path}:`)
            console.log(error)
            process.exit(1)
        }

        if (!writePath){
            console.log(data)
        } else {
            writeToFile(writePath, data)
        }
    })

}

async function webCat(url, writePath){
    try{
        let response = await axios.get(url)


        if (!writePath){
            console.log(response.data)
        } else {
            writeToFile(writePath, response.data)
        }

    }
    catch (error) {
        console.log(`Error fetching ${url}:`)
        console.log(error)
        process.exit(1)
    }

}

function writeToFile(path, data){
    fs.writeFile(path, data, 'utf8', (error) => {
        if (error) {
            console.log(`Couldn't write ${path}:`)
            console.log(error)
            process.exit(1)
        }
    })
}

if(process.argv[4].indexOf('.txt') >= 0){
    if (process.argv[2] == '--out'){
        cat(process.argv[4], process.argv[3])
    } else {
        cat(process.argv[4])
    }
} else {
    if (process.argv[2] == '--out'){
        webCat(process.argv[4], process.argv[3])
    } else {
        webCat(process.argv[4])
    }
}
