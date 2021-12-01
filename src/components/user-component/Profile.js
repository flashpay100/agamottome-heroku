import React, { useState, useEffect } from 'react'
import Header from '../global-component/Header'
import { getPastBooks, getRevokedBooks } from '../../services/UserService'
import { getUserDetails } from '../../services/AuthService'

const Profile = ({totalPastBooks, totalRevokedBooks}) => {
    useEffect(() => {
        getPastBooks().then(book => setPastBooks(book))
        getRevokedBooks().then(book => setRevokedBooks(book))
        getUserDetails().then(user => setUser(user))
    }, [])

    const [user, setUser] = useState({
        id : '',
        userName : '',
        accountType : '',
        myBooks : []
    })

    const [pastBooks, setPastBooks] = useState({
        bookImgUrl: ''
    })

    const [revokedBooks, setRevokedBooks] = useState({
        bookImgUrl: ''
    })

    if(Array.isArray(pastBooks) && Object.keys(pastBooks).length !== 0) {
        totalPastBooks = Object.keys(pastBooks).length
    }
    if(Array.isArray(revokedBooks) && Object.keys(revokedBooks).length !== 0) {
        totalRevokedBooks = Object.keys(revokedBooks).length
    }

    return (
        <div style={{ fontFamily: "serif" }}>
            <Header name={user.userName} accountType={user.accountType}/>
            <div className="container mb-4 pt-3">
                <div className="row mt-4 mx-lg-5 mx-2">
                    <h4 className="text-center text-md-start"><u>Past Books</u></h4>
                    <p className="mt-2 text-center text-md-start" style={{marginBottom: "-20px"}}>Total Number Of Past Books : {totalPastBooks}</p>
                    {// eslint-disable-next-line
                    Array.isArray(pastBooks) && pastBooks.map((bk) => {
                            return(
                                <div className="mt-5 col-lg-2 col-md-3 mx-md-3" key={bk}>
                                    <img alt="pastBook" className="d-block mx-auto" src={bk} style={{width: "150px"}}></img>
                                </div>
                            )
                    }).reverse()
                    }
                </div>                
            </div>
            <div className="container mb-5 pt-3">
                <div className="row mt-4 mx-lg-5 mx-2">
                    <h4 className="text-center text-md-start"><u>Revoked Books</u></h4>
                    <p className="mt-2 text-center text-md-start" style={{marginBottom: "-20px"}}>Total Number Of Revoked Books : {totalRevokedBooks}</p>
                    {// eslint-disable-next-line
                    Array.isArray(revokedBooks) && revokedBooks.map((bkImg) => {
                            return(
                                <div className="mt-5 col-lg-2 col-md-3 mx-md-3" key={bkImg}>
                                    <img alt="revokedBook" className="d-block mx-auto" src={bkImg} style={{width: "150px"}}></img>
                                </div>
                            )
                    }).reverse()
                    }
                </div>                
            </div>
        </div>
    )
}

Profile.defaultProps = {
    totalPastBooks: 0,
    totalRevokedBooks: 0
}

export default Profile