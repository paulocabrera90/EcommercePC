require('dotenv').config()
const path = require('path')

module.exports = {
    PORT: process.env.PORT || 8000,
    APIURL: process.env.APIURL,
    DIRNAME: path.join('src/'),
    JOIN: path.join
}