import React, { useState, useEffect } from 'react'
import Header from '../global-component/Header'
import '../../styles/Library.css'
import { getRevokedBooksList, unRevokeBook } from '../../services/AdminService'
import { getUserDetails } from '../../services/AuthService'

const RevokedList = ({totalRevokedBooks}) => {
    useEffect(() => {
        getRevokedBooksList().then(book => setRevokedBooks(book))
        getUserDetails().then(user => setUser(user))
    }, [])

    const [revokedBooks, setRevokedBooks] = useState({
        emailAddress : '',
        userName : '',
        bookIsbn : '',
        bookName : '',
        dateOfRevoke : ''
    })

    const [user, setUser] = useState({
        id : '',
        userName : '',
        accountType : '',
        myBooks : []
    })

    const [visibleBooks, setVisibleBooks] = useState(10);
    function handleShowMoreBooks(e) {
        e.preventDefault()
        setVisibleBooks(previousVisibleBooks => previousVisibleBooks + 5)
    }

    if(Array.isArray(revokedBooks) && Object.keys(revokedBooks).length !== 0) {
        totalRevokedBooks = Object.keys(revokedBooks).length
    }

    function handleSubmit(emailAddress, bookIsbn) {
        unRevokeBook(emailAddress, bookIsbn)
    }

    return (
        <div style={{ fontFamily: "serif" }}>
            <Header name={user.userName} accountType={user.accountType}/>
            <div className="container pb-5">
                <div className="d-block text-start col-md-6 mt-4 mx-lg-5 mx-2">
                    <a href="/dashboard" className="library-links d-inline-block">Dashboard</a>
                    <p className="library-links-active d-inline-block mx-4 mb-0">Revoked List</p>
                </div>
                <p className="mt-4 mb-2 mx-lg-5 mx-2 text-start" style={{marginBottom: "-10px"}}>Total Number Of Revoked Books : {totalRevokedBooks}</p>
                <div className="container text-dark mt-4 px-lg-5">
                    <table>
                        <tbody>
                            <tr style={{fontSize: "18px"}}>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>S.No</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Email</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>User</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Isbn</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Book</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Date</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Unrevoke</th>
                            </tr>
                            {// eslint-disable-next-line
                                Array.isArray(revokedBooks) && revokedBooks.reverse().map((bk, i) => {
                                    var rvkDate = bk.dateOfRevoke.substr(0, bk.dateOfRevoke.indexOf('T')).split('-').reverse().join('/')
                                    return(
                                        <tr key={i+1}>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{i+1}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.emailAddress}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.userName}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.bookIsbn}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.bookName}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{rvkDate}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><button onClick={e => handleSubmit(bk.emailAddress, bk.bookIsbn)} className="btn btn-outline-danger border-2"><b>Unrevoke</b></button></td>
                                        </tr>        
                                    )
                                }).slice(0, visibleBooks)
                            }
                        </tbody>
                    </table>
                    <button onClick={(e) => handleShowMoreBooks(e)} className="btn btn-outline-dark border-2 mt-4 d-block px-4 py-2"><b>Show More</b></button>
                </div>    
            </div>
        </div>
    )
}

RevokedList.defaultProps = {
    totalRevokedBooks: 0
}

export default RevokedList