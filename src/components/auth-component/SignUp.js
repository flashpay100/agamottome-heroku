import React, { useState } from 'react'
import { signUp } from '../../services/AuthService'
import Icon from '../../images/Icon.png'
import Logo from '../../images/Logo.png'
import '../../styles/SignUp.css'

const SignUp = () => {
    const [data, setData] = useState({
        emailAddress: '',
        userName : '',
        accountType : '',
        password : ''
    })

    function handleChange(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    function handleSubmit(e) {
        e.preventDefault()
        signUp(data.emailAddress, data.userName, data.accountType, data.password)
    }

    return (
        <div className="container-fluid text-white" style={{ fontFamily: "serif" }}>
            <div className="row"> 
                <div className="col-lg-6 d-none d-lg-block bg-danger text-center">
                    <img className="py-4 d-block mx-auto logo" src={Logo} alt="Logo" />
                    <h2 className="mt-3 mb-5"><b>Welcome To Agamottome</b></h2>
                    <img className="mt-2 mb-5 icon" alt="Icon" src={Icon} />
                    <h5 className="mt-3 mb-5"><b>E-Library For All</b></h5>
                    <p className="pt-2 pb-1 text-center">Copyright &copy; Anush Raghavender {new Date().getFullYear()}</p>
                </div>
                <div className="col-lg-6 bg-primary">
                    <img className="mt-4 d-lg-none d-block mx-auto logo" src={Logo} alt="Logo" />
                    <form className="mt-lg-5 pt-lg-5" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                        <h3 className="text-center pt-4 mt-3"><b>Sign Up</b></h3>
                        <input placeholder="Email Address" onChange={(e) => handleChange(e)} id="emailAddress" value={data.emailAddress} type="email" className="input-fields mt-5" required />
                        <input placeholder="User Name" onChange={(e) => handleChange(e)} id="userName" value={data.userName} type="text" className="input-fields mt-4" required />
                        <input placeholder="Password" onChange={(e) => handleChange(e)} id="password" value={data.password} type="password" className="input-fields mt-4" required />
                        <select onChange={(e) => handleChange(e)} defaultValue={"Default"} id="accountType" type="text" className="select-fields mt-4 mb-3" required>
                            <option value="Default" disabled>Account Type</option>
                            <option value="Personal">Personal Account</option>
                            <option value="Admin">Admin Account</option>
                        </select>
                        <button type="submit" className="btn btn-outline-light d-block mx-auto rounded-3 border-2 py-2 px-5 mt-5" style={{ fontSize: "18px" }}><b>Sign Up</b></button>
                        <p className="mt-5 pt-2 text-center">Already Have An Account ? <a href="/" className="link-light" style={{ textUnderlineOffset: "7px" }}>Sign In</a></p>
                    </form>
                    <p className="pt-3 pt-md-4 pb-1 text-center d-lg-none d-block">Copyright &copy; Anush Raghavender {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}

export default SignUp