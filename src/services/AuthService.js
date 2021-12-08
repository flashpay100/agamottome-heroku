import Axios from 'axios'

const Url = "http://apigateway-env.eba-ni2qnjtp.us-east-1.elasticbeanstalk.com/authservice"

export default function authService() {
    return "Auth Service"
}

function getJWTToken() {
    return document.cookie.substr(9, document.cookie.length)
}

/***************************************** Sign In *****************************************/
async function signIn(submittedEmailAddress, submittedPassword) {
    await Axios.post(Url + "/signin", null, {
        params: { emailAddress: submittedEmailAddress, password: submittedPassword } 
        })
        .then(response => {
            var jwt = response.data.substring(response.data.indexOf(":- ") + 2)
            document.cookie = `jwtToken=${jwt}`
            if(response.status === 200 && response.data.includes("User")) {
                alert("Signed In")
                window.location.replace("/library")    
            }
            if(response.status === 200 && response.data.includes("Admin")) {
                alert("Signed In")
                window.location.replace("/dashboard")    
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Sign Up *****************************************/
async function signUp(submittedEmailAddress, submittedUserName, submittedAccountType, submittedPassword) {
    await Axios.post(Url + "/signup", {
        emailAddress : submittedEmailAddress,
        userName : submittedUserName,
        accountType : submittedAccountType,
        password: submittedPassword
        })
        .then(response => {
            alert(response.data)
            if(response.status === 201) {
                window.location.replace("/")
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Get User Details *****************************************/
async function getUserDetails() {
    var jwt = getJWTToken()
    var user = await Axios.get(Url + "/user", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            alert(error.response.data)
            if(error.response.status === 401) {
                window.location.replace("/")
            }
        })
    return user
}

/***************************************** Sign Out *****************************************/
async function signOut() {
    var jwt = getJWTToken()
    await Axios.post(Url + "/signout", null, { params: { jwtToken: jwt } })
        .then(response => {
            alert(response.data)
            if(response.status === 202) {
                document.cookie = "jwtToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                window.location.replace("/")
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

export {
    signIn,
    signUp,
    getUserDetails,
    signOut
}
