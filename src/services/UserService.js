import Axios from 'axios'

const Url = "http://apigateway-env.eba-divpkmen.us-east-1.elasticbeanstalk.com/userservice"

export default function userService() {
    return "User Service"
}

function getJWTToken() {
    return document.cookie.substr(9, document.cookie.length)
}

/***************************************** Get Books *****************************************/
async function getBooks() {
    var jwt = getJWTToken()
    var books = await Axios.get(Url + "/allbooks", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            if(error.response.status === 401) {
                window.location.replace("/")
            }
            if(error.response.data !== "No Books Found In Database") {
                alert(error.response.data)
            }            
        })
    return books
}

/***************************************** Request Book Permission *****************************************/
async function requestBookPermission(submittedBookIsbn) {
    var jwt = getJWTToken()
    await Axios.post(Url + "/bookpermissionrequest", null, {
        params: { bookIsbn : submittedBookIsbn, jwtToken : jwt } 
        })
        .then(response => {
            if(response.status === 200) {
                alert("Book Permission Granted")
                window.location.replace("/books")   
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Get My Books *****************************************/
async function getMyBooks() {
    var jwt = getJWTToken()
    var books = await Axios.get(Url + "/mybooks", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            if(error.response.status === 401) {
                window.location.replace("/")
            }
            if(error.response.data !== "No Books Found In Database For User") {
                alert(error.response.data)
            }            
        })
    return books
}

/***************************************** Download Book *****************************************/
async function downloadBook(submittedBookIsbn) {
    var jwt = getJWTToken()
    await Axios.get(Url + "/book", { params: { jwtToken: jwt, bookIsbn: submittedBookIsbn} })
        .then(response => {
            if(response.status === 200) {
                window.location.replace(Url + "/book?jwtToken=" + jwt + "&bookIsbn=" + submittedBookIsbn)
                alert("Book Downloaded")
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Get Past Books *****************************************/
async function getPastBooks() {
    var jwt = getJWTToken()
    var pastBooks = await Axios.get(Url + "/pastbooks", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            if(error.response.status === 401) {
                window.location.replace("/")
            }
            if(error.response.data !== "No Past Books Found In Database For User" && error.response.data !== "No Books Found In Database For User") {
                alert(error.response.data)
            }    
        })
    return pastBooks
}

/***************************************** Get Revoked Books *****************************************/
async function getRevokedBooks() {
    var jwt = getJWTToken()
    var revokedBooks = await Axios.get(Url + "/revokedbooks", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            if(error.response.data !== "No Revoked Books Found In Database For User" && error.response.data !== "No Books Found In Database For User") {
                alert(error.response.data)
            }            
        })
    return revokedBooks
}

export {
    getBooks,
    requestBookPermission,
    getMyBooks,
    downloadBook,
    getPastBooks,
    getRevokedBooks
}
