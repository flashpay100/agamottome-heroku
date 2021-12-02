import Axios from 'axios'

const Url = "http://apigateway-env.eba-divpkmen.us-east-1.elasticbeanstalk.com/adminservice"

export default function adminService() {
    return "Admin Service"
}

function getJWTToken() {
    return document.cookie.substr(9, document.cookie.length)
}

/***************************************** Add Book *****************************************/
async function addBook(submittedBookIsbn, submittedBookName, submittedAuthor, submittedGenre, submittedPublisher, submittedYearOfRelease, submittedBookFile, submittedBookImage) {
    var jwt = getJWTToken()
    var book = await Axios.post(Url + "/book", {
        bookIsbn: submittedBookIsbn,
        bookName: submittedBookName,
        author: submittedAuthor,
        genre: submittedGenre,
        publisher: submittedPublisher,
        yearOfRelease: submittedYearOfRelease
    },
    {params : {jwtToken : jwt}})
    .then(response => response.status)
    .catch(error => {
        alert(error.response.data)
    })
    if(book === 201) {
        let formData = new FormData()
        formData.append("bookFile", submittedBookFile)
        formData.append("bookImage", submittedBookImage)
        await Axios.post(Url + "/bookfiles", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: { 
                jwtToken : jwt,
                bookIsbn : submittedBookIsbn
            } 
            })
            .then(response => {
                if(response.status === 201) {
                    alert("Book Added Successfully")
                }
            })
            .catch(error => {
                alert(error.response.data)
            }) 
    }
}

/***************************************** Delete Book *****************************************/
async function deleteBook(submittedbookIsbn) {
    var jwt = getJWTToken()
    await Axios.delete(Url + "/book", {
        params: { jwtToken: jwt, bookIsbn: submittedbookIsbn } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("Book :- " + submittedbookIsbn + " Deleted Successfully")
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Get All Users Book Access *****************************************/
async function getBookAccess() {
    var jwt = getJWTToken()
    var access = await Axios.get(Url + "/users", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            if(error.response.status === 401) {
                window.location.replace("/")
            }
            if(error.response.data !== "No Users Found In Database") {
                alert(error.response.data)
            }            
        })
    return access
}

/***************************************** Revoke Book Access *****************************************/
async function revokeBook(submittedEmailAddress, submittedbookIsbn) {
    var jwt = getJWTToken()
    await Axios.delete(Url + "/userbook", {
        params: { jwtToken: jwt, emailAddress: submittedEmailAddress, bookIsbn: submittedbookIsbn } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("Book :- " + submittedbookIsbn + " Revoked Successfully For User :- " + submittedEmailAddress)
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Revoke Multiple Books *****************************************/
async function revokeMultipleBooks(submittedFile) {
    var jwt = getJWTToken()
    let formData = new FormData()
    formData.append("revokeMultipleBooksFile", submittedFile)
    await Axios.post(Url + "/userbooks", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        params: { 
            jwtToken : jwt 
        } 
        })
        .then(response => {
            if(response.status === 200) {
                const blob = new Blob([response.data], {type: "text/plain"})
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.download = "Revoke-Report.txt"
                link.href = url
                link.click()
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Get Revoked Books List *****************************************/
async function getRevokedBooksList() {
    var jwt = getJWTToken()
    var revokedBooks = await Axios.get(Url + "/revokedbookslist", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            if(error.response.status === 401) {
                window.location.replace("/")
            }
            if(error.response.data !== "No Revoked Books Found In Database") {
                alert(error.response.data)
            }            
        })
    return revokedBooks
}

/***************************************** Unrevoke Book Access *****************************************/
async function unRevokeBook(submittedEmailAddress, submittedbookIsbn) {
    var jwt = getJWTToken()
    await Axios.put(Url + "/userbook", null, {
        params: { jwtToken: jwt, emailAddress: submittedEmailAddress, bookIsbn: submittedbookIsbn } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("Book :- " + submittedbookIsbn + " Unrevoked Successfully For User :- " + submittedEmailAddress)
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

export {
    addBook,
    deleteBook,
    getBookAccess,
    revokeBook,
    revokeMultipleBooks,
    getRevokedBooksList,
    unRevokeBook
}
